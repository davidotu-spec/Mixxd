import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AIAssistant from './components/AIAssistant';
import SecurityCenter from './components/SecurityCenter';
import FinOpsHub from './components/FinOpsHub';
import ComplianceDashboard from './components/ComplianceDashboard';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = useCallback(() => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'security':
        return <SecurityCenter />;
      case 'finops':
        return <FinOpsHub />;
      case 'compliance':
        return <ComplianceDashboard />;
      default:
        return <Dashboard />;
    }
  }, [currentView]);

  return (
    <div className="flex h-screen bg-gray-900 font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
          {renderView()}
        </main>
      </div>
      <AIAssistant />
    </div>
  );
};

export default App;
