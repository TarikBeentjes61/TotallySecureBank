import axios from 'axios'
const instance = axios.create({
baseURL: 'https://code-generation.onrender.com/'
});
export default instance;