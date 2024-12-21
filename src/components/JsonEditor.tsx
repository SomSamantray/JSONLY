import React from 'react';
import { Scissors, Copy, Clipboard } from 'lucide-react';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function JsonEditor({ value, onChange }: JsonEditorProps) {
  const handleCut = () => {
    navigator.clipboard.writeText(value);
    onChange('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    onChange(text);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Input JSON</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleCut}
            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            title="Cut"
          >
            <Scissors size={20} />
          </button>
          <button
            onClick={handleCopy}
            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            title="Copy"
          >
            <Copy size={20} />
          </button>
          <button
            onClick={handlePaste}
            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            title="Paste"
          >
            <Clipboard size={20} />
          </button>
        </div>
      </div>
      <textarea
        className="w-full h-[400px] p-4 border rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        placeholder="Paste or type your JSON here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="mt-4 flex justify-end">
        <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-all transform hover:scale-105">
          Process
        </button>
      </div>
    </div>
  );
}