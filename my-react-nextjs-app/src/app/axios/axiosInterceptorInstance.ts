'use server'

import axios from 'axios';

const __HOST__ = process.env.WEBAPP_HOST !== undefined
	? process.env.WEBAPP_HOST
	: 'localhost';
const __PORT__ = process.env.BACKOFF_PORT !== undefined
	? process.env.BACKOFF_PORT
	: '8080';

const axiosInterceptorInstance = async () => {
	axios.create({
		baseURL: `http://${__HOST__}:${__PORT__}/JEE_SPRINGBOOT_HIBERNATE_EXO/api`,
	});
	await config();
}

const config = async () => {
	var instance = await axiosInterceptorInstance(); // Request interceptor
	instance.interceptors.request.use(
		(config) => {
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	instance.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			return Promise.reject(error);
		}
	);	
}


export default axiosInterceptorInstance;