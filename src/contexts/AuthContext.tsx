import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut, 
  User,
  GoogleAuthProvider
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp,
  collection,
  addDoc,
  getDocFromServer
} from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';
import { toast } from 'sonner';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

const handleFirestoreError = (error: unknown, operationType: OperationType, path: string | null) => {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  
  if (errInfo.error.includes('the client is offline')) {
    toast.error("Firebase connection failed. Please check your configuration.");
  } else if (errInfo.error.includes('insufficient permissions')) {
    toast.error(`Permission denied for ${operationType} on ${path}`);
  } else {
    toast.error(`Firestore error: ${errInfo.error}`);
  }
  
  throw new Error(JSON.stringify(errInfo));
};

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  role: 'admin' | 'user';
  createdAt: any;
  lastLogin: any;
  lastActive: any;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  isAdmin: boolean;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const ADMIN_EMAIL = "yashpalsuthar837@gmail.com";

  const logActivity = async (userId: string, name: string, email: string, action: string) => {
    try {
      await addDoc(collection(db, 'activity_logs'), {
        userId,
        name,
        email,
        action,
        timestamp: serverTimestamp(),
        page: window.location.pathname,
        metadata: {
          userAgent: navigator.userAgent,
          platform: navigator.platform
        }
      });
    } catch (error) {
      console.error("Error logging activity:", error);
    }
  };

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userRef = doc(db, 'users', user.uid);
      let userSnap;
      try {
        userSnap = await getDoc(userRef);
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
        return;
      }

      const isFirstTime = !userSnap.exists();
      const role = user.email === ADMIN_EMAIL ? 'admin' : 'user';

      const profileData = {
        uid: user.uid,
        name: user.displayName || 'Anonymous',
        email: user.email || '',
        photoURL: user.photoURL || '',
        role: role,
        lastLogin: serverTimestamp(),
        lastActive: serverTimestamp(),
      };

      try {
        if (isFirstTime) {
          await setDoc(userRef, {
            ...profileData,
            createdAt: serverTimestamp(),
          });
          toast.success("Welcome to my portfolio!");
        } else {
          await updateDoc(userRef, profileData);
          toast.success("Welcome back!");
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
        return;
      }

      await logActivity(user.uid, profileData.name, profileData.email, "LOGIN");
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.code === 'auth/popup-blocked') {
        toast.error("Login popup was blocked. Please allow popups for this site.");
      } else if (error.code === 'auth/cancelled-popup-request') {
        // User closed the popup, no need for error toast
      } else {
        toast.error(`Login failed: ${error.message || 'Unknown error'}`);
      }
    }
  };

  const logout = async () => {
    if (currentUser) {
      await logActivity(currentUser.uid, currentUser.displayName || '', currentUser.email || '', "LOGOUT");
    }
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout.");
    }
  };

  useEffect(() => {
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Firebase is offline. Check your configuration.");
          toast.error("Firebase connection failed. Check your configuration.");
        }
      }
    };
    testConnection();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        try {
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const profile = userSnap.data() as UserProfile;
            setUserProfile(profile);
            // Update last active
            await updateDoc(userRef, { lastActive: serverTimestamp() });
            // Log initial page visit
            const pageName = window.location.pathname === '/' ? 'HOME' : window.location.pathname.toUpperCase().slice(1).replace(/\//g, '_');
            await logActivity(user.uid, profile.name, profile.email, `VISITED_${pageName}`);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    isAdmin: userProfile?.role === 'admin',
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
