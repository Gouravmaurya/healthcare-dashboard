// Mock data for the healthcare dashboard

// Anatomy status data
export const anatomyStatusData = [
  { 
    id: 1, 
    name: 'Heart', 
    status: 'Healthy', 
    icon: '❤️',
    details: 'Blood pressure: 120/80 mmHg, Heart rate: 72 bpm' 
  },
  { 
    id: 2, 
    name: 'Lungs', 
    status: 'Stable', 
    icon: '🫁',
    details: 'Oxygen saturation: 97%, Respiratory rate: 16 breaths/min' 
  },
  { 
    id: 3, 
    name: 'Teeth', 
    status: 'Critical', 
    icon: '🦷',
    details: 'Requires immediate dental checkup, Last visit: 8 months ago' 
  },
  { 
    id: 4, 
    name: 'Bone', 
    status: 'Healthy', 
    icon: '🦴',
    details: 'Bone density: Normal, Last scan: 2 months ago' 
  },
  { 
    id: 5, 
    name: 'Liver', 
    status: 'Healthy', 
    icon: '🫓',
    details: 'Liver function tests normal, No fatty deposits detected' 
  },
  { 
    id: 6, 
    name: 'Kidneys', 
    status: 'Stable', 
    icon: '🫘',
    details: 'GFR: 85 mL/min, Creatinine: 0.9 mg/dL, Hydration levels adequate' 
  },
  { 
    id: 7, 
    name: 'Brain', 
    status: 'Healthy', 
    icon: '🧠',
    details: 'Cognitive function normal, No abnormalities detected in recent scan' 
  },
  { 
    id: 8, 
    name: 'Intestines', 
    status: 'Stable', 
    icon: '🥢',
    details: 'Digestive function normal, Last colonoscopy: 1 year ago' 
  },
  { 
    id: 9, 
    name: 'Head', 
    status: 'Healthy', 
    icon: '👤',
    details: 'No headaches reported, Vision and hearing tests normal' 
  },
  { 
    id: 10, 
    name: 'Neck', 
    status: 'Stable', 
    icon: '👔',
    details: 'Range of motion normal, Mild tension noted' 
  },
  { 
    id: 11, 
    name: 'Chest', 
    status: 'Healthy', 
    icon: '👕',
    details: 'Respiratory sounds clear, No abnormalities detected' 
  },

  { 
    id: 13, 
    name: 'Left Arm', 
    status: 'Healthy', 
    icon: '💪',
    details: 'Full range of motion, Grip strength normal' 
  },
  { 
    id: 14, 
    name: 'Right Arm', 
    status: 'Healthy', 
    icon: '💪',
    details: 'Full range of motion, Grip strength normal' 
  },
  { 
    id: 15, 
    name: 'Left Leg', 
    status: 'Stable', 
    icon: '🦵',
    details: 'Mild knee pain reported during exercise, Otherwise normal' 
  },
  { 
    id: 16, 
    name: 'Right Leg', 
    status: 'Healthy', 
    icon: '🦵',
    details: 'Full range of motion, Strength and reflexes normal' 
  },
];

// Calendar appointment slots
export const calendarSlots = [
  { id: 1, time: '09:00 AM', available: true },
  { id: 2, time: '10:00 AM', available: false },
  { id: 3, time: '11:00 AM', available: true },
  { id: 4, time: '12:00 PM', available: false },
  { id: 5, time: '01:00 PM', available: true },
  { id: 6, time: '02:00 PM', available: true },
  { id: 7, time: '03:00 PM', available: false },
  { id: 8, time: '04:00 PM', available: true },
];

// Upcoming appointments
export const upcomingAppointments = [
  {
    id: 1,
    date: 'Today',
    appointments: [
      {
        id: 101,
        time: '11:30 AM',
        doctor: 'Dr. Emily Chen',
        specialty: 'Cardiologist',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      }
    ]
  },
  {
    id: 2,
    date: 'Tomorrow',
    appointments: [
      {
        id: 201,
        time: '09:15 AM',
        doctor: 'Dr. Michael Rodriguez',
        specialty: 'Dentist',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      }
    ]
  },
  {
    id: 3,
    date: 'May 26, 2025',
    appointments: [
      {
        id: 301,
        time: '02:00 PM',
        doctor: 'Dr. Sarah Johnson',
        specialty: 'Neurologist',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      },
      {
        id: 302,
        time: '04:30 PM',
        doctor: 'Dr. James Wilson',
        specialty: 'Physiotherapist',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      }
    ]
  }
];

// Activity data for chart
export const activityData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Steps',
      data: [6500, 5900, 8000, 8100, 5600, 5500, 4000],
      backgroundColor: '#4F46E5',
    }
  ]
};
