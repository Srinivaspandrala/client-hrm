import React, { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const RouterContext = createContext();

export const RouterProvider = ({ children }) => {
    const navigate = useNavigate();
    const token = Cookies.get('token');

    useEffect(() => {
        if (!token) {
            Cookies.remove('username');
            Cookies.remove('token');
            navigate('/');
        }
    }, [token, navigate]);

    return (
        <RouterContext.Provider value={{ token, navigate }}>
            {children}
        </RouterContext.Provider>
    );
};

export const useRouter = () => useContext(RouterContext);
