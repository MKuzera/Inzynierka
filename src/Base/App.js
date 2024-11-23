import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login/Login';
import Register from './Register/Register';
import { AuthProvider, useAuth } from './AuthContext/AuthContext';
import MyWork from './MyWork/MyWork';
import AddWorkForm from './MyWork/AddWorkForm/AddWorkForm';
import Conferences from './Konferences/Conferences';
import Searcher from './Searcher/Searcher';
import AllConferences from './Konferences/DisplayAviableConferences/AllConferences';


function App() {
    const [activePage, setActivePage] = useState('start');

    const renderContent = (authState) => {
        switch (activePage) {
            case 'start':
                return authState.isLogged ? (
                    <div>
                        <h2>Witaj, {authState.login}!</h2>
                        <p>Twoje hasło to: {authState.token}</p>
                        <p>Twoje ID to: {authState.userID}</p>
                    </div>
                ) : (
                    <h2>Witaj na głównej stronie! Proszę się zalogować.</h2>
                );
            case 'moje-prace':
                return <MyWork setActivePage={setActivePage} />;
            case 'moje konferencje':
                return <Conferences setActivePage={setActivePage} />;
            case 'konferencje':
                return <AllConferences setActivePage={setActivePage} />;
            case 'wyszukiwarka':
                return authState.isLogged ? <Searcher /> : <h2>Proszę się zalogować.</h2>;
            case 'dodaj-prace':
                return <AddWorkForm setActivePage={setActivePage} />;
            case 'zaloguj':
                return <Login setActivePage={setActivePage} />;
            case 'register':
                return <Register />;
            default:
                return <h2>Witaj na głównej stronie!</h2>;
        }
    };

    // Render navbar based on user type
    const renderNav = (authState, logoutUser) => {
        if (authState.isLogged) {
            if (authState.userType === 'admin') {
                return (
                    <>
                        <li onClick={() => setActivePage('start')}>Start</li>
                        <li onClick={() => setActivePage('moje-prace')}>Moje prace</li>
                        <li onClick={() => setActivePage('moje konferencje')}>Moje Konferencje Naukowe</li>
                        <li onClick={() => setActivePage('wyszukiwarka')}>Wyszukiwarka</li>
                        <li onClick={() => setActivePage('konferencje')}>Konferencje Naukowe</li>
                    </>
                );
            } else if (authState.userType === 'organizer') {
                return (
                    <>
                        <li onClick={() => setActivePage('start')}>Start</li>
                        <li onClick={() => setActivePage('moje konferencje')}>Moje Konferencje Naukowe</li>
                        <li onClick={() => setActivePage('konferencje')}>Konferencje Naukowe</li>
                        <li onClick={() => { logoutUser(); setActivePage('start'); }}>Wyloguj</li>
                    </>
                );
            } else if (authState.userType === 'user') {
                return (
                    <>
                        <li onClick={() => setActivePage('start')}>Start</li>
                        <li onClick={() => setActivePage('moje-prace')}>Moje prace</li>
                        <li onClick={() => setActivePage('wyszukiwarka')}>Wyszukiwarka</li>
                        <li onClick={() => setActivePage('konferencje')}>Konferencje Naukowe</li>
                        <li onClick={() => { logoutUser(); setActivePage('start'); }}>Wyloguj</li>
                    </>
                );
            }
        } else {
            return (
                <li onClick={() => setActivePage('zaloguj')}>Zaloguj</li>
            );
        }
    };

    return (
        <AuthProvider>
            <AuthConsumer>
                {({ authState, logoutUser }) => (
                    <div className="App">
                        <nav className="navbar">
                            <ul>
                                {renderNav(authState, logoutUser)}
                            </ul>
                        </nav>

                        <main>
                            {renderContent(authState)}
                        </main>

                        <footer className="footer">
                            <p>Informacje o stronie | Kontakt | Regulamin</p>
                        </footer>
                    </div>
                )}
            </AuthConsumer>
        </AuthProvider>
    );
}

const AuthConsumer = ({ children }) => {
    const auth = useAuth();
    return children(auth);
};

export default App;
