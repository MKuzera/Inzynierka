import React, { useEffect, useState } from 'react';
import './MyDocuments.css';
import { GetDocumentsByAuthorID, UpdateDocument, DeleteDocument } from '../ApiServices/DocumentService';
import { useAuth } from '../AuthContext/AuthContext';

const ManageAllDocuments = ({ setActivePage }) => {
    const { authState } = useAuth();
    const [documents, setDocuments] = useState([]);
    const [editingDocument, setEditingDocument] = useState(null);

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
    const handleEditClick = (document) => {
        setEditingDocument({ ...document });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'dateAdded') {
            const validDate = new Date(value);
            if (!isNaN(validDate.getTime())) {
                setEditingDocument((prev) => ({
                    ...prev,
                    [name]: value,
                }));
            } else {
                console.error('Invalid date value');
            }
        } else if (name === 'tags') {
            // Handle tags input: split by commas and trim spaces
            const tags = value.split(',').map((tag) => tag.trim());
            setEditingDocument((prev) => ({ ...prev, [name]: tags }));
        } else {
            setEditingDocument((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSaveChanges = async () => {
        try {
            const formattedDate = new Date(editingDocument.dateAdded).toISOString().split('T')[0];

            const updatedDocument = await UpdateDocument({
                ...editingDocument,
                dateAdded: formattedDate,
                tags: editingDocument.tags.join(', '),
            }, authState.token);

            setDocuments((prev) =>
                prev.map((doc) =>
                    doc.id === updatedDocument.id ? updatedDocument : doc
                )
            );
            setEditingDocument(null);
        } catch (error) {
            console.error('Błąd podczas zapisywania zmian:', error.message);
        }
    };

    const handleDelete = async (documentId) => {
        try {
            await DeleteDocument(documentId, authState.token);

            const data = await GetDocumentsByAuthorID(authState.userID, authState.token);
            const formattedData = data.map((doc) => ({
                ...doc,
                tags: doc.tags.split(',').map((tag) => tag.trim()),
                dateAdded: new Date(doc.dateAdded).toISOString().split('T')[0],
            }));
            setDocuments(formattedData);
        } catch (error) {
            console.error('Błąd podczas usuwania dokumentu:', error);
        }
    };


    return (
        <div className="my-work-container">
            <h2>Moje dokumnety </h2>
            <button className="add-work-button" onClick={() => setActivePage('dodaj-prace')}>
                Dodaj Pracę
            </button>
            <ul>
                {documents.map((doc) => (
                    <li key={doc.id} className="work-item">
                        {editingDocument && editingDocument.id === doc.id ? (
                            <div className="edit-form">
                                <h3>Edycja dokumentu</h3>
                                <div>
                                    <label htmlFor="title">Tytuł:</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={editingDocument.title}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="author">Autor:</label>
                                    <input
                                        type="text"
                                        id="author"
                                        name="author"
                                        value={editingDocument.author}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description">Opis:</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={editingDocument.description}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="tags">Tagi:</label>
                                    <input
                                        type="text"
                                        id="tags"
                                        name="tags"
                                        value={editingDocument.tags.join(', ')}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="dateAdded">Data dodania:</label>
                                    <input
                                        type="date"
                                        id="dateAdded"
                                        name="dateAdded"
                                        value={editingDocument.dateAdded}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button type="button" onClick={handleSaveChanges}>
                                    Zapisz zmiany
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h3>{doc.title}</h3>
                                <p><strong>Autor:</strong> {doc.author}</p>
                                <p><strong>Opis:</strong> {doc.description}</p>
                                <p><strong>Tagi:</strong> {doc.tags.join(', ')}</p>
                                <p><strong>Data dodania:</strong> {doc.dateAdded}</p>
                                <button type="button" onClick={() => handleEditClick(doc)}>
                                    Edytuj
                                </button>
                                <button type="button" onClick={() => handleDelete(doc.id)}>
                                    Usuń
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageAllDocuments;
