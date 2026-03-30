import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Users, Zap, Globe, Key } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    { icon: <Shield className="h-6 w-6 text-indigo-600" />, title: 'Secure Authentication', description: 'Robust login and signup system with password hashing and session management.' },
    { icon: <Globe className="h-6 w-6 text-indigo-600" />, title: 'OAuth Integration', description: 'Connect with Google, Twitter, Facebook, and VK for seamless login experiences.' },
    { icon: <Lock className="h-6 w-6 text-indigo-600" />, title: '2FA Support', description: 'Enhance security with Two-Factor Authentication using TOTP (Google Authenticator).' },
    { icon: <Zap className="h-6 w-6 text-indigo-600" />, title: 'Rate Limiting', description: 'Protection against brute-force attacks with intelligent rate limiting on auth endpoints.' },
    { icon: <Key className="h-6 w-6 text-indigo-600" />, title: 'Admin Dashboard', description: 'Comprehensive management tools for users, activity logs, and system stats.' },
    { icon: <Users className="h-6 w-6 text-indigo-600" />, title: 'User Profiles', description: 'Customizable user profiles with avatar uploads and social link management.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold text-gray-900 tracking-tight mb-6"
        >
          Secure Auth & Profile System
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
        >
          A production-ready full-stack application featuring security best practices, multi-provider OAuth, 2FA, and a powerful admin dashboard.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center space-x-4"
        >
          <Link to="/signup" className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg">Get Started</Link>
          <Link to="/login" className="bg-white text-indigo-600 border border-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">Login</Link>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Security Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-20 bg-indigo-900 rounded-3xl p-12 text-center text-white relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-6">Built with Security First</h2>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
            Our system implements Helmet.js for CSRF protection, secure session cookies, input sanitization, and protection against common vulnerabilities like SQLi and XSS.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-indigo-800 px-4 py-2 rounded-full text-sm font-medium border border-indigo-700">Helmet.js</span>
            <span className="bg-indigo-800 px-4 py-2 rounded-full text-sm font-medium border border-indigo-700">Rate Limiting</span>
            <span className="bg-indigo-800 px-4 py-2 rounded-full text-sm font-medium border border-indigo-700">Secure Cookies</span>
            <span className="bg-indigo-800 px-4 py-2 rounded-full text-sm font-medium border border-indigo-700">Bcrypt Hashing</span>
          </div>
        </div>
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-400 rounded-full blur-3xl"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
