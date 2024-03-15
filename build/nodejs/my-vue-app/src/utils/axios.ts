import axios from "axios";
import type { LoginRequest, 
	LoginResponse, 
	BookModel, 
	UserFormResponse,
	UserFormRequest } from '@/utils/types'

const __HOST__ = process.env.WEBAPP_HOST !== undefined
	? process.env.WEBAPP_HOST
	: 'localhost'
const __PORT__ = process.env.BACKOFF_PORT !== undefined
	? process.env.BACKOFF_HOST
	: '8080'

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

export const Login: LoginResponse = async (data: LoginRequest, config: any) => {
	//console.log(data);
	const res = await axiosInterceptorInstance.post('/user/login', data, config)
	//console.log(res);
	return res
};

export const GetBooks: BookModel[] = async (config: any) => {
	const res = await axiosInterceptorInstance.get('/books/all', config)
	return res
}

export const GetBook: BookModel = async (data: number, config: any) => {
	const res = await axiosInterceptorInstance.get(`/books/${data}`, config)
	return res
}

export const InsertUser: UserFormResponse = async (data: UserModel, config: any) => {
	const res = await axiosInterceptorInstance.post('/user/signup', data, config)
	return res
}

export const InsertBook: BookModel = async(data: BookModel, config: any) => {
	const res = await axiosInterceptorInstance.post('/books', data, config)
	return res
}

export const UpdateBook: void = async(id: number, data: BookModel, config: any) => {
	const res = await axiosInterceptorInstance.put(`/books/${id}`, data, config)
	return res
}

export const DeleteBook: void = async(id: number, config: any) => {
	const res = await axiosInterceptorInstance.delete(`/books/${id}`, config)
	return res
}

export const GetUser: UserModel = async(id: number, config: any) => {
	const res = await axiosInterceptorInstance.get(`/user/${id}`, config);
	return res;
}

export const GetUsers: UserModel[] = async(config: any) => {
	const res = await axiosInterceptorInstance.get('/user/all', config);
	return res;
}

export const UpdateUser: UserFormResponse = async(id: number, datas: UserFormRequest, config: any) => {
	const res = await axiosInterceptorInstance.put(`/user/${id}`, datas, config);
	return res;
}

export const UpdateUserRoles: UserFormResponse = async(id: number, datas: string[], config: any) => {
	const res = await axiosInterceptorInstance.put(`/user/roles/${id}`, datas, config);
	return res;
}

export const DeleteUser: void = async(id: number, config: any) => {
	await axiosInterceptorInstance.delete(`/user/${id}`, config);
}

