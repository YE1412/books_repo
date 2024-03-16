import axios from 'axios';

const __HOST__ = process.env.WEBAPP_HOST !== undefined
	? process.env.WEBAPP_HOST
	: 'localhost';
const __PORT__ = process.env.BACKOFF_PORT !== undefined
	? process.env.BACKOFF_PORT
	: '8080';

const axiosInterceptorInstance = axios.create({
	baseURL: `http://${__HOST__}:${__PORT__}/JEE_SPRINGBOOT_HIBERNATE_EXO/api`,
});

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInterceptorInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInterceptorInstance;