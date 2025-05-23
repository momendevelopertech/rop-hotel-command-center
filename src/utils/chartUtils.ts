
// This file is kept for legacy purposes and might be used by other components
// We've moved to using Recharts for React components

import { Chart as ChartJS, registerables } from 'chart.js';

// Register Chart.js components
ChartJS.register(...registerables);

// Helper for cleaning up charts
export const cleanupCharts = () => {
  // In Chart.js v3+, we use getChart() instead of helpers.each
  // This safely destroys any existing chart instances
  const chartInstances = ChartJS.instances;
  Object.keys(chartInstances).forEach((key) => {
    chartInstances[key].destroy();
  });
};

export { ChartJS };
