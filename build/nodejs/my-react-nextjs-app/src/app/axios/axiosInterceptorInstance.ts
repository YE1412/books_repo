'use server'

import axios from 'axios';

const axiosInterceptorInstance = axios.create({
	baseURL: 'http://172.19.0.3:8081/JEE_SPRINGBOOT_HIBERNATE_EXO/api',
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
