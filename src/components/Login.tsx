import React from 'react';
import { motion } from 'motion/react';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { playSound } from '../lib/sounds';
import { logActivity } from '../hooks/useVisitorTracking';

const Login: React.FC = () => {
  const { user, loading, login, logout } = useFirebase();

  const handleLogin = async () => {
    playSound('click');
    try {
      const result = await login();
      if (result?.user) {
        logActivity('login', `User ${result.user.displayName || result.user.email} logged in`, result.user.uid, result.user.displayName || result.user.email);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    playSound('click');
    try {
      const currentUser = user;
      await logout();
      if (currentUser) {
        logActivity('logout', `User ${currentUser.displayName || currentUser.email} logged out`, currentUser.uid, currentUser.displayName || currentUser.email);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-full glass animate-pulse">
        <div className="w-4 h-4 rounded-full bg-muted-foreground/20" />
        <div className="w-16 h-3 rounded bg-muted-foreground/20" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-xs font-bold tracking-tight">{user.displayName || 'User'}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Authenticated</span>
          </div>
          
          <div className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-foreground/10 liquid-glass"
            >
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'User'} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-foreground/5">
                  <UserIcon size={20} />
                </div>
              )}
            </motion.div>
            
            {/* Logout Tooltip/Button */}
            <motion.button
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              whileHover={{ opacity: 1, y: 0, scale: 1 }}
              onClick={handleLogout}
              className="absolute top-full right-0 mt-2 px-4 py-2 rounded-xl glass border border-foreground/10 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-xl z-50"
            >
              <LogOut size={12} />
              Logout
            </motion.button>
          </div>
        </div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          onMouseEnter={() => playSound('hover')}
          className="flex items-center gap-2 px-6 py-2 rounded-full liquid-glass text-[10px] font-bold uppercase tracking-widest bg-foreground text-background shadow-xl hover:shadow-foreground/20 transition-all duration-500"
        >
          <LogIn size={14} />
          Login with Google
        </motion.button>
      )}
    </div>
  );
};

export default Login;
