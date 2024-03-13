import React from 'react'
import Layout from '../../components/Layout'
import { Box, Grid, Typography } from '@mui/material'
import AdminMenu from '../../components/AdminMenu'

const CreateProduct = () => {
    return (
        <Layout title={'Admin Dashboard - Ecommerce App'}>
            <Grid container spacing={2} className='px-4 py-2'>
                <Grid item xs={3}>
                    <AdminMenu />
                </Grid>
                <Grid item xs={9}>

                </Grid>
            </Grid>
        </Layout>
    )
}

export default CreateProduct
