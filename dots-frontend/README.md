# DOTS Frontend

This project is a frontend application for the DOTS system, built using React, Vite, and TypeScript. The application is designed to provide a dashboard for monitoring agricultural fields, displaying key performance indicators (KPIs), alerts, and recommendations based on sensor data.

## Project Structure

The project is organized as follows:

```
dots-frontend
├── package.json          # Configuration file for npm
├── tsconfig.json         # TypeScript configuration file
├── vite.config.ts        # Vite configuration file
├── .gitignore            # Git ignore file
├── README.md             # Project documentation
├── public
│   └── index.html        # Main HTML file
└── src
    ├── main.tsx          # Entry point of the React application
    ├── App.tsx           # Main App component with routing
    ├── routes.tsx        # Application routing
    ├── lib
    │   └── queryClient.ts # React Query client setup
    ├── api
    │   ├── client.ts      # Axios instance for future REST API calls
    │   ├── mockApi.ts     # Mock data and API simulation
    │   ├── simulator.ts    # Real-time data simulator
    │   └── types.ts       # TypeScript types for data models
    ├── pages
    │   ├── Dashboard
    │   │   ├── Dashboard.tsx # Dashboard component
    │   │   ├── Kpis.tsx      # KPIs component
    │   │   └── Alerts.tsx    # Alerts component
    │   ├── Fields
    │   │   ├── FieldsList.tsx # Fields list component
    │   │   └── FieldDetail.tsx # Field detail component
    │   └── Settings
    │       └── Settings.tsx   # Settings component
    ├── components
    │   ├── Charts
    │   │   └── TimeSeries.tsx  # Time-series chart component
    │   ├── Map
    │   │   └── FieldMap.tsx     # Map component
    │   └── Recommendations
    │       └── RecList.tsx      # Recommendations list component
    └── theme
        └── theme.ts             # Theme configuration for Material UI
```

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd dots-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## Features

- **Dashboard**: Displays KPIs, alerts, and time-series graphs.
- **Fields List**: Shows a list of agricultural fields with crop information.
- **Field Detail**: Provides detailed information about a specific field, including a map with sensors and time-series data.
- **Recommendations**: Displays actionable recommendations based on sensor data.
- **Real-Time Simulation**: Simulates real-time data updates to enhance user experience.

## Future Development

This project is designed to be easily extendable. The mock API can be replaced with a real REST API in the future, allowing for dynamic data fetching and updates.