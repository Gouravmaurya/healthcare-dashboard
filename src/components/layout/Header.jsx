import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiBell, FiPlus, FiMenu, FiUser, FiSettings, FiLogOut, FiFileText, FiCalendar, FiMessageSquare, FiHelpCircle, FiChevronDown } from 'react-icons/fi';
import { fadeIn, slideUp, springIn, modalContent } from '../../animations';

const Header = ({ onMenuClick }) => {
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const newMenuRef = useRef(null);
  const mobileNewMenuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const newButtonRef = useRef(null);
  const mobileNewButtonRef = useRef(null);
  const profileRef = useRef(null);
  
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close desktop new menu when clicking outside
      if (newMenuRef.current && newButtonRef.current && 
          !newMenuRef.current.contains(event.target) && 
          !newButtonRef.current.contains(event.target)) {
        setShowNewMenu(false);
      }
      
      // Close mobile new menu when clicking outside
      if (mobileNewMenuRef.current && mobileNewButtonRef.current && 
          !mobileNewMenuRef.current.contains(event.target) && 
          !mobileNewButtonRef.current.contains(event.target)) {
        setShowNewMenu(false);
      }
      
      // Close profile menu when clicking outside
      if (profileMenuRef.current && profileRef.current && 
          !profileMenuRef.current.contains(event.target) && 
          !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Toggle menus
  const toggleNewMenu = () => setShowNewMenu(!showNewMenu);
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
  
  return (
    <motion.header 
      className="bg-white border-b border-gray-200 px-3 sm:px-4 py-3 flex items-center justify-between sticky top-0 z-10"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
          aria-label="Toggle menu"
        >
          <FiMenu className="w-6 h-6 text-gray-600" />
        </button>
        <motion.h1 
          className="text-xl font-bold text-primary whitespace-nowrap"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          Healthcare.
        </motion.h1>
        <motion.div 
          className="relative hidden sm:block"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-40 md:w-56 lg:w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
          />
        </motion.div>
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-4">
        <motion.button 
          className="p-2 text-gray-500 hover:text-primary focus:outline-none relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiBell className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute top-1.5 right-1.5 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </motion.button>
        
        {/* Desktop New Button with Dropdown */}
        <div className="relative">
          <motion.button 
            ref={newButtonRef}
            className="hidden sm:flex items-center bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary/90 focus:outline-none"
            whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)' }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={toggleNewMenu}
          >
            <FiPlus className="w-5 h-5" />
            <span className="ml-1 text-sm font-medium hidden md:inline">New</span>
            <FiChevronDown className="ml-1 w-4 h-4" />
          </motion.button>
          
          {/* New popup menu */}
          <AnimatePresence>
            {showNewMenu && (
              <motion.div
                ref={newMenuRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20 border border-gray-100"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={springIn}
              >
                <motion.div 
                  className="py-1" 
                  variants={modalContent}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ staggerChildren: 0.05, delayChildren: 0.05 }}
                >
                  <motion.button 
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiFileText className="mr-3 h-4 w-4 text-gray-500" />
                    <span>New Document</span>
                  </motion.button>
                  <motion.button 
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                  >
                    <FiCalendar className="mr-3 h-4 w-4 text-gray-500" />
                    <span>New Appointment</span>
                  </motion.button>
                  <motion.button 
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <FiMessageSquare className="mr-3 h-4 w-4 text-gray-500" />
                    <span>New Message</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Mobile New Button with Dropdown */}
        <div className="relative sm:hidden">
          <motion.button 
            ref={mobileNewButtonRef}
            className="p-2 text-gray-500 hover:text-primary focus:outline-none"
            whileTap={{ scale: 0.9 }}
            onClick={toggleNewMenu}
          >
            <FiPlus className="w-5 h-5" />
          </motion.button>
          
          {/* Mobile New popup menu */}
          <AnimatePresence>
            {showNewMenu && (
              <motion.div
                ref={mobileNewMenuRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20 border border-gray-100"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={springIn}
              >
                <motion.div 
                  className="py-1" 
                  variants={modalContent}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ staggerChildren: 0.05, delayChildren: 0.05 }}
                >
                  <motion.button 
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiFileText className="mr-3 h-4 w-4 text-gray-500" />
                    <span>New Document</span>
                  </motion.button>
                  <motion.button 
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                  >
                    <FiCalendar className="mr-3 h-4 w-4 text-gray-500" />
                    <span>New Appointment</span>
                  </motion.button>
                  <motion.button 
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <FiMessageSquare className="mr-3 h-4 w-4 text-gray-500" />
                    <span>New Message</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Profile Section with Dropdown */}
        <div className="relative">
          <motion.div 
            ref={profileRef}
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={toggleProfileMenu}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="hidden sm:flex flex-col items-end">
              <div className="flex items-center">
                <span className="font-medium text-sm">Dr. Sarah Johnson</span>
                <FiChevronDown className="ml-1 w-4 h-4 text-gray-500" />
              </div>
              <span className="text-xs text-gray-500">Cardiologist</span>
            </div>
            <motion.div 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
          
          {/* Profile dropdown menu */}
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                ref={profileMenuRef}
                className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-20 border border-gray-100"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={springIn}
              >
                <motion.div 
                  className="px-4 py-3 border-b border-gray-100"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm font-medium text-gray-900">Dr. Sarah Johnson</p>
                  <p className="text-xs text-gray-500 truncate">sarah.johnson@healthcare.com</p>
                </motion.div>
                <motion.div 
                  className="py-1" 
                  variants={modalContent}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ staggerChildren: 0.05, delayChildren: 0.05 }}
                >
                  <motion.button 
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiUser className="mr-3 h-4 w-4 text-gray-500" />
                    <span>Your Profile</span>
                  </motion.button>
                  <motion.button 
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                  >
                    <FiSettings className="mr-3 h-4 w-4 text-gray-500" />
                    <span>Settings</span>
                  </motion.button>
                  <motion.button 
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <FiHelpCircle className="mr-3 h-4 w-4 text-gray-500" />
                    <span>Help Center</span>
                  </motion.button>
                </motion.div>
                <motion.div 
                  className="py-1 border-t border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.button 
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.25 }}
                  >
                    <FiLogOut className="mr-3 h-4 w-4" />
                    <span>Sign out</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
