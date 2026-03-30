import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { currentUser, userProfile, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] p-6 text-center">
        <h1 className="text-4xl font-display font-bold mb-4 text-red-500">Access Denied</h1>
        <p className="text-slate-400 mb-8 max-w-md">
          You do not have the necessary permissions to access this area. This incident has been logged.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="px-8 py-3 glass border border-white/10 rounded-xl hover:bg-white/5 transition-all"
        >
          Return Home
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
