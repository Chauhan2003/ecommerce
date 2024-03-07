import { useState, useEffect, useContext, createContext } from "react"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        user: null,
        token: ''
    })
    return (
        <AuthContext.Provider value={[user, setUser]}>
            { children }
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };