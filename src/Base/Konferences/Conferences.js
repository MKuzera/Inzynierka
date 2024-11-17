import React, { useState } from 'react';
import AddConferenceForm from './AddConferenceForm/AddConferenceForm';
import './Conferences.css';

const Conferences = () => {
    const [isAdding, setIsAdding] = useState(false);

    const conferences = [
        {
            title: "Konferencja Naukowa 1",
            description: "Opis konferencji naukowej 1.",
            location: "Warszawa",
            organizers: ["Organizator 1", "Organizator 2"],
            tags: ["nauka", "technologia"],
            price: "200 PLN",
            date: "2024-11-15",
            link: "https://konferencjanaukowa1.pl"
        },
        {
            title: "Konferencja Naukowa 2",
            description: "Opis konferencji naukowej 2.",
            location: "Kraków",
            organizers: ["Organizator 3"],
            tags: ["medycyna", "zdrowie"],
            price: "150 PLN",
            date: "2024-12-01",
            link: "https://konferencjanaukowa2.pl"
        },
        {
            title: "Konferencja Naukowa 3",
            description: "Opis konferencji naukowej 3.",
            location: "Wrocław",
            organizers: ["Organizator 4", "Organizator 5"],
            tags: ["informatyka", "sztuczna inteligencja"],
            price: "250 PLN",
            date: "2024-10-30",
            link: "https://konferencjanaukowa3.pl"
        }
    ];

    const handleAddConference = (conference) => {
        console.log(conference);
        setIsAdding(false);
    };

    return (
        <div className="conferences-container">
            <h2>Konferencje Naukowe</h2>
            {isAdding ? (
                <AddConferenceForm onAddConference={handleAddConference} onCancel={() => setIsAdding(false)} />
            ) : (
                <>
                    <button className="add-conference-button" onClick={() => setIsAdding(true)}>
                        Dodaj Konferencję
                    </button>
                    <ul>
                        {conferences.map((conference, index) => (
                            <li key={index} className="conference-item">
                                <h3>{conference.title}</h3>
                                <p><strong>Opis:</strong> {conference.description}</p>
                                <p><strong>Miejsce:</strong> {conference.location}</p>
                                <p><strong>Organizatorzy:</strong> {conference.organizers.join(", ")}</p>
                                <p><strong>Tagi:</strong> {conference.tags.join(", ")}</p>
                                <p><strong>Cena:</strong> {conference.price}</p>
                                <p><strong>Data:</strong> {conference.date}</p>
                                <p><strong>Odnośnik:</strong> <a href={conference.link} target="_blank" rel="noopener noreferrer">Zobacz więcej</a></p>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Conferences;
