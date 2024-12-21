import React from 'react';
import { FileJson } from 'lucide-react';

export function Header() {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileJson size={32} />
            <div>
              <h1 className="text-2xl font-bold">JSONly</h1>
              <p className="text-sm opacity-90">Transform Your JSON with Ease</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={scrollToFeatures}
              className="px-4 py-2 text-white hover:text-white/90 transition-colors"
            >
              Features
            </button>
            <button className="px-4 py-2 text-white hover:text-white/90 transition-colors">
              Roadmap
            </button>
            <button className="px-6 py-2 bg-white text-indigo-600 rounded-full font-medium hover:bg-opacity-90 transition-all transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}