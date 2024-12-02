import axios from 'axios';

const serverUrl = 'http://3.66.111.69:3000/';

const GetConference = async (id, token) => {
    try {
        const response = await axios.get(`${serverUrl}conferences/${id}`, {
            headers: {
                Authorization: `Basic ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania konferencji:', error.message);
        throw error;
    }
};

const GetConferences = async (token) => {
    try {
        const response = await axios.get(`${serverUrl}conferences`, {
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

const GetConferenceByAuthorID = async (id, token) => {
    try {
        const response = await axios.get(`${serverUrl}conferences/author/${id}`, {
            headers: {
                Authorization: `Basic ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania konferencji:', error.message);
        throw error;
    }
};
const UpdateConference = async (conferenceData, token) => {
    const response = await axios.put(
        serverUrl + `conferences/${conferenceData.id}`,
        conferenceData,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data;
};

const AddConference = async (conference, token) => {
    console.log(conference);
    try {
        const response = await axios.post(`${serverUrl}conferences`, conference, {
            headers: {
                Authorization: `Basic ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Błąd podczas dodawania konferencji:', error.message);
        throw error;
    }
};

const DeleteConference = async (conferenceId, token) => {
    try {
        const response = await axios.delete(`${serverUrl}conferences/${conferenceId}`, {
            headers: {
                Authorization: `Basic ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Błąd podczas usuwania konferencji:', error.message);
        throw error;
    }
};


export {
    AddConference,
    GetConference,
    GetConferences,
    GetConferenceByAuthorID,
    UpdateConference,
    DeleteConference
};
