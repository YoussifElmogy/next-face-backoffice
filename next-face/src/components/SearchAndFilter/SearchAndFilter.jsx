// src/components/SearchAndFilter/SearchAndFilter.jsx
import React from 'react';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchField from '../CustomTextField/SearchField';
import CustomButton from '../Button/Button';
import ResetButton from '../Button/ResetButton';
import { exportToCSV } from '../../utils/exportUtils';

export default function SearchAndFilter({
  search,
  onSearchChange,
  onReset,
  onApply,
  maxLength,
  searchPlaceholder = 'Search with name',
  // Export props
  exportData = null,
  showExport = true,
  exportFilename = 'users_export',
  fetchAllUsers = null,
}) {
  
  const handleExport = async () => {
    console.log('Export button clicked!');
    
    if (fetchAllUsers) {
      // Fetch all users from API for export
      console.log('Fetching all users for export...');
      const allUsers = await fetchAllUsers();
      console.log('All users fetched:', allUsers);
      
      if (!allUsers || allUsers.length === 0) {
        alert('No users data to export.');
        return;
      }
      
      // Map the API data for export
      const mappedData = allUsers.map(user => ({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        organizationName: user.organizationName,
        speciality: user.speciality,
        nationality: user.nationality,
      }));
      
      exportToCSV(mappedData, exportFilename);
    } else if (exportData) {
      // Fallback to provided exportData
      console.log('Export data:', exportData);
      
      if (exportData.length === 0) {
        alert('No users data to export.');
        return;
      }
      
      exportToCSV(exportData, exportFilename);
    } else {
      alert('No export function or data provided.');
    }
  };
  return (
    <Stack
      direction="row"
      padding="1.33rem"
      gap="0.556rem"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <Stack direction="row" alignItems="center" gap="0.556rem" flexWrap="wrap">
        <SearchField
          placeholder={searchPlaceholder}
          icon={<SearchIcon sx={{ color: '#6B7280', fontSize: '1.333rem' }} />}
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onApply();
            }
          }}
          inputProps={{ maxLength: maxLength }}
        />
      </Stack>
      <Stack direction="row" alignItems="center" gap="0.889rem">
        <ResetButton onClick={onReset} sx={{ minWidth: '7.944rem' }}>
          {' '}
          Reset
        </ResetButton>
        <CustomButton
          variant="secondary"
          onClick={onApply}
          sx={{ minWidth: '7.944rem' }}
        >
          Apply
        </CustomButton>
        {showExport && (
          <CustomButton
            variant="primary"
            onClick={handleExport}
            startIcon={<FileDownloadIcon />}
            sx={{ minWidth: '8.5rem' }}
          >
            Export CSV
          </CustomButton>
        )}
      </Stack>
    </Stack>
  );
}
