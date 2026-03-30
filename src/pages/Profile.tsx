import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Shield, Activity, Settings, Camera, Github, Twitter, Linkedin, Facebook, Globe, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../App';

const Profile = () => {
  const { user, checkAuth } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: user?.profile?.name || '',
    bio: user?.profile?.bio || '',
    socialLinks: {
      github: user?.profile?.socialLinks?.github || '',
      twitter: user?.profile?.socialLinks?.twitter || '',
      linkedin: user?.profile?.socialLinks?.linkedin || '',
      facebook: user?.profile?.socialLinks?.facebook || '',
      vk: user?.profile?.socialLinks?.vk || '',
    },
  });

  const [settingsForm, setSettingsForm] = useState({
    isPublic: user?.settings?.isPublic ?? true,
    emailVisible: user?.settings?.emailVisible ?? false,
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [twoFactor, setTwoFactor] = useState({
    qrCodeUrl: '',
    secret: '',
    token: '',
    showSetup: false,
  });

  useEffect(() => {
    if (activeTab === 'activity') fetchLogs();
  }, [activeTab]);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/profile/activity-log');
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully' });
        checkAuth();
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Update failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/profile/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsForm),
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Settings updated' });
        checkAuth();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return setMessage({ type: 'error', text: 'Passwords do not match' });
    }
    try {
      const res = await fetch('/api/profile/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Password changed' });
        setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);

    try {
      const res = await fetch('/api/profile/upload-avatar', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        checkAuth();
        setMessage({ type: 'success', text: 'Avatar updated' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const setup2FA = async () => {
    try {
      const res = await fetch('/api/auth/2fa/setup', { method: 'POST' });
      const data = await res.json();
      setTwoFactor({ ...twoFactor, qrCodeUrl: data.qrCodeUrl, secret: data.secret, showSetup: true });
    } catch (err) {
      console.error(err);
    }
  };

  const verify2FA = async () => {
    try {
      const res = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: twoFactor.token }),
      });
      if (res.ok) {
        setMessage({ type: 'success', text: '2FA enabled' });
        setTwoFactor({ ...twoFactor, showSetup: false });
        checkAuth();
      } else {
        setMessage({ type: 'error', text: 'Invalid token' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-48 relative">
          <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
            <div className="relative group">
              <img
                src={user?.profile?.avatar || `https://ui-avatars.com/api/?name=${user?.profile?.name || 'User'}&background=random`}
                alt="Avatar"
                className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover bg-white"
              />
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="text-white h-8 w-8" />
                <input type="file" className="hidden" onChange={handleAvatarUpload} accept="image/*" />
              </label>
            </div>
            <div className="pb-4">
              <h1 className="text-3xl font-bold text-white mb-1">{user?.profile?.name || 'Unnamed User'}</h1>
              <p className="text-indigo-100 flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-20 px-8 border-b border-gray-100 flex space-x-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: <User className="h-4 w-4" /> },
            { id: 'edit', label: 'Edit Profile', icon: <Settings className="h-4 w-4" /> },
            { id: 'security', label: 'Security', icon: <Shield className="h-4 w-4" /> },
            { id: 'activity', label: 'Activity', icon: <Activity className="h-4 w-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setMessage({ type: '', text: '' }); }}
              className={`flex items-center py-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'border-indigo-600 text-indigo-600 font-semibold' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-8">
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl mb-6 flex items-center ${
                message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}
            >
              {message.type === 'success' ? <CheckCircle className="h-5 w-5 mr-2" /> : <AlertCircle className="h-5 w-5 mr-2" />}
              {message.text}
            </motion.div>
          )}

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">About Me</h3>
                  <p className="text-gray-600 bg-gray-50 p-6 rounded-2xl leading-relaxed">
                    {user?.profile?.bio || "No bio yet. Tell us something about yourself!"}
                  </p>
                </section>
                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Social Links</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(user?.profile?.socialLinks || {}).map(([key, value]) => (
                      value && (
                        <a
                          key={key}
                          href={value as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-4 bg-white border border-gray-100 rounded-xl hover:border-indigo-200 transition-colors"
                        >
                          {key === 'github' && <Github className="h-5 w-5 text-gray-700 mr-3" />}
                          {key === 'twitter' && <Twitter className="h-5 w-5 text-[#1DA1F2] mr-3" />}
                          {key === 'linkedin' && <Linkedin className="h-5 w-5 text-[#0077B5] mr-3" />}
                          {key === 'facebook' && <Facebook className="h-5 w-5 text-[#1877F2] mr-3" />}
                          {key === 'vk' && <Globe className="h-5 w-5 text-[#0077FF] mr-3" />}
                          <span className="capitalize text-gray-700 font-medium">{key}</span>
                        </a>
                      )
                    ))}
                    {!Object.values(user?.profile?.socialLinks || {}).some(v => v) && (
                      <p className="text-gray-500 italic">No social links added yet.</p>
                    )}
                  </div>
                </section>
              </div>
              <div className="space-y-8">
                <section className="bg-indigo-50 p-6 rounded-2xl">
                  <h3 className="text-indigo-900 font-bold mb-4 flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Account Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-indigo-700">Role</span>
                      <span className="bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded font-bold uppercase text-[10px]">{user?.role}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-indigo-700">2FA</span>
                      <span className={`font-bold ${user?.settings?.twoFactorEnabled ? 'text-green-600' : 'text-amber-600'}`}>
                        {user?.settings?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-indigo-700">Visibility</span>
                      <span className="text-indigo-900 font-medium">{user?.settings?.isPublic ? 'Public' : 'Private'}</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {activeTab === 'edit' && (
            <form onSubmit={handleProfileUpdate} className="space-y-8 max-w-2xl">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    rows={4}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-gray-900">Social Links</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['github', 'twitter', 'linkedin', 'facebook', 'vk'].map((platform) => (
                    <div key={platform}>
                      <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">{platform}</label>
                      <input
                        type="url"
                        placeholder={`https://${platform}.com/username`}
                        value={(profileForm.socialLinks as any)[platform]}
                        onChange={(e) => setProfileForm({
                          ...profileForm,
                          socialLinks: { ...profileForm.socialLinks, [platform]: e.target.value }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          )}

          {activeTab === 'security' && (
            <div className="space-y-12 max-w-2xl">
              {/* 2FA Section */}
              <section className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                      <Lock className="h-5 w-5 mr-2 text-indigo-600" />
                      Two-Factor Authentication
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">Add an extra layer of security to your account.</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    user?.settings?.twoFactorEnabled ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {user?.settings?.twoFactorEnabled ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {!user?.settings?.twoFactorEnabled && !twoFactor.showSetup && (
                  <button
                    onClick={setup2FA}
                    className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Enable 2FA
                  </button>
                )}

                {twoFactor.showSetup && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        <img src={twoFactor.qrCodeUrl} alt="QR Code" className="w-40 h-40" />
                        <div className="text-sm text-gray-600">
                          <p className="font-bold text-gray-900 mb-2">Manual Entry Key:</p>
                          <code className="bg-gray-100 px-3 py-1 rounded text-indigo-600 font-mono text-lg block mb-4 break-all">
                            {twoFactor.secret}
                          </code>
                          <p className="mb-2">1. Scan the QR code or enter the key above manually into your authenticator app.</p>
                          <p>2. Enter the 6-digit code generated by the app below to verify.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="000000"
                        maxLength={6}
                        value={twoFactor.token}
                        onChange={(e) => setTwoFactor({ ...twoFactor, token: e.target.value })}
                        className="flex-grow px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-center tracking-widest font-mono text-xl"
                      />
                      <button
                        onClick={verify2FA}
                        className="bg-indigo-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                      >
                        Verify
                      </button>
                    </div>
                  </motion.div>
                )}
              </section>

              {/* Password Change */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Change Password</h3>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input
                        type="password"
                        required
                        value={passwordForm.oldPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input
                        type="password"
                        required
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        required
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-white text-indigo-600 border border-indigo-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
                  >
                    Update Password
                  </button>
                </form>
              </section>

              {/* Visibility Settings */}
              <section>
                <h3 className="text-lg font-bold text-gray-900 mb-6">Account Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-bold text-gray-900">Public Profile</p>
                      <p className="text-sm text-gray-500">Allow others to view your profile page.</p>
                    </div>
                    <button
                      onClick={() => {
                        const newVal = !settingsForm.isPublic;
                        setSettingsForm({ ...settingsForm, isPublic: newVal });
                        handleSettingsUpdate({ preventDefault: () => {} } as any);
                      }}
                      className={`w-12 h-6 rounded-full transition-colors relative ${settingsForm.isPublic ? 'bg-indigo-600' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settingsForm.isPublic ? 'left-7' : 'left-1'}`}></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-bold text-gray-900">Email Visibility</p>
                      <p className="text-sm text-gray-500">Show your email address on your public profile.</p>
                    </div>
                    <button
                      onClick={() => {
                        const newVal = !settingsForm.emailVisible;
                        setSettingsForm({ ...settingsForm, emailVisible: newVal });
                        handleSettingsUpdate({ preventDefault: () => {} } as any);
                      }}
                      className={`w-12 h-6 rounded-full transition-colors relative ${settingsForm.emailVisible ? 'bg-indigo-600' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settingsForm.emailVisible ? 'left-7' : 'left-1'}`}></div>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Login Activity</h3>
              <div className="overflow-hidden border border-gray-100 rounded-2xl">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {logs.map((log) => (
                      <tr key={log._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(log.loginTime).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-indigo-100 text-indigo-700">
                            {log.provider}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.ipAddress}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-[200px]" title={log.device}>
                          {log.device}
                        </td>
                      </tr>
                    ))}
                    {logs.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500 italic">No activity logs found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
