import React from 'react';
import AnatomyStatus from './AnatomyStatus';
import CalendarSection from './CalendarSection';
import AppointmentsSection from './AppointmentsSection';
import ActivityChart from './ActivityChart';

const Dashboard = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3  gap-4 sm:gap-6">
        {/* Left Column - Takes full width on mobile, 2/3 on larger screens */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <AnatomyStatus />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <ActivityChart />
          </div>
        </div>
        
        {/* Right Column - Takes full width on mobile, 1/3 on larger screens */}
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <CalendarSection />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <AppointmentsSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
