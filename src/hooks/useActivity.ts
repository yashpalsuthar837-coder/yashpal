import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

export const useActivity = () => {
  const { currentUser } = useAuth();

  const logActivity = async (action: string, metadata: any = {}) => {
    if (!currentUser) return;

    try {
      await addDoc(collection(db, 'activity_logs'), {
        userId: currentUser.uid,
        name: currentUser.displayName || 'Anonymous',
        email: currentUser.email || '',
        action,
        timestamp: serverTimestamp(),
        page: window.location.pathname,
        metadata: {
          ...metadata,
          userAgent: navigator.userAgent,
          platform: navigator.platform
        }
      });
    } catch (error) {
      console.error("Error logging activity:", error);
    }
  };

  return { logActivity };
};
