import React, { useState } from 'react';
import { UploadDocument } from '../../ApiServices/FileService';
import { AddDocument } from '../../ApiServices/DocumentService';
import { useAuth } from '../../AuthContext/AuthContext';

const AddWorkForm = ({ setActivePage }) => {
    const { authState } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        authorId: authState.userID,
        description: '',
        tags: '',
        dateAdded: new Date().toISOString().slice(0, 10),
        link: ''
    });
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleAddWork = async (e) => {
        e.preventDefault();
        try {
            if (file) {
                const formDataFile = new FormData();
                formDataFile.append('file', file); // Dodanie pliku do FormData

                // Debugowanie zawartości FormData
                console.log('Plik do wysyłki:', file);
                for (let key of formDataFile.keys()) {
                    console.log('Key:', key, 'Value:', formDataFile.get(key));
                }

                const uploadedFilePath = await UploadDocument(formDataFile, authState.token);
                console.log('Uploaded File Path:', uploadedFilePath);

                formData.link = uploadedFilePath;
            } else {
                setError('No file selected');
                return;
            }

            await AddDocument(formData, authState.token);
            setActivePage('moje-prace');
        } catch (error) {
            console.error(error);
            setError('Błąd podczas dodawania dokumentu: ' + error.message);
        }
    };


    return (
        <div className="add-work-form">
            <h2>Dodaj Nową Pracę</h2>
            <form onSubmit={handleAddWork}>
                <div className="form-group">
                    <label htmlFor="title">Tytuł</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Autor</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Opis</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tags">Tagi (oddzielone przecinkami)</label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="file">Prześlij plik</label>
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Dodaj Pracę</button>
            </form>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default AddWorkForm;
