import axios from 'axios';

const loginUserAsync = async (login, password) => {
    try {
        const authHeader = `Basic ${btoa(`${login}:${password}`)}`;
        const response = await axios.post(
            'http://3.66.111.69:3000/login',
            {},
            {
                headers: {
                    Authorization: authHeader,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { loginUserAsync };