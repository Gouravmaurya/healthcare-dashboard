import React, { useState } from 'react';
import { 
  FiHome, 
  FiClock, 
  FiCalendar, 
  FiClipboard, 
  FiBarChart2, 
  FiActivity, 
  FiMessageSquare, 
  FiHelpCircle, 
  FiSettings,
  FiChevronRight,
  FiChevronDown,
  FiX,
  FiLogOut,
  FiUser,
  FiBookmark
} from 'react-icons/fi';

const Sidebar = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isCompact, setIsCompact] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    main: true,
    medical: true,
    account: false
  });

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Main navigation items
  const mainNavItems = [
    { 
      name: 'Dashboard', 
      icon: <FiHome className="sidebar-icon" />,
      notifications: 0
    },
    { 
      name: 'History', 
      icon: <FiClock className="sidebar-icon" />,
      notifications: 0
    },
    { 
      name: 'Calendar', 
      icon: <FiCalendar className="sidebar-icon" />,
      notifications: 2
    },
  ];

  // Medical navigation items
  const medicalNavItems = [
    { 
      name: 'Appointments', 
      icon: <FiClipboard className="sidebar-icon" />,
      notifications: 1
    },
    { 
      name: 'Statistics', 
      icon: <FiBarChart2 className="sidebar-icon" />,
      notifications: 0
    },
    { 
      name: 'Tests', 
      icon: <FiActivity className="sidebar-icon" />,
      notifications: 3
    },
    { 
      name: 'Prescriptions', 
      icon: <FiBookmark className="sidebar-icon" />,
      notifications: 0
    },
  ];

  // Account navigation items
  const accountNavItems = [
    { 
      name: 'Chat', 
      icon: <FiMessageSquare className="sidebar-icon" />,
      notifications: 5
    },
    { 
      name: 'Support', 
      icon: <FiHelpCircle className="sidebar-icon" />,
      notifications: 0
    },
    { 
      name: 'Profile', 
      icon: <FiUser className="sidebar-icon" />,
      notifications: 0
    },
    { 
      name: 'Settings', 
      icon: <FiSettings className="sidebar-icon" />,
      notifications: 0
    },
  ];

  // Render navigation items
  const renderNavItems = (items) => {
    return items.map((item) => (
      <li key={item.name} className="relative">
        <button
          onClick={() => {
            setActiveItem(item.name);
            onClose();
          }}
          className={`w-full flex items-center p-2 sm:p-3 rounded-lg transition-colors text-sm sm:text-base ${
            activeItem === item.name 
              ? 'bg-primary/10 text-primary font-medium' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="flex-shrink-0">
            {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
          </span>
          {!isCompact && (
            <span className="ml-3 text-left flex-1">{item.name}</span>
          )}
          {item.notifications > 0 && (
            <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {item.notifications}
            </span>
          )}
        </button>
      </li>
    ));
  };

  // Render section header
  const renderSectionHeader = (title, section) => (
    <div 
      className={`flex items-center justify-between px-3 py-2 ${!isCompact ? 'cursor-pointer' : ''}`}
      onClick={() => !isCompact && toggleSection(section)}
    >
      {!isCompact && (
        <>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
          {expandedSections[section] ? 
            <FiChevronDown className="w-4 h-4 text-gray-500" /> : 
            <FiChevronRight className="w-4 h-4 text-gray-500" />
          }
        </>
      )}
      {isCompact && <div className="w-full border-t border-gray-200 my-2"></div>}
    </div>
  );

  return (
    <div 
      className={`fixed lg:relative inset-y-0 left-0 bg-white h-full flex flex-col border-r border-gray-200 transition-all duration-300 z-30 transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${isCompact ? 'w-20' : 'w-64'}`}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCompact && <h2 className="text-xl font-bold text-primary">HealthCare</h2>}
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsCompact(!isCompact)}
            className="p-2 rounded-lg hover:bg-gray-100 hidden lg:block"
            aria-label={isCompact ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCompact ? <FiChevronRight /> : <FiChevronDown className="transform rotate-180" />}
          </button>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4 px-2">
        {/* Main Section */}
        {renderSectionHeader('Main', 'main')}
        {(!isCompact || (isCompact && expandedSections.main)) && (
          <ul className="px-3 mb-4">
            {renderNavItems(mainNavItems)}
          </ul>
        )}
        
        {/* Medical Section */}
        {renderSectionHeader('Medical', 'medical')}
        {(!isCompact || (isCompact && expandedSections.medical)) && (
          <ul className="px-3 mb-4">
            {renderNavItems(medicalNavItems)}
          </ul>
        )}
        
        {/* Account Section */}
        {renderSectionHeader('Account', 'account')}
        {(!isCompact || (isCompact && expandedSections.account)) && (
          <ul className="px-3">
            {renderNavItems(accountNavItems)}
          </ul>
        )}
      </div>
      
      <div className={`p-3 border-t border-gray-200 ${isCompact ? 'flex justify-center' : ''}`}>
        <div className="p-2 border-t border-gray-200">
          <button 
            className="w-full flex items-center text-gray-600 hover:text-red-600 p-2 sm:p-3 rounded-lg transition-colors text-sm sm:text-base"
            onClick={onClose}
          >
            <FiLogOut className="w-5 h-5" />
            {!isCompact && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
