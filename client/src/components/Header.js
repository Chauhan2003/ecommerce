import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Avatar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';

const Header = () => {
    const [user, setUser] = useAuth();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        navigate('/login')
    }

    const handleDashboard = () => {
        navigate(`/dashboard/${user?.user.role === 1 ? 'admin' : 'user'}`);
    }

    const handleLogout = () => {
        setUser({
            ...user,
            user: null,
            token: ''
        });
        localStorage.removeItem('user');
        navigate('/login');
        toast.success('Logout successfully')
    }
    return (
        <>
            <nav class="bg-white border-gray-200 dark:bg-gray-900">
                <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-2 px-4">
                    <div class="flex items-center space-x-3 rtl:space-x-reverse">
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white select-none">Ecommerce</span>
                    </div>
                    <div class="flex items-center space-x-6 rtl:space-x-reverse">
                        <Link to='/contact' class="text-[15px]  text-gray-500 dark:text-white">(+91) 9056360204</Link>
                        {
                            !user.user ? (
                                <>
                                    <Button variant='contained' onClick={handleLogin}>Login</Button>
                                </>
                            ) : (
                                <>
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar sx={{ width: 38, height: 38, background: 'white', color: 'black' }}>
                                            {user.user && user.user.name ? user.user.name.charAt(0) : ''}
                                        </Avatar>
                                    </IconButton>

                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </Menu>
                                </>
                            )
                        }
                    </div>
                </div>
            </nav>
            <nav class="bg-gray-50 dark:bg-gray-700">
                <div class="max-w-screen-xl px-4 py-1 mx-auto">
                    <div class="flex justify-between items-center">
                        <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <Link to="/" class="text-gray-900 select-none text-[16px] dark:text-white" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link to="/about" class="text-gray-900 select-none text-[16px] dark:text-white">About</Link>
                            </li>
                            <li>
                                <Link to="/contact" class="text-gray-900 select-none text-[16px] dark:text-white">Contact</Link>
                            </li>
                            <li>
                                <Link to="/policy" class="text-gray-900 select-none text-[16px] dark:text-white">Policy</Link>
                            </li>
                        </ul>
                        <div>
                            <IconButton>
                                <ShoppingCartIcon sx={{ color: 'white', fontSize: '25px' }} />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header
