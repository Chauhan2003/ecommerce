import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserMenu = () => {
    const navigate = useNavigate();

    const handleCreateProfile = () => {
        navigate(`/dashboard/user/profile`);
    }

    const handleCreateOrders = () => {
        navigate(`/dashboard/user/orders`);
    }
    return (
        <div className='text-white'>
            <Typography fontSize={20} fontWeight={600} p={'10px 15px'} className='dark:bg-gray-900'>User Panel</Typography>
            <List className='dark:bg-gray-700'>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleCreateProfile}>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleCreateOrders}>
                        <ListItemText primary="Orders" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    )
}

export default UserMenu
