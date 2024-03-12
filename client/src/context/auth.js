import { useState, useEffect, useContext, createContext } from "react"
import axios from 'axios'

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        user: null,
        token: ''
    })

    // Default axios headers setup:
    axios.defaults.headers.common['Authorization'] = user?.token

    useEffect(() => {
        const data = localStorage.getItem('user');
        if (data) {
            const parseData = JSON.parse(data);
            setUser({
                ...user,
                user: parseData.user,
                token: parseData.token
            });
        }
    }, []);
    return (
        <AuthContext.Provider value={[user, setUser]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };