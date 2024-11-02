import React, { useState } from 'react';
import './Register.css';
const Register = () => {
    const [formData, setFormData] = useState({
        imie: '',
        nazwisko: '',
        email: '',
        login: '',
        haslo: '',
        powtorzHaslo: '',
        uczelnia: '',
        UserType: 'User'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    return (
        <div className="register-container">
            <h2>Rejestracja</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="imie">Imię</label>
                    <input
                        type="text"
                        id="imie"
                        name="imie"
                        value={formData.imie}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="nazwisko">Nazwisko</label>
                    <input
                        type="text"
                        id="nazwisko"
                        name="nazwisko"
                        value={formData.nazwisko}
                        onChange={handleChange}
                        required
                    />
                </div>

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

                <div className="form-group">
                    <label htmlFor="uczelnia">Uczelnia</label>
                    <input
                        type="text"
                        id="uczelnia"
                        name="uczelnia"
                        value={formData.uczelnia}
                        onChange={handleChange}
                    />
                </div>


                <button type="submit" className="register-button">Zarejestruj</button>
            </form>
        </div>
    );
};

export default Register;
