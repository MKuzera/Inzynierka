import React, { useState } from 'react';
import { useAuth } from '../../AuthContext/AuthContext';
import { AddDocument } from '../../ApiServices/DocumentService';

const AddWorkForm = ({ setActivePage }) => {
    const { authState } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        authorId: authState.userID, // Pobierz ID autora z authState
        description: '',
        tags: '',
        dateAdded: new Date().toISOString().slice(0, 10), // Ustaw datę na dzisiejszą
        link: ''
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddWork = (e) => {
        e.preventDefault();
        AddDocument(formData, authState.token)
            .then(() => {
                setActivePage('moje-prace');
            })
            .catch((error) => {
                setError('Błąd podczas dodawania dokumentu: ' + error.message);
            });
    };

    return (
        <div className="add-work-form">
            <h2>Dodaj Nową Pracę</h2>
            <form onSubmit={handleAddWork}>
                <div className="form-group">
                    <label htmlFor="title">Tytuł</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Autor</label>
                    <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} required />
                </div>
                <div className="form-group" style={{ display: 'none' }}>
                    <input type="text" id="authorId" name="authorId" value={formData.authorId} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Opis</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="tags">Tagi (oddzielone przecinkami)</label>
                    <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} />
                </div>
                <div className="form-group" style={{ display: 'none' }}>
                    <input type="date" id="dateAdded" name="dateAdded" value={formData.dateAdded} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="link">Link</label>
                    <input type="text" id="link" name="link" value={formData.link} onChange={handleChange} />
                </div>
                <button type="submit">Dodaj Pracę</button>
            </form>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default AddWorkForm;
