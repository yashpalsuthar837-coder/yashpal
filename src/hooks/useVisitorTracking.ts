import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db, collection, addDoc } from '../lib/firebase';
import { useFirebase } from '../context/FirebaseContext';

// Simple session ID generator
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('visitor_session_id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('visitor_session_id', sessionId);
  }
  return sessionId;
};

export const useVisitorTracking = () => {
  const location = useLocation();
  const { user } = useFirebase();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        await addDoc(collection(db, 'visitors'), {
          sessionId: getSessionId(),
          timestamp: new Date().toISOString(),
          path: location.pathname + location.search + location.hash,
          userAgent: navigator.userAgent,
          userId: user?.uid || null
        });
      } catch (error) {
        console.error("Failed to track visit:", error);
      }
    };

    trackVisit();
  }, [location.pathname, location.search, location.hash, user?.uid]);
};

export const logActivity = async (type: string, description: string, userId?: string, userName?: string) => {
  try {
    await addDoc(collection(db, 'activities'), {
      type,
      description,
      timestamp: new Date().toISOString(),
      userId: userId || null,
      userName: userName || null
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
};
