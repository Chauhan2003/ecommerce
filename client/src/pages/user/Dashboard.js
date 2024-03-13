import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import UserMenu from '../../components/UserMenu';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/auth';

const Dashboard = () => {
    const [user] = useAuth();
    return (
        <Layout title={'Dashboard - Ecommerce App'}>
            <Grid container spacing={2} className='px-4 py-2'>
                <Grid item xs={3}>
                    <UserMenu />
                </Grid>
                <Grid item xs={9}>
                    <Box className='dark:bg-graay-900 text-white p-4'>
                        <Typography fontSize={30}>Name: {user.user.name}</Typography>
                        <Typography fontSize={30}>Email: {user.user.email}</Typography>
                        <Typography fontSize={30}>Phone: {user.user.phone}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Dashboard
