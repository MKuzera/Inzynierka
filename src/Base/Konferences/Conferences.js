import React, {useEffect, useState} from 'react';
import AddConferenceForm from './AddConferenceForm/AddConferenceForm';
import './Conferences.css';
import {useAuth} from "../AuthContext/AuthContext";
import {GetConferenceByAuthorID} from "../ApiServices/ConferenceService";

const Conferences = () => {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddConference = (conference) => {
        console.log(conference);
        setIsAdding(false);
    };

    const { authState } = useAuth();
    const [conferences, setConferences] = useState([]);

    useEffect(() => {
        if (authState.userID) {
            GetConferenceByAuthorID(authState.userID, authState.token)
                .then((data) => {
                    const formattedData = data.map((conference) => ({
                        ...conference,
                        tags: conference.tags.split(",").map((tag) => tag.trim()), // Rozdzielanie tagów na tablicę
                        date: new Date(conference.date).toLocaleDateString(), // Formatowanie daty
                    }));
                    setConferences(formattedData);
                })
                .catch((error) => {
                    console.error("Błąd podczas pobierania konferencji:", error);
                });
        }
    }, [authState.userID]);


    return (
        <div className="conferences-container">
            <h2>Konferencje Naukowe</h2>
            {isAdding ? (
                <AddConferenceForm
                    onAddConference={handleAddConference}
                    onCancel={() => setIsAdding(false)}
                />
            ) : (
                <>
                    <button
                        className="add-conference-button"
                        onClick={() => setIsAdding(true)}
                    >
                        Dodaj Konferencję
                    </button>
                    <ul>
                        {conferences.map((conference) => (
                            <li key={conference.id} className="conference-item">
                                <h3>{conference.title}</h3>
                                <p>
                                    <strong>Opis:</strong> {conference.description}
                                </p>
                                <p>
                                    <strong>Miejsce:</strong> {conference.location}
                                </p>
                                <p>
                                    <strong>Organizator:</strong> {conference.organizers}
                                </p>
                                <p>
                                    <strong>Tagi:</strong> {conference.tags.join(", ")}
                                </p>
                                <p>
                                    <strong>Cena:</strong> ${conference.price}
                                </p>
                                <p>
                                    <strong>Data:</strong> {conference.date}
                                </p>
                                <p>
                                    <strong>Odnośnik:</strong>{" "}
                                    <a
                                        href={conference.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Zobacz więcej
                                    </a>
                                </p>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Conferences;
