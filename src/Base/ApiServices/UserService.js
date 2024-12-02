import axios from "axios";
const serverUrl = 'http://3.66.111.69:3000/';
const GetUsers = async (token) => {
    try {
        const response = await axios.get(`${serverUrl}getallusers`, {
            headers: {
                Authorization: `Basic ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania dokumentów:', error.message);
        throw error;
    }
};

const UpdateUser = async (User, token) => {
    try {
        const response = await axios.put(`${serverUrl}edituser/${User.id}`, {
            username: User.username,
            password: User.password,
            email: User.email,
            type: User.type
        }, {
            headers: {
                Authorization: `Basic ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Błąd podczas edycji użytkownika:', error.message);
        throw error;
    }
};

const DeleteUser = async (userId, token) => {
    try {
        const response = await axios.delete(`${serverUrl}deleteuser/${userId}`, {
            headers: {
                Authorization: `Basic ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Błąd podczas usuwania użytkownika:', error.message);
        throw error;
    }
};


export {GetUsers ,UpdateUser,DeleteUser}
