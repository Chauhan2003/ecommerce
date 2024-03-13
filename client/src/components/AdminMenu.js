import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminMenu = () => {
    const navigate = useNavigate();

    const handleCreateProduct = () => {
        navigate(`/dashboard/admin/createproduct`);
    }

    const handleCreateCategory = () => {
        navigate(`/dashboard/admin/createcategory`);
    }

    const handleUsers = () => {
        navigate(`/dashboard/admin/users`);
    }
    return (
        <div className='text-white'>
            <Typography fontSize={20} fontWeight={600} p={'10px 15px'} className='dark:bg-gray-900'>Admin Panel</Typography>
            <List className='dark:bg-gray-700'>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleCreateCategory}>
                        <ListItemText primary="Create Category" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleCreateProduct}>
                        <ListItemText primary="Create Product" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleUsers}>
                        <ListItemText primary="Users" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    )
}

export default AdminMenu
