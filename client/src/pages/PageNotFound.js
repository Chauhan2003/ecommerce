import React from 'react'
import Layout from '../components/Layout'
import { Box, Button, Typography } from '@mui/material'

const PageNotFound = () => {
    return (
        <Layout>
            <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] select-none'>
                <Box sx={{ borderRadius: '5px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography fontSize={80} fontWeight={600}>404</Typography>
                    <Typography fontSize={30}>Oops! Page Not Found</Typography>
                    <Button sx={{ color: 'black', border: '1.5px solid black', padding: '5px 15px', fontSize: '16px', fontWeight: '600', marginTop: '20px' }}>Go Back</Button>
                </Box>
            </div>
        </Layout>
    )
}

export default PageNotFound
