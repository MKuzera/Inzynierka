import axios from 'axios';
const serverUrl = 'http://3.66.111.69:3000/';

const loginUserAsync = async (login, password) => {
    try {
        const authHeader = `Basic ${btoa(`${login}:${password}`)}`;
        const response = await axios.post(
            serverUrl+'login',
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
const RegisterUserAsync = async (login, password, email) => {
    try {
        const response = await axios.post(
            serverUrl + 'register',
            {
                login: login,
                password: password,
                email: email
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data.message === "Registration successful") {
            return {
                success: true,
                userId: response.data.userId
            };
        } else {
            return { success: false, message: "Unknown error" };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
};


export { loginUserAsync, RegisterUserAsync };