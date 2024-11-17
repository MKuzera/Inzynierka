import axios from 'axios';

const serverUrl = 'http://3.66.111.69:3000/';

const GetDocument = async (id, token) => {
    try {
        const response = await axios.get(`${serverUrl}documents/${id}`, {
            headers: {
                Authorization: `Basic ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania dokumentu:', error.message);
        throw error;
    }
};

const GetDocuments = async (token) => {
    try {
        const response = await axios.get(`${serverUrl}documents`, {
            headers: {
                Authorization: `Basic ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania dokumentu:', error.message);
        throw error;
    }
};

const GetDocumentsByAuthorID = async (id, token) => {
    try {
        const response = await axios.get(`${serverUrl}documents/author/${id}`, {
            headers: {
                Authorization: `Basic ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania dokumentu:', error.message);
        throw error;
    }
};

const AddDocument = async (document, token) => {
    try {
        const response = await axios.post(`${serverUrl}documents`, document, {
            headers: {
                Authorization: `Basic ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Błąd podczas dodawania dokumentu:', error.message);
        throw error;
    }
};

export {
    GetDocument,
    GetDocuments,
    GetDocumentsByAuthorID,
    AddDocument
};
