import React, { useEffect, useState } from 'react';
import CustomLoader from '../components/skeletons/CustomLoader';
import { Box } from '@mui/material';
import SearchAndFilter from '../components/SearchAndFilter/SearchAndFilter';
import CustomPaginatedTable from '../components/CustomPaginatedTable/CustomPaginatedTable';
import CustomPagination from '../components/Pagination/Pagination';
import CustomSkeleton from '../components/skeletons/CustomSkeleton';
import useUsers from '../hooks/useUsers';

export default function Users() {
  const {
    users,
    status,
    setStatus,
    search,
    setSearch,
    page,
    setPage,
    pageCount,
    loadingResendActivation,
    loadingUser,
    loadingDeleteUser,
    totalCount,
    handleReset,
    handleApply,
    fetchAllUsers,

  } = useUsers();



  const columns = [
    { key: 'name', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'phoneNumber', label: 'Phone' },
    { key: 'speciality', label: 'Speciality' },
    { key: 'organizationName', label: 'Organization' },

  ];


  return (
    <>
      <CustomLoader show={loadingDeleteUser || loadingResendActivation} />

{loadingUser ? <CustomSkeleton width="14.111rem" height="2.5rem" borderRadius="2rem" sx={{m:0, mb:'1.556rem'}} /> : <h2>Users {totalCount}</h2>}

      <Box
        sx={{
          bgcolor: '#fff',
          borderRadius: '0.889rem',
          overflowX: 'auto',
          maxWidth: '100%',
          border: '1px solid #3788F442',
        }}
      >
        <SearchAndFilter
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          onReset={handleReset}
          onApply={handleApply}
          maxLength={30}
          statusOptions={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ]}
          searchPlaceholder="Search by name"
          fetchAllUsers={fetchAllUsers}
        />
        <CustomPaginatedTable
          columns={columns}
          data={users}
          loading={loadingUser}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '1.556rem' }}>
        {loadingUser ? (
          <CustomSkeleton
            width="14.111rem"
            height="2.5rem"
            borderRadius="2rem"
          />
        ) : pageCount > 1 ? (
          <CustomPagination
            page={page + 1}
            count={pageCount}
            onChange={uiPage => setPage(uiPage - 1)}
          />
        ) : (
          ''
        )}
      </Box>


    </>
  );
}
