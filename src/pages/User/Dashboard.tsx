import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Calendar, Clock, Shield, Activity, LayoutDashboard } from 'lucide-react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface ActivityLog {
  id: string;
  action: string;
  timestamp: any;
  page: string;
}

const UserDashboard: React.FC = () => {
  const { userProfile, isAdmin, currentUser } = useAuth();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!currentUser) return;
      try {
        const q = query(
          collection(db, 'activity_logs'),
          where('userId', '==', currentUser.uid),
          orderBy('timestamp', 'desc'),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const logsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as ActivityLog));
        setLogs(logsData);
      } catch (error) {
        console.error("Error fetching user logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [currentUser]);

  if (!userProfile) return null;

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  const getTimeAgo = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 glass border border-white/10 rounded-3xl p-8 sticky top-32 h-fit"
          >
            <div className="relative w-32 h-32 mx-auto mb-6">
              <img 
                src={userProfile.photoURL} 
                alt={userProfile.name} 
                className="w-full h-full rounded-2xl object-cover border-2 border-white/10 shadow-2xl"
              />
              {isAdmin && (
                <div className="absolute -top-2 -right-2 bg-cyan-500 text-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                  <Shield size={10} />
                  Admin
                </div>
              )}
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold mb-1">{userProfile.name}</h2>
              <p className="text-slate-400 text-sm">{userProfile.email}</p>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/5">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Calendar size={16} className="text-cyan-500" />
                <span>Joined: {formatDate(userProfile.createdAt)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Clock size={16} className="text-cyan-500" />
                <span>Last Login: {formatDate(userProfile.lastLogin)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Activity size={16} className="text-cyan-500" />
                <span>Status: Active</span>
              </div>
            </div>
          </motion.div>

          {/* Activity Section */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass border border-white/10 rounded-3xl p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="text-cyan-500" />
                  <h3 className="text-xl font-display font-bold">Recent Activity</h3>
                </div>
              </div>

              <div className="space-y-4">
                {logs.length > 0 ? (
                  logs.map((log) => (
                    <div key={log.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          log.action === 'LOGIN' ? 'bg-blue-500/20 text-blue-400' :
                          log.action === 'LOGOUT' ? 'bg-red-500/20 text-red-400' :
                          'bg-cyan-500/20 text-cyan-400'
                        }`}>
                          {log.action === 'LOGIN' ? <Shield size={20} /> : <Activity size={20} />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{log.action.replace(/_/g, ' ')}</p>
                          <p className="text-xs text-slate-400">{getTimeAgo(log.timestamp)} • {log.page}</p>
                        </div>
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                        Logged
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <Activity className="mx-auto mb-4 opacity-20" size={48} />
                    <p>No recent activity found.</p>
                  </div>
                )}
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 text-center">
                <p className="text-sm text-slate-300 mb-4">Your activity is being tracked to improve your experience.</p>
                <button className="text-xs font-bold uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors">
                  View Full History
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;
