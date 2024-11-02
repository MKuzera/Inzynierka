import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ isLogged: false, login: '', password: '', userID: 'defaultID', userType: 'defaultType' });

    const loginUser = (login, password) => {
        setAuthState({ isLogged: true, login, password, userID: '100', userType: 'Organizer' });
    };

    const logoutUser = () => {
        setAuthState({ isLogged: false, login: '', password: '', userID: '', userType: '' });
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
