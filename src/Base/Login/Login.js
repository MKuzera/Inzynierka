import React, { useState } from 'react';
import './Login.css';
import { useAuth } from '../AuthContext/AuthContext';

const Login = ({ setActivePage }) => {
    const { loginUser } = useAuth();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for the error message

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser(login, password);
            setActivePage('start');
        } catch (error) {
            setErrorMessage('Nieprawidłowy login lub hasło');
        }
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
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Show error message */}
            <button onClick={() => setActivePage('register')}>Zarejestruj się</button>
        </div>
    );
};

export default Login;
