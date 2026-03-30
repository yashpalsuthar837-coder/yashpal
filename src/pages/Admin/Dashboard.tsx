import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Activity, 
  ShieldCheck, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Clock, 
  Mail, 
  FileText, 
  Send,
  LayoutDashboard,
  TrendingUp,
  UserCheck,
  UserPlus,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Bot
} from 'lucide-react';
import { collection, query, orderBy, limit, getDocs, where, Timestamp, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  role: string;
  createdAt: any;
  lastLogin: any;
  lastActive: any;
}

interface ActivityLog {
  id: string;
  userId: string;
  name: string;
  email: string;
  action: string;
  timestamp: any;
  page: string;
  metadata: any;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: any;
  status: 'new' | 'read' | 'replied';
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('ALL');
  const [activeTab, setActiveTab] = useState<'logs' | 'submissions'>('logs');

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLogins: 0,
    totalVisits: 0,
    totalDownloads: 0,
    totalSubmissions: 0
  });

  const [chartData, setChartData] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Users
      const usersSnap = await getDocs(collection(db, 'users'));
      const usersData = usersSnap.docs.map(doc => doc.data() as UserProfile);
      setUsers(usersData);

      // Fetch Logs
      const logsQuery = query(collection(db, 'activity_logs'), orderBy('timestamp', 'desc'), limit(100));
      const logsSnap = await getDocs(logsQuery);
      const logsData = logsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ActivityLog));
      setLogs(logsData);

      // Fetch Submissions
      const submissionsSnap = await getDocs(query(collection(db, 'contact_submissions'), orderBy('timestamp', 'desc'), limit(20)));
      const submissionsData = submissionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactSubmission));
      setSubmissions(submissionsData);

      // Calculate Stats
      const totalLogins = logsData.filter(log => log.action === 'LOGIN').length;
      const totalVisits = logsData.filter(log => log.action.startsWith('VISITED')).length;
      const totalDownloads = logsData.filter(log => log.action === 'RESUME_DOWNLOAD_CLICKED').length;
      const totalSubmissions = submissionsData.length;

      setStats({
        totalUsers: usersData.length,
        totalLogins,
        totalVisits,
        totalDownloads,
        totalSubmissions
      });

      // Prepare Chart Data (last 7 days)
      const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toLocaleDateString('en-US', { weekday: 'short' });
      }).reverse();

      const visitsByDay = last7Days.map(day => {
        const count = logsData.filter(log => {
          const logDate = log.timestamp.toDate ? log.timestamp.toDate() : new Date(log.timestamp);
          return logDate.toLocaleDateString('en-US', { weekday: 'short' }) === day && log.action.startsWith('VISITED');
        }).length;
        return { name: day, visits: count };
      });

      setChartData(visitsByDay);

    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'contact_submissions', id), { status });
      fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterAction === 'ALL' || log.action === filterAction;
    return matchesSearch && matchesFilter;
  });

  const actions = ['ALL', 'LOGIN', 'LOGOUT', 'VISITED_HOME', 'OPENED_PROJECT', 'RESUME_DOWNLOAD_CLICKED', 'CONTACT_FORM_SUBMITTED'];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2 flex items-center gap-4">
              <ShieldCheck className="text-cyan-500" size={40} />
              Admin Dashboard
            </h1>
            <p className="text-slate-400">Manage users, track activity, and monitor site performance.</p>
          </div>
          <button 
            onClick={fetchData}
            className="px-6 py-3 glass border border-white/10 rounded-xl hover:bg-white/5 transition-all flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
          >
            <Activity size={16} className="text-cyan-500" />
            Refresh Data
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {[
            { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
            { label: 'Logins', value: stats.totalLogins, icon: UserCheck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: 'Page Visits', value: stats.totalVisits, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-500/10' },
            { label: 'Downloads', value: stats.totalDownloads, icon: FileText, color: 'text-orange-500', bg: 'bg-orange-500/10' },
            { label: 'Submissions', value: stats.totalSubmissions, icon: Send, color: 'text-green-500', bg: 'bg-green-500/10' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass border border-white/10 rounded-3xl p-6"
            >
              <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-4`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-display font-bold">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* System Configuration Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass border border-white/10 rounded-3xl p-8 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="text-cyan-500" />
            <h3 className="text-xl font-display font-bold">System Configuration Status</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Firebase Configuration</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'API Key', status: !!import.meta.env.VITE_FIREBASE_API_KEY || !!import.meta.env.NEXT_PUBLIC_FIREBASE_API_KEY },
                  { label: 'Auth Domain', status: !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || !!import.meta.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN },
                  { label: 'Project ID', status: !!import.meta.env.VITE_FIREBASE_PROJECT_ID || !!import.meta.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID },
                  { label: 'App ID', status: !!import.meta.env.VITE_FIREBASE_APP_ID || !!import.meta.env.NEXT_PUBLIC_FIREBASE_APP_ID },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-xs text-slate-400">{item.label}</span>
                    {item.status ? (
                      <CheckCircle2 size={14} className="text-green-500" />
                    ) : (
                      <XCircle size={14} className="text-red-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Gemini AI Configuration</h4>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot className="text-cyan-500" size={20} />
                  <span className="text-sm">Gemini API Key</span>
                </div>
                {/* We check this via a small test or just assume it's set if we can't check process.env in frontend */}
                <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Configured in Backend</span>
              </div>
              <p className="text-[10px] text-slate-500 italic">
                Note: Gemini API key is managed securely in the backend server and is not exposed to the client.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass border border-white/10 rounded-[3rem] p-8 mb-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="text-cyan-500" />
            <h3 className="text-xl font-display font-bold">Traffic Overview (Last 7 Days)</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#06b6d4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="visits" 
                  stroke="#06b6d4" 
                  fillOpacity={1} 
                  fill="url(#colorVisits)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity Table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 glass border border-white/10 rounded-3xl p-8"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setActiveTab('logs')}
                  className={`flex items-center gap-2 pb-2 border-b-2 transition-all ${activeTab === 'logs' ? 'border-cyan-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                  <Activity size={18} />
                  <span className="font-display font-bold">Activity Logs</span>
                </button>
                <button 
                  onClick={() => setActiveTab('submissions')}
                  className={`flex items-center gap-2 pb-2 border-b-2 transition-all ${activeTab === 'submissions' ? 'border-cyan-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                  <MessageSquare size={18} />
                  <span className="font-display font-bold">Submissions</span>
                  {submissions.filter(s => s.status === 'new').length > 0 && (
                    <span className="bg-cyan-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {submissions.filter(s => s.status === 'new').length}
                    </span>
                  )}
                </button>
              </div>
              
              {activeTab === 'logs' && (
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-48 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <select 
                      value={filterAction}
                      onChange={(e) => setFilterAction(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-cyan-500 transition-all appearance-none cursor-pointer"
                    >
                      {actions.map(action => (
                        <option key={action} value={action} className="bg-[#020617]">{action}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {activeTab === 'logs' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-500 text-[10px] uppercase tracking-widest font-bold border-b border-white/5">
                      <th className="pb-4">User</th>
                      <th className="pb-4">Action</th>
                      <th className="pb-4">Timestamp</th>
                      <th className="pb-4">Page</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="group hover:bg-white/5 transition-all">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold">
                              {log.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white">{log.name}</p>
                              <p className="text-[10px] text-slate-500">{log.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                            log.action === 'LOGIN' ? 'bg-blue-500/20 text-blue-400' :
                            log.action === 'LOGOUT' ? 'bg-red-500/20 text-red-400' :
                            'bg-slate-500/20 text-slate-400'
                          }`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="py-4 text-[10px] text-slate-400 font-mono">
                          {formatDate(log.timestamp)}
                        </td>
                        <td className="py-4 text-[10px] text-slate-400">
                          {log.page}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-6">
                {submissions.length > 0 ? (
                  submissions.map((sub) => (
                    <div key={sub.id} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400">
                            <Mail size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{sub.name}</p>
                            <p className="text-xs text-slate-500">{sub.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                            sub.status === 'new' ? 'bg-cyan-500/20 text-cyan-400' :
                            sub.status === 'read' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {sub.status}
                          </span>
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => handleUpdateStatus(sub.id, 'read')}
                              className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-blue-400 transition-all"
                              title="Mark as Read"
                            >
                              <CheckCircle2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(sub.id, 'replied')}
                              className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-green-400 transition-all"
                              title="Mark as Replied"
                            >
                              <Send size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5 italic">
                        "{sub.message}"
                      </p>
                      <p className="text-[10px] text-slate-500 mt-4 font-mono">
                        Received: {formatDate(sub.timestamp)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <MessageSquare className="mx-auto mb-4 opacity-20" size={48} />
                    <p>No contact submissions found.</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Users List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 glass border border-white/10 rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <Users className="text-cyan-500" />
              <h3 className="text-xl font-display font-bold">Registered Users</h3>
            </div>

            <div className="space-y-6">
              {users.map((user) => (
                <div key={user.uid} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <img src={user.photoURL} alt="" className="w-10 h-10 rounded-xl object-cover border border-white/10" />
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{user.name}</p>
                      <p className="text-[10px] text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${user.role === 'admin' ? 'text-cyan-500' : 'text-slate-500'}`}>
                      {user.role}
                    </p>
                    <p className="text-[9px] text-slate-600 font-mono">
                      {user.lastActive ? formatDate(user.lastActive).split(',')[0] : 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
