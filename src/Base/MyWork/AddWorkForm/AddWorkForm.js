import React, { useState } from 'react';
import './AddWorkForm.css';

const AddWorkForm = ({ setActivePage }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        authorId: '',
        description: '',
        tags: '',
        dateAdded: new Date().toISOString().slice(0, 10) // today's date
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddWork = (e) => {
        e.preventDefault();
        console.log("New Work:", formData);
        setActivePage('moje-prace');
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
                <div className="form-group">
                    <label htmlFor="authorId">ID Autora</label>
                    <input type="text" id="authorId" name="authorId" value={formData.authorId} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Opis</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="tags">Tagi (oddzielone przecinkami)</label>
                    <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="dateAdded">Data Dodania</label>
                    <input type="date" id="dateAdded" name="dateAdded" value={formData.dateAdded} onChange={handleChange} />
                </div>
                <button type="submit">Dodaj Pracę</button>
            </form>
        </div>
    );
};

export default AddWorkForm;
