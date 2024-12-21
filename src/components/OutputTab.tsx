import React from 'react';
import { LucideIcon } from 'lucide-react';

interface OutputTabProps {
  id: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

export function OutputTab({ id, label, icon: Icon, isActive, onClick }: OutputTabProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
        isActive
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );
}