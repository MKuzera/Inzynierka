import React, { useState } from "react";
import "./AddConferenceForm.css";
import { AddConference } from "./../../ApiServices/ConferenceService";
import { useAuth } from "./../../AuthContext/AuthContext";

const AddConferenceForm = ({ onAddConference, onCancel }) => {
    const { authState } = useAuth();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [organizers, setOrganizers] = useState("");
    const [tags, setTags] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState("");
    const [link, setLink] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const conference = {
            title,
            description,
            location,
            organizers,
            tags,
            price: parseFloat(price),
            date,
            link,
            organizerID: authState.userID,
        };

        try {
            await AddConference(conference, authState.token);
            onAddConference();
        } catch (error) {
            console.error("Błąd podczas dodawania konferencji:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-conference-form">
            <label>Tytuł:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <label>Opis:</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <label>Miejsce:</label>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
            />
            <label>Organizator:</label>
            <input
                type="text"
                value={organizers}
                onChange={(e) => setOrganizers(e.target.value)}
                required
            />
            <label>Tagi (oddzielone przecinkami):</label>
            <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
            />
            <label>Cena w USD:</label>
            <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <label>Data:</label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <label>Link:</label>
            <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
            />
            <button type="submit">Dodaj Konferencję</button>
            <button type="button" onClick={onCancel}>
                Anuluj
            </button>
        </form>
    );
};

export default AddConferenceForm;
