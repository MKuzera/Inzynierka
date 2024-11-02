import React from 'react';
import './MyWork.css';

const MyWork = ({ setActivePage }) => {
    const works = [
        {
            title: "Praca Naukowa 1",
            author: "Jan Kowalski",
            authorId: "12345",
            description: "Opis pracy naukowej 1.",
            tags: ["biologia", "chemia"],
            dateAdded: "2024-10-01"
        },
        {
            title: "Praca Naukowa 2",
            author: "Anna Nowak",
            authorId: "67890",
            description: "Opis pracy naukowej 2.",
            tags: ["fizyka", "astronomia"],
            dateAdded: "2024-09-25"
        },
        {
            title: "Praca Naukowa 3",
            author: "Piotr Zieliński",
            authorId: "54321",
            description: "Opis pracy naukowej 3.",
            tags: ["matematyka", "informatyka"],
            dateAdded: "2024-10-15"
        }
    ];

    return (
        <div className="my-work-container">
            <h2>Moje Prace</h2>
            <button className="add-work-button" onClick={() => setActivePage('dodaj-prace')}>
                Dodaj Pracę
            </button>
            <ul>
                {works.map((work, index) => (
                    <li key={index} className="work-item">
                        <h3>{work.title}</h3>
                        <p><strong>Autor:</strong> {work.author} (ID: {work.authorId})</p>
                        <p><strong>Opis:</strong> {work.description}</p>
                        <p><strong>Tagi:</strong> {work.tags.join(", ")}</p>
                        <p><strong>Data dodania:</strong> {work.dateAdded}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyWork;
