import axios from 'axios'
const instance = axios.create({
baseURL: 'http://code-generation.onrender.com/'
});
export default instance;