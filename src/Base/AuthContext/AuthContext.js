import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isLogged: false,
        login: '',
        password: '',
        userID: 'defaultID',
        userType: 'defaultType',
        token: ''
    });

    const loginUser = async (login, password) => {
        try {
            const response = await axios.post('http://3.66.111.69:3000/login', { login, password });
            const { message, userType, token } = response.data;

            setAuthState({
                isLogged: true,
                login,
                password,
                userID: '100',  // This could be dynamic based on the response
                userType,
                token
            });

            localStorage.setItem('authState', JSON.stringify({ message, userType, token }));

            console.log('Login successful:', message);
        } catch (error) {
            console.error('Failed to log in:', error);
        }
    };

    const logoutUser = () => {
        setAuthState({ isLogged: false, login: '', password: '', userID: '', userType: '', token: '' });
        localStorage.removeItem('authState');
    };

    return (
        <AuthContext.Provider value={{ authState, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
