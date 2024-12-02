import React, { useState } from 'react';
import './Register.css';
import { RegisterUserAsync } from '../ApiServices/LoginService';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        login: '',
        haslo: '',
        powtorzHaslo: '',
    });
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await RegisterUserAsync(formData.login, formData.haslo, formData.email);
            console.log(response);
            if (response.success) {
                setMessage({ type: 'success', text: 'Rejestracja zakończona sukcesem!' });
            } else {
                setMessage({ type: 'error', text: 'Błąd rejestracji. Spróbuj ponownie.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Wystąpił błąd podczas rejestracji. Spróbuj ponownie.' });
        }
    };

    return (
        <div className="register-container">
            <h2>Rejestracja</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="login">Login</label>
                    <input
                        type="text"
                        id="login"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="haslo">Hasło</label>
                    <input
                        type="password"
                        id="haslo"
                        name="haslo"
                        value={formData.haslo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="powtorzHaslo">Powtórz hasło</label>
                    <input
                        type="password"
                        id="powtorzHaslo"
                        name="powtorzHaslo"
                        value={formData.powtorzHaslo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="register-button">Zarejestruj</button>
            </form>

            {message && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}
        </div>
    );
};

export default Register;
