import React, { useEffect, useState } from 'react';
import './AllConferences.css';
import { useAuth } from "../../AuthContext/AuthContext";
import { GetConferences } from "../../ApiServices/ConferenceService";

const AllConferences = () => {
    const [conferences, setConferences] = useState([]);
    const { authState } = useAuth();

    useEffect(() => {
        if (authState.userID) {
            GetConferences(authState.token)
                .then((data) => {
                    const formattedData = data.map((conference) => ({
                        ...conference,
                        tags: conference.tags.split(",").map((tag) => tag.trim()),
                        date: new Date(conference.date).toLocaleDateString(),
                    }));
                    setConferences(formattedData);
                })
                .catch((error) => {
                    console.error("Błąd podczas pobierania konferencji:", error);
                });
        }
    }, [authState.userID, authState.token]);

    return (
        <div className="conferences-container">
            <h2>Konferencje Naukowe</h2>
            <ul>
                {conferences.map((conference) => (
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
