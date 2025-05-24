import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { calendarSlots } from '../../data/mockData';

const CalendarSection = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Format date to display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };
  
  // Navigate to previous day
  const prevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };
  
  // Navigate to next day
  const nextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Calendar</h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={prevDay}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <FiChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-sm font-medium">{formatDate(currentDate)}</span>
          <button 
            onClick={nextDay}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <FiChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {calendarSlots.map((slot) => (
          <button
            key={slot.id}
            disabled={!slot.available}
            className={`py-2 px-3 rounded-lg text-sm font-medium text-center ${
              slot.available
                ? 'bg-primary/10 text-primary hover:bg-primary/20'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {slot.time}
          </button>
        ))}
      </div>
      
      <button className="mt-4 w-full py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
        Book Appointment
      </button>
    </div>
  );
};

export default CalendarSection;
