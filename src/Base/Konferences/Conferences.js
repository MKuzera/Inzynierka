import React, { useEffect, useState } from 'react';
import AddConferenceForm from './AddConferenceForm/AddConferenceForm';
import './Conferences.css';
import { useAuth } from "../AuthContext/AuthContext";
import {
    GetConferenceByAuthorID,
    UpdateConference,
    DeleteConference,
} from "../ApiServices/ConferenceService";

const Conferences = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [conferences, setConferences] = useState([]);
    const [editingConference, setEditingConference] = useState(null);
    const { authState } = useAuth();

    useEffect(() => {
        if (authState.userID) {
            GetConferenceByAuthorID(authState.userID, authState.token)
                .then((data) => {
                    if (data) {
                        const formattedData = data.map((conference) => ({
                            ...conference,
                            tags: conference.tags.split(",").map((tag) => tag.trim()),
                            date: new Date(conference.date).toISOString().split("T")[0],
                        }));
                        setConferences(formattedData);
                    }
                })
                .catch((error) => {
                    console.error("Błąd podczas pobierania konferencji:", error);
                });
        }
    }, [authState.userID, authState.token]);

    const handleEditClick = (conference) => {
        setEditingConference({ ...conference });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'date') {
            const validDate = new Date(value);
            if (!isNaN(validDate.getTime())) {
                setEditingConference((prev) => ({
                    ...prev,
                    [name]: value,
                }));
            } else {
                console.error("Invalid date value");
            }
        } else if (name === 'tags') {
            const tags = value.split(",").map((tag) => tag.trim());
            setEditingConference((prev) => ({ ...prev, [name]: tags }));
        } else if (name === 'price') {
            setEditingConference((prev) => ({
                ...prev,
                [name]: parseFloat(value) || 0,
            }));
        } else {
            setEditingConference((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSaveChanges = async () => {
        try {
            const formattedDate = new Date(editingConference.date).toISOString().split('T')[0];
            const updatedConference = await UpdateConference({
                ...editingConference,
                date: formattedDate,
                tags: editingConference.tags.join(", "),
            }, authState.token);

            setConferences((prev) =>
                prev.map((conference) =>
                    conference.id === updatedConference.id ? updatedConference : conference
                )
            );
            setEditingConference(null);
        } catch (error) {
            console.error(`Błąd podczas zapisywania zmian:`, error.message);
        }
    };

    const handleDeleteConference = async (conferenceId) => {
        try {
            await DeleteConference(conferenceId, authState.token);
            setConferences((prevConferences) => prevConferences.filter((conference) => conference.id !== conferenceId));
        } catch (error) {
            console.error('Błąd podczas usuwania konferencji:', error.message);
        }
    };

    const handleAddConference = (conference) => {
        console.log(conference);
        setIsAdding(false);
        setConferences((prev) => [...prev, conference]);
    };

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
                        {conferences && conferences.length > 0 ? (
                            conferences.map((conference) => (
                                <li key={conference.id} className="conference-item">
                                    {editingConference && editingConference.id === conference.id ? (
                                        <div className="edit-form">
                                            <h3>Edycja konferencji</h3>
                                            <div>
                                                <label htmlFor="title">Tytuł:</label>
                                                <input
                                                    type="text"
                                                    id="title"
                                                    name="title"
                                                    value={editingConference.title}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="description">Opis:</label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    value={editingConference.description}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="location">Miejsce:</label>
                                                <input
                                                    type="text"
                                                    id="location"
                                                    name="location"
                                                    value={editingConference.location}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="organizers">Organizator:</label>
                                                <input
                                                    type="text"
                                                    id="organizers"
                                                    name="organizers"
                                                    value={editingConference.organizers}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="tags">Tagi:</label>
                                                <input
                                                    type="text"
                                                    id="tags"
                                                    name="tags"
                                                    value={editingConference.tags.join(", ")}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="price">Cena:</label>
                                                <input
                                                    type="number"
                                                    id="price"
                                                    name="price"
                                                    value={editingConference.price}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="date">Data:</label>
                                                <input
                                                    type="date"
                                                    id="date"
                                                    name="date"
                                                    value={editingConference.date}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="link">Odnośnik:</label>
                                                <input
                                                    type="url"
                                                    id="link"
                                                    name="link"
                                                    value={editingConference.link}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <button type="button" onClick={handleSaveChanges}>
                                                Zapisz zmiany
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <h3>{conference.title}</h3>
                                            <p><strong>Opis:</strong> {conference.description}</p>
                                            <p><strong>Miejsce:</strong> {conference.location}</p>
                                            <p><strong>Organizator:</strong> {conference.organizers}</p>
                                            <p><strong>Tagi:</strong> {conference.tags.join(", ")}</p>
                                            <p><strong>Cena:</strong> ${conference.price}</p>
                                            <p><strong>Data:</strong> {conference.date}</p>
                                            <p><strong>Odnośnik:</strong> <a href={conference.link} target="_blank" rel="noopener noreferrer">Zobacz więcej</a></p>
                                            <button type="button" onClick={() => handleEditClick(conference)}>
                                                Edytuj
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteConference(conference.id)}
                                                style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
                                            >
                                                Usuń
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ))
                        ) : (
                            <p>Brak konferencji do wyświetlenia.</p>
                        )}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Conferences;
