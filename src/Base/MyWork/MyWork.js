import React, { useEffect, useState } from 'react';
import './MyWork.css';
import { GetDocumentsByAuthorID } from '../ApiServices/DocumentService';
import { useAuth } from '../AuthContext/AuthContext';

const MyWork = ({ setActivePage }) => {
    const { authState } = useAuth();
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        if (authState.userID) {
            GetDocumentsByAuthorID(authState.userID, authState.token)
                .then((data) => {
                    const formattedData = data.map(doc => ({
                        ...doc,
                        tags: doc.tags.split(',').map(tag => tag.trim()),
                        dateAdded: new Date(doc.dateAdded).toLocaleDateString(),
                    }));
                    setDocuments(formattedData);
                })
                .catch((error) => {
                    console.error('Błąd podczas pobierania dokumentów:', error);
                });
        }
    }, [authState.userID]);

    return (
        <div className="my-work-container">
            <h2>Moje Prace</h2>
            <button className="add-work-button" onClick={() => setActivePage('dodaj-prace')}>
                Dodaj Pracę
            </button>
            <ul>
                {documents.map((work) => (
                    <li key={work.id} className="work-item">
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
