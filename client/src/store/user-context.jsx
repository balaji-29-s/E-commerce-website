import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const UserContext = createContext({
    user: null,
    isAuthenticated: false,
    cart: [],
    cartLength: 0,
    login: (username, password) => { return Promise.resolve(); },
    logout: () => { }
});

export const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cart, setCart] = useState([]); // Added state for cart
    const [cartLength, setCartLength] = useState(0);

    const fetchUserProfile = () => {
        const token = window.localStorage.getItem('token');
        if (!token) return;

        axios.get('http://localhost:1234/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setUser(res.data);
                setIsAuthenticated(true);
            })
            .catch((err) => {
                console.log(err);
                window.localStorage.removeItem('token');
                setUser(null);
                setIsAuthenticated(false);
            });
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const login = (username, password) => {
        return axios.post('http://localhost:1234/login', { username, password })
            .then((res) => {
                window.localStorage.setItem('token', res.data?.token);
                setIsAuthenticated(true);
                toast.success('LoggedIn Successfully');
                fetchUserProfile();
                return res;
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || "Login Failed");
                throw err;
            });
    };

    const logout = () => {
        window.localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        toast.success('Logged out successfully');
    };

    const contextValue = {
        user,
        isAuthenticated,
        cart,
        cartLength,
        login,
        logout
    };

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    );
};