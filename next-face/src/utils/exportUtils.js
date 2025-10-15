// src/utils/exportUtils.js
import { saveAs } from 'file-saver';

// Format airport names
const formatAirportName = (airportName) => {
  if (!airportName) return 'N/A';
  
  // Map airport codes to formatted names
  const airportMap = {
    'CAIRO_AIRPORT': 'Cairo Airport',
    'HURGHADA_AIRPORT': 'Hurghada Airport',
  };
  
  // Return formatted name if exists, otherwise return original
  return airportMap[airportName] || airportName;
};

// Function to export data as CSV
export const exportToCSV = (data, filename = 'users_export', dataType = 'users') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  // Transform data based on type
  let exportData;
  if (dataType === 'subscriptions') {
    exportData = data.map(subscription => ({
      'Email Address': subscription.email || 'N/A'
    }));
  } else {
    // Default to users format
    exportData = data.map(user => ({
      'Full Name': user.name || 'N/A',
      'Email': user.email || 'N/A',
      'Phone Number': user.phoneNumber || 'N/A',
      'Organization': user.organizationName || 'N/A',
      'Speciality': user.speciality || 'N/A',
      'Nationality': user.nationality || 'N/A',
      'Airport Name': formatAirportName(user.airportName),
      'Flight Details': user.flightDetails || 'N/A'
    }));
  }

  // Convert data to CSV format
  const csvContent = [
    // Headers
    Object.keys(exportData[0]).join(','),
    // Data rows
    ...exportData.map(row => 
      Object.values(row).map(value => 
        // Escape commas and quotes in CSV
        typeof value === 'string' && (value.includes(',') || value.includes('"')) 
          ? `"${value.replace(/"/g, '""')}"` 
          : value
      ).join(',')
    )
  ].join('\n');

  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Generate filename with current date
  const date = new Date().toISOString().split('T')[0];
  const finalFilename = `${filename}_${date}.csv`;
  
  saveAs(blob, finalFilename);
}; 