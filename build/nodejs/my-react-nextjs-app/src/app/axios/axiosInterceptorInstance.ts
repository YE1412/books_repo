'use server'

import axios from 'axios';

const axiosInterceptorInstance = axios.create({
	baseURL: 'http://'+process.env.WEBAPP_HOST+':8080/JEE_SPRINGBOOT_HIBERNATE_EXO/api',
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