import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { upcomingAppointments } from '../../data/mockData';
import { FiClock, FiUser, FiX, FiCalendar, FiPhone, FiMapPin, FiMessageSquare, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { fadeIn, slideUp, staggerContainer, listItem, modalOverlay, modalContent } from '../../animations';

const AppointmentModal = ({ appointment, onClose, onReschedule, onCancel }) => {
  if (!appointment) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={modalOverlay}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        variants={modalContent}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Appointment Details</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex items-start mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
              <img 
                src={appointment.avatar} 
                alt={appointment.doctor} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900">{appointment.doctor}</h4>
              <p className="text-gray-600">{appointment.specialty}</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Confirmed
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-3">
                <FiCalendar className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium">{appointment.date} • {appointment.time}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-3">
                <FiMapPin className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">
                  {appointment.location || 'Online Video Consultation'}
                </p>
                {appointment.meetingLink && (
                  <a 
                    href={appointment.meetingLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm mt-1 inline-block hover:underline"
                  >
                    Join Meeting
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-3">
                <FiMessageSquare className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Notes</p>
                <p className="text-gray-700">
                  {appointment.notes || 'No additional notes for this appointment.'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
            <motion.button
              onClick={() => onReschedule(appointment.id)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              whileHover={{ scale: 1.02, backgroundColor: '#f9fafb' }}
              whileTap={{ scale: 0.98 }}
            >
              <FiEdit2 className="w-4 h-4" />
              <span>Reschedule</span>
            </motion.button>
            <motion.button
              onClick={() => onCancel(appointment.id)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-red-100 rounded-lg text-red-600 bg-red-50 hover:bg-red-100"
              whileHover={{ scale: 1.02, backgroundColor: '#fee2e2' }}
              whileTap={{ scale: 0.98 }}
            >
              <FiTrash2 className="w-4 h-4" />
              <span>Cancel</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AppointmentsSection = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Small delay before clearing the selected appointment for smoother transition
    setTimeout(() => setSelectedAppointment(null), 300);
  };

  const handleReschedule = (appointmentId) => {
    console.log('Reschedule appointment:', appointmentId);
    // In a real app, this would open a rescheduling form
  };

  const handleCancel = (appointmentId) => {
    console.log('Cancel appointment:', appointmentId);
    // In a real app, this would show a confirmation dialog
    setIsModalOpen(false);
  };
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h2>
        <button className="text-sm text-primary font-medium hover:underline">
          View All
        </button>
      </div>
      
      <AnimatePresence>
        {isModalOpen && (
          <AppointmentModal 
            appointment={selectedAppointment}
            onClose={handleCloseModal}
            onReschedule={handleReschedule}
            onCancel={handleCancel}
            key="appointment-modal"
          />
        )}
      </AnimatePresence>
      
      <motion.div 
        className="space-y-6"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {upcomingAppointments.map((day, dayIndex) => (
          <motion.div 
            key={day.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * dayIndex }}
          >
            <motion.h3 
              className="text-sm font-medium text-gray-500 mb-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * dayIndex }}
            >
              {day.date}
            </motion.h3>
            <motion.div 
              className="space-y-3"
              variants={staggerContainer}
            >
              {day.appointments.map((appointment, index) => (
                <motion.div 
                  key={appointment.id}
                  className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleAppointmentClick(appointment)}
                  variants={listItem}
                  whileHover={{ y: -2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  custom={index}
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img 
                        src={appointment.avatar} 
                        alt={appointment.doctor} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{appointment.doctor}</h4>
                      <p className="text-xs text-gray-500">{appointment.specialty}</p>
                      <div className="mt-2 flex items-center text-xs text-gray-500">
                        <FiClock className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span>{appointment.time}</span>
                        {appointment.type === 'video' && (
                          <span className="ml-2 inline-flex items-center text-blue-600">
                            <FiPhone className="w-3 h-3 mr-1" />
                            <span>Video Call</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AppointmentsSection;
