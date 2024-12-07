import React, { useEffect, useState } from 'react';
import './AllConferences.css';
import { useAuth } from "../../AuthContext/AuthContext";
import { GetConferences } from "../../ApiServices/ConferenceService";

const AllConferences = () => {
    const [conferences, setConferences] = useState([]); // Wszystkie konferencje
    const [filteredConferences, setFilteredConferences] = useState([]); // Filtrowane konferencje
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { authState } = useAuth();

    useEffect(() => {
        if (authState.userID) {
            GetConferences(authState.token)
                .then((data) => {
                    const formattedData = data.map((conference) => ({
                        ...conference,
                        tags: conference.tags.split(",").map((tag) => tag.trim()),
                        date: new Date(conference.date).toLocaleDateString(),
                        price: parseFloat(conference.price) || 0,
                    }));
                    setConferences(formattedData);
                    setFilteredConferences(formattedData);
                })
                .catch((error) => {
                    console.error("Błąd podczas pobierania konferencji:", error);
                });
        }
    }, [authState.userID, authState.token]);

    // Funkcja filtrowania
    const filterConferences = () => {
        let filtered = conferences;

        if (minPrice) {
            filtered = filtered.filter(conference => conference.price >= parseFloat(minPrice));
        }

        if (maxPrice) {
            filtered = filtered.filter(conference => conference.price <= parseFloat(maxPrice));
        }

        if (startDate) {
            filtered = filtered.filter(conference => new Date(conference.date) >= new Date(startDate));
        }

        if (endDate) {
            filtered = filtered.filter(conference => new Date(conference.date) <= new Date(endDate));
        }

        setFilteredConferences(filtered);
    };

    return (
        <div className="conferences-container">
            <h2>Konferencje Naukowe</h2>

            {}
            <div className="filters-container">
                <div className="filter-group">
                    <label>Minimalna Cena:</label>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="np. 100"
                    />
                </div>
                <div className="filter-group">
                    <label>Maksymalna Cena:</label>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="np. 1000"
                    />
                </div>
                <div className="filter-group">
                    <label>Data od:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <label>Data do:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button className="filter-button" onClick={filterConferences}>
                    Filtruj
                </button>
            </div>

            {}
            <ul>
                {filteredConferences.map((conference) => (
                    <li key={conference.id} className="conference-item">
                        <h3>{conference.title}</h3>
                        <p><strong>Opis:</strong> {conference.description}</p>
                        <p><strong>Miejsce:</strong> {conference.location}</p>
                        <p><strong>Organizator:</strong> {conference.organizers}</p>
                        <p><strong>Tagi:</strong> {conference.tags.join(", ")}</p>
                        <p><strong>Cena:</strong> ${conference.price}</p>
                        <p><strong>Data:</strong> {conference.date}</p>
                        <p><strong>Odnośnik:</strong> <a href={conference.link} target="_blank" rel="noopener noreferrer">Zobacz więcej</a></p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllConferences;
