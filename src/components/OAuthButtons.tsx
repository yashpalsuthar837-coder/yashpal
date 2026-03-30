import React from 'react';
import { Globe, Facebook, Twitter, Chrome } from 'lucide-react';

const OAuthButtons = () => {
  const providers = [
    { name: 'Google', icon: <Chrome className="h-5 w-5" />, color: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50', endpoint: '/api/auth/google' },
    { name: 'Twitter', icon: <Twitter className="h-5 w-5" />, color: 'bg-[#1DA1F2] text-white hover:bg-[#1a91da]', endpoint: '/api/auth/twitter' },
    { name: 'Facebook', icon: <Facebook className="h-5 w-5" />, color: 'bg-[#1877F2] text-white hover:bg-[#166fe5]', endpoint: '/api/auth/facebook' },
    { name: 'VK', icon: <Globe className="h-5 w-5" />, color: 'bg-[#0077FF] text-white hover:bg-[#0066ee]', endpoint: '/api/auth/vk' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {providers.map((provider) => (
        <a
          key={provider.name}
          href={provider.endpoint}
          className={`flex items-center justify-center py-2.5 px-4 rounded-lg font-medium transition-all duration-200 shadow-sm ${provider.color}`}
        >
          {provider.icon}
          <span className="ml-2 text-sm">{provider.name}</span>
        </a>
      ))}
    </div>
  );
};

export default OAuthButtons;
