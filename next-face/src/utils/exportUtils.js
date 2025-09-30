// src/utils/exportUtils.js
import { saveAs } from 'file-saver';

// Function to export data as CSV
export const exportToCSV = (data, filename = 'users_export') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  // Transform data to include only the fields we want to export
  const exportData = data.map(user => ({
    'Full Name': user.name || 'N/A',
    'Email': user.email || 'N/A',
    'Phone Number': user.phoneNumber || 'N/A',
    'Organization': user.organizationName || 'N/A',
    'Speciality': user.speciality || 'N/A',
    'Nationality': user.nationality || 'N/A'
  }));

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