import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-3">JSONly</h3>
            <p className="text-sm opacity-80 text-center md:text-left">
              Transform, beautify, and convert your JSON data with ease.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm opacity-80 text-center">
              <li><a href="#" className="hover:opacity-100 transition-opacity">About</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a></li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <h3 className="font-semibold mb-3">Connect</h3>
            <p className="text-sm opacity-80">Made with ❤️ by JSONly Team</p>
          </div>
        </div>
      </div>
    </footer>
  );
}