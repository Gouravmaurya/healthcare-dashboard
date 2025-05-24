import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import { activityData } from '../../data/mockData';
import { chartContainer, chartItem, dataCard, chartRefresh } from '../../animations';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ActivityChart = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle period change with animation
  const handlePeriodChange = (e) => {
    setIsRefreshing(true);
    setSelectedPeriod(e.target.value);
    
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };
  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1F2937',
        padding: 10,
        cornerRadius: 4,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: function(context) {
            return `${context.parsed.y} steps`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <motion.div 
      className="w-full"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={chartContainer}
    >
      <motion.div 
        className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 sm:mb-6 gap-3"
        variants={chartItem}
      >
        <motion.h2 
          className="text-lg sm:text-xl font-semibold text-gray-800"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Weekly Activity
        </motion.h2>
        <div className="flex items-center w-full xs:w-auto">
          <motion.div 
            className="flex items-center mr-3 sm:mr-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <motion.div 
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-primary rounded-full mr-1.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 15, 
                delay: 0.3 
              }}
            ></motion.div>
            <span className="text-xs text-gray-500 whitespace-nowrap">Steps</span>
          </motion.div>
          <motion.select 
            className="text-xs sm:text-sm border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary w-full xs:w-auto"
            style={{
              WebkitAppearance: 'none',
              padding: '0.4rem 2rem 0.4rem 0.75rem',
              backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%236B7280\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1rem',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            value={selectedPeriod}
            onChange={handlePeriodChange}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <option>This Week</option>
            <option>Last Week</option>
            <option>Last Month</option>
          </motion.select>
        </div>
      </motion.div>
      
      <motion.div 
        className="h-56 sm:h-64 md:h-72 lg:h-80"
        variants={isRefreshing ? chartRefresh : chartItem}
        initial={isRefreshing ? "hidden" : false}
        animate={isRefreshing ? "visible" : false}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPeriod}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            style={{ height: '100%' }}
          >
            <Bar 
              options={{
                ...options,
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  ...options.plugins,
                  legend: {
                    ...options.plugins.legend,
                    position: 'top',
                  },
                },
                animation: {
                  duration: 800,
                  easing: 'easeOutQuart'
                }
              }} 
              data={activityData} 
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      
      <motion.div 
        className="mt-4 sm:mt-6 grid grid-cols-2 gap-4"
        variants={chartItem}
      >
        <motion.div 
          className="bg-gray-50 rounded-lg p-3 sm:p-4"
          variants={dataCard}
          whileHover="hover"
        >
          <p className="text-xs sm:text-sm text-gray-500 mb-1">Daily Average</p>
          <motion.p 
            className="text-base sm:text-xl font-semibold text-gray-800"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              6,229 <span className="text-sm font-normal text-gray-500">steps</span>
            </motion.span>
          </motion.p>
        </motion.div>
        <motion.div 
          className="bg-gray-50 rounded-lg p-3 sm:p-4"
          variants={dataCard}
          whileHover="hover"
        >
          <p className="text-xs sm:text-sm text-gray-500 mb-1">Total This Week</p>
          <motion.p 
            className="text-base sm:text-xl font-semibold text-gray-800"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              43,603 <span className="text-sm font-normal text-gray-500">steps</span>
            </motion.span>
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ActivityChart;
