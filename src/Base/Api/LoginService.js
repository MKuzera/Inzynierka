import axios from 'axios';
class LoginService {
    constructor() {
        this.baseURL = 'http://3.66.111.69:3000';//process.env.REACT_APP_BACKEND_URL;
    }
    async loginUser(login, password) {
        try {
            const response = await axios.post(`${this.baseURL}/login`, {
                login: login,
                password: password,
            });
            return response.data;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }
}
export { LoginService };
