import React, { createContext, useContext, useState } from 'react';
import { loginUserAsync } from '../ApiServices/LoginService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isLogged: false,
        login: '',
        token: '',
        userID: 'defaultID',
        userType: 'defaultType',
    });

    const loginUser = async (login, password) => {
        try {
            const userData = await loginUserAsync(login, password);
            setAuthState({
                isLogged: true,
                login,
                token: userData.token,
                userID: userData.userId || 'defaultID',
                userType: userData.userType || 'defaultType',
            });
        } catch (error) {
            console.error('Login failed:', error);
            setAuthState({ isLogged: false, login: '', token: '', userID: '', userType: '' });
            throw error;
        }
    };

    const logoutUser = () => {
        setAuthState({ isLogged: false, login: '', token: '', userID: '', userType: '' });
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
