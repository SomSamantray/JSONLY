import React from 'react';

export function Navigation() {
  return (
    <div className="flex justify-center space-x-6 py-8">
      <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-all transform hover:scale-105">
        Features
      </button>
      <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition-all transform hover:scale-105">
        Roadmap
      </button>
    </div>
  );
}