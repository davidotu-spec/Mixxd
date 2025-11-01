
import React from 'react';
import { View } from '../types';
import { ShieldIcon } from './icons/ShieldIcon';
import { DollarIcon } from './icons/DollarIcon';
import { CheckBadgeIcon } from './icons/CheckBadgeIcon';

const ChartBarIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
);

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ChartBarIcon },
    { id: 'security', label: 'Security', icon: ShieldIcon },
    { id: 'finops', label: 'FinOps', icon: DollarIcon },
    { id: 'compliance', label: 'Compliance', icon: CheckBadgeIcon },
  ];

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white tracking-wider">
          Aura<span className="text-primary-400">Secure</span>
        </h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentView(item.id as View);
            }}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
              currentView === item.id
                ? 'bg-primary-600 text-white'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <item.icon className="w-6 h-6 mr-3" />
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <div className="p-4 rounded-lg bg-gray-700 text-center">
            <p className="text-sm text-gray-300">Upgrade to Pro</p>
            <p className="text-xs text-gray-400 mt-1">Unlock advanced features and enterprise-grade security.</p>
            <button className="mt-4 w-full bg-primary-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">
                Learn More
            </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
