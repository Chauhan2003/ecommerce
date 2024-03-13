import React from 'react'
import Layout from '../../components/Layout'
import { Box, Grid, Typography } from '@mui/material'
import AdminMenu from '../../components/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
  const [user] = useAuth();
  return (
    <Layout title={'Admin Dashboard - Ecommerce App'}>
      <Grid container spacing={2} className='px-4 py-2'>
        <Grid item xs={3}>
          <AdminMenu />
        </Grid>
        <Grid item xs={9}>
          <Box className='dark:bg-gray-900 text-white p-4'>
            <Typography fontSize={30}>Name: {user.user.name}</Typography>
            <Typography fontSize={30}>Email: {user.user.email}</Typography>
            <Typography fontSize={30}>Phone: {user.user.phone}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default AdminDashboard
