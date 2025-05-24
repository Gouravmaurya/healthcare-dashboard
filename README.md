# Healthcare Dashboard

A modern healthcare dashboard frontend built with React and Tailwind CSS.

## Features

- **Header** with logo, search bar, notifications, and profile section
- **Sidebar** with navigation links and icons
- **Dashboard Overview** with:
  - Human anatomy status (Heart, Lungs, Teeth, Bone)
  - Calendar for appointment booking
  - Upcoming appointments section
  - Weekly activity chart

## Project Structure

```
healthcare-dashboard/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── ActivityChart.jsx
│   │   │   ├── AnatomyStatus.jsx
│   │   │   ├── AppointmentsSection.jsx
│   │   │   ├── CalendarSection.jsx
│   │   │   └── Dashboard.jsx
│   │   └── layout/
│   │       ├── Header.jsx
│   │       └── Sidebar.jsx
│   ├── data/
│   │   └── mockData.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Technologies Used

- React
- Vite
- Tailwind CSS
- Chart.js / React-Chartjs-2
- React Icons

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
# or
yarn build
```

## License

MIT
