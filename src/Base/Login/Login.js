import React, { useState } from 'react';
import './Login.css';
import { useAuth  } from '../AuthContext/AuthContext.js';
import { LoginService } from '../Api/LoginService.js';

const Login = ({ setActivePage }) => {
    const { loginUser } = useAuth();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const loginServiceInstance = new LoginService('');
        loginServiceInstance.loginUser(login, password)
            .then((data) => {
                loginUser(login, password);
                console.log('Login successful:', data);
                setActivePage('start');
            })
            .catch((error) => {
                console.error('Failed to log in:', error);
            });

        console.log(`Login: ${login}, Password: ${password}`);
        setActivePage('start');
    };

    return (
        <div className="login-container">
            <h2>Zaloguj się</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="login">Login:</label>
                    <input
                        type="text"
                        id="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Hasło:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Zaloguj</button>
            </form>
            <button onClick={() => setActivePage('register')}>Zarejestruj się</button>
        </div>
    );
};

export default Login;
