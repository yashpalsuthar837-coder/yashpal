import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { db, collection, onSnapshot, query, orderBy, limit } from '../lib/firebase';
import { useFirebase } from '../context/FirebaseContext';
import { Users, Activity, Eye, ShieldCheck, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { isAdmin, loading: authLoading } = useFirebase();
  const [visitors, setVisitors] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;

    const vQuery = query(collection(db, 'visitors'), orderBy('timestamp', 'desc'), limit(100));
    const aQuery = query(collection(db, 'activities'), orderBy('timestamp', 'desc'), limit(100));

    const unsubV = onSnapshot(vQuery, (snapshot) => {
      setVisitors(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubA = onSnapshot(aQuery, (snapshot) => {
      setActivities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => {
      unsubV();
      unsubA();
    };
  }, [isAdmin]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 rounded-full border-4 border-foreground/10 border-t-foreground animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
        <ShieldCheck size={64} className="text-red-600 mb-6" />
        <h1 className="text-4xl font-bold tracking-tighter mb-4 text-gradient">Access Denied</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          You do not have administrative privileges to view this page.
        </p>
        <Link to="/" className="px-8 py-3 rounded-full bg-foreground text-background font-bold uppercase tracking-widest text-xs shadow-xl">
          Return Home
        </Link>
      </div>
    );
  }

  const uniqueVisitors = new Set(visitors.map(v => v.sessionId)).size;

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-red-600 mb-2">
              <ShieldCheck size={14} />
              <span>Admin Console</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-gradient">Dashboard</h1>
          </div>
          
          <Link to="/" className="flex items-center gap-2 px-6 py-2 rounded-full glass text-[10px] font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-500">
            <ArrowLeft size={14} />
            Back to Site
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl liquid-glass border border-foreground/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-600/10 flex items-center justify-center text-red-600">
                <Eye size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total Views</span>
            </div>
            <div className="text-4xl font-black tracking-tighter mb-1">{visitors.length}</div>
            <p className="text-xs text-muted-foreground">Recent page views tracked</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-3xl liquid-glass border border-foreground/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                <Users size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Unique Visitors</span>
            </div>
            <div className="text-4xl font-black tracking-tighter mb-1">{uniqueVisitors}</div>
            <p className="text-xs text-muted-foreground">Based on session IDs</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-3xl liquid-glass border border-foreground/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-green-600/10 flex items-center justify-center text-green-600">
                <Activity size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Activities</span>
            </div>
            <div className="text-4xl font-black tracking-tighter mb-1">{activities.length}</div>
            <p className="text-xs text-muted-foreground">User actions recorded</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <Activity size={20} className="text-red-600" />
              <h2 className="text-2xl font-bold tracking-tight">Recent Activity</h2>
            </div>
            
            <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
              {activities.map((activity, index) => (
                <div key={activity.id} className="p-6 rounded-2xl glass border border-foreground/5 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 rounded-full bg-foreground/5 text-[8px] font-bold uppercase tracking-widest">
                      {activity.type}
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{activity.description}</p>
                  {activity.userName && (
                    <p className="text-[10px] text-muted-foreground">By: {activity.userName}</p>
                  )}
                </div>
              ))}
              {activities.length === 0 && (
                <div className="p-12 text-center glass rounded-3xl border border-dashed border-foreground/10 text-muted-foreground italic">
                  No activities recorded yet.
                </div>
              )}
            </div>
          </motion.div>

          {/* Recent Visitors */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <Eye size={20} className="text-red-600" />
              <h2 className="text-2xl font-bold tracking-tight">Live Visitors</h2>
            </div>
            
            <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
              {visitors.map((visitor, index) => (
                <div key={visitor.id} className="p-6 rounded-2xl glass border border-foreground/5 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold tracking-tight truncate max-w-[150px]">
                      Session: {visitor.sessionId.substring(0, 8)}...
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(visitor.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-red-600">PATH:</span>
                    <span className="text-xs font-mono bg-foreground/5 px-2 py-0.5 rounded">{visitor.path}</span>
                  </div>
                  <p className="text-[9px] text-muted-foreground truncate opacity-50">
                    {visitor.userAgent}
                  </p>
                </div>
              ))}
              {visitors.length === 0 && (
                <div className="p-12 text-center glass rounded-3xl border border-dashed border-foreground/10 text-muted-foreground italic">
                  No visitors tracked yet.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
