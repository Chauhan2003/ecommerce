import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='py-5 dark:bg-gray-900 text-white'>
            <Typography textAlign={'center'} fontSize={25}>
                All right reserved &copy; Gagan Chauhan
            </Typography>
            <div className='text-center flex justify-center gap-4 pt-2'>
                <Link to='/about' className='hover:underline text-blue-500'>About</Link>
                <Link to='/contact' className='hover:underline text-blue-500'>Contact</Link>
                <Link to='/policy' className='hover:underline text-blue-500'>Policy</Link>
                <Link to='/query' className='hover:underline text-blue-500'>Query</Link>
            </div>
        </div>
    )
}

export default Footer
