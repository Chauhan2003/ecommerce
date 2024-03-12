import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner'

const Private = () => {
    const [user, setUser] = useAuth()
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/user/isauthenticated`)
                setSuccess(true);
            } catch (err) {
                setSuccess(false);
            }
        }
        if (user?.token) authCheck();
    }, [user?.token]);
    return success ? <Outlet /> : <Spinner />
}

export default Private
