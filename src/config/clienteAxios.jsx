import axios from 'axios';

const instanceAxios = axios.create({
	baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

export default instanceAxios;
