'use server'

import { cookies } from 'next/headers';
import { type LoginRequest, type LoginResponse } from '@/app/lib/definitions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import axiosInstance from '@/app/axios/axiosInterceptorInstance';
import type { LoginRequest, LoginResponse, BookModel, UserModel, UserFormResponse } from '@/app/lib/definitions';

const instance = axiosInstance;

export async function setSessionData(sessionData) {
	const encryptedSessionData = sessionData;
	//console.log('Session setting');
	//console.log(encryptedSessionData);
	cookies().set('session', JSON.stringify(encryptedSessionData), {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7, //One week
		path: '/'
	});
};

export async function getSessionData() {
  const encryptedSessionData = cookies().get('session')?.value
  return encryptedSessionData ? JSON.parse(encryptedSessionData) : null
};

export async function deleteSessionData() {
  cookies().delete('session');
}

const config = async () => {
	const userSession = await getSessionData(); 
	let headers = {};
	//console.log(userSession);
	if (userSession !== null){
		headers.Authorization = `Bearer ${userSession.token}`;
	} else {
		headers.Authorization = `Not logged !`;
	}
	return { headers };
};

export async function loginAction(formData: LoginRequest) {
	//console.log("Handling login !");
	const model = {
  	usernameOrEmail: formData.usernameOrEmail,
  	password: formData.password
  };
  const httpConfig = await config();
  let success = false;
  let res = {};
  try{
  	//console.log(config());
		//console.log(model);
		//const res = await axios.post('https://localhost:8080/JEE_SPRINGBOOT_HIBERNATE_EXO/api/user/login', model, config);
		res = await instance.post('user/login', model, httpConfig);
		res.data.user.token = res.data.token;
		await setSessionData(res.data.user);
		success = true;
  } catch(err) {
  	//setSessionData({user: {name: 'Ok !', roles: [{id: 1, name:'ROLE_ADMIN'}]}});
		//deleteSessionData();
		console.log(err);
		//console.log(res);
		//throw new Error('Failed to Login !');
		return { message: err.response !== undefined ? err.response.data.message : 'Failed to login, remote server (back office) off !'};
  } finally {
  	if (success){
  		revalidatePath('/book/home');
  		redirect('/book/home');
  	}
  }
};

export async function getBooksAction(): BookModel[] {
	const httpConfig = await config();
	let success = false;
	let res = {};
	try{
		//console.log(config());
		res = await instance.get('books/all', httpConfig);
		success = true;
		//return res.data;
	} catch(err) {
		console.log(err);
		//await logoutAction();
		//throw new Error('Failed to fetch books !');
		return { message: 'Failed to fetch books, remote server (back office) off !' };
	} finally {
		if (success) {
			return res.data;
		}
	}
}

export async function getBookAction(id: number): BookModel {
	const httpConfig = await config();
	let success = false;
	let res = {};
	try{
		//console.log(config());
		res = await instance.get(`books/${id}`, httpConfig);
		success = true;
		//return res.data;
	} catch(err) {
		console.log(err);
		//throw new Error(`Failed to fetch book with id : ${id} !`);
		return { message: `Failed to fetch book with id : '${id}', remote server (back office) off !` };
	} finally {
		if (success) {
			return res.data;
		}
	}
}

export async function getUsersAction(): UserModel[] {
	const httpConfig = await config();
	let success = false;
	let res = {};
	try{
		//console.log(config());
		res = await instance.get('user/all', httpConfig);
		success = true;
		//return res.data;
	} catch(err) {
		console.log(err);
		//await logoutAction();
		//throw new Error('Failed to fetch books !');
		return { message: 'Failed to fetch users, remote server (back office) off !' };
	} finally {
		if (success) {
			return res.data;
		}
	}
}

export async function getUserAction(id: number): UserModel {
	const httpConfig = await config();
	let success = false;
	let res = {};
	try{
		//console.log(config());
		res = await instance.get(`user/${id}`, httpConfig);
		success = true;
		//return res.data;
	} catch(err) {
		console.log(err);
		//throw new Error(`Failed to fetch book with id : ${id} !`);
		return { message: `Failed to fetch user with id : '${id}', remote server (back office) off !` };
	} finally {
		if (success) {
			return res.data;
		}
	}
}

export async function updateUserAction(id: number, formData: UserModel) {
	const httpConfig = await config();
	let success = false;
	let res = {};
	try {
		const model = {
			id: formData.id,
			name: formData.name,
			username: formData.username,
			email: formData.email,
			password: formData.password,
			roles: formData.roles
		};
		res = await instance.put(`user/${id}`, model, httpConfig);
		if (res.data.code === 0)
			success = true;
	} catch (err) {
		console.log(err);
		//throw new Error(`Failed to update book with id ${id} !`);
		return { message: `Failed to update user profile with id '${id}', remote server (back office) off !`};
	} finally {
		if (success) {
			var userSession = await getSessionData();
			var userUpdated = res.data.user;
			userSession.name = userUpdated.name;
			userSession.username = userUpdated.username;
			userSession.email = userUpdated.email;
			userSession.password = userUpdated.password;
			await setSessionData(userSession);
			revalidatePath('/book/home');
			redirect('/book/home');
		} else {
			return { message: res.data === undefined 
				? 'Failed to update user profile, remote server (back office) off !'
				:  res.data.message };
		}
	}
}

export async function updateUserRolesAction(id: number, formData: UserModel) {
	const httpConfig = await config();
	let success = false;
	let res = {};
	try {
		res = await instance.put(`user/roles/${id}`, formData.roles, httpConfig);
		success = true;
	} catch (err) {
		console.log(err);
		//throw new Error(`Failed to update book with id ${id} !`);
		return { message: `Failed to update user roles with id '${id}', remote server (back office) off !`};
	} finally {
		if (success) {
			revalidatePath('/book/user/home');
			redirect('/book/user/home');
		}
	}
}

export async function createBookAction(formData: BookModel): BookModel {
	const httpConfig = await config();
	let res = {};
	let success = false;
	try {
		const model = {
	    	title: formData.title,
	    	author: formData.author,
	    	isbn: formData.isbn,
	    	pagesNum: formData.pagesNum,
	    };
		res = await instance.post('books', model, httpConfig);
		success = true;
	} catch (err) {
		console.log(err);
		//throw new Error('Failed to create new book !');
		return { message: 'Failed to create new book, remote server (back office) off !' };
	} finally {
		if (success){
			revalidatePath('/book/home');
			redirect('/book/home');
			//return res.data;
		}	
	}
}

export async function updateBookAction(id: number, formData: BookModel) {
	const httpConfig = await config();
	let success = false;
	let res = {};
	try {
		const model = {
			id: formData.id,
	    	title: formData.title,
	    	author: formData.author,
	    	isbn: formData.isbn,
	    	pagesNum: formData.pagesNum,
	    };
		res = await instance.put(`books/${id}`, model, httpConfig);
		success = true;
	} catch (err) {
		console.log(err);
		//throw new Error(`Failed to update book with id ${id} !`);
		return { message: `Failed to update book with id '${id}', remote server (back office) off !`};
	} finally {
		if (success) {
			revalidatePath('/book/home');
			redirect('/book/home');
		}
	}
}

export async function deleteBookAction(id: number){
	const httpConfig = await config();
	let success = false;
	let res = {};
	try{
		res = await instance.delete(`books/${id}`, httpConfig);
		success = true;
	} catch (err){
		console.log(err);
		//throw new Error(`Failed to delete book with id ${id} !`);
	} finally {
		if (success){
			return { code: 0 };
		} else {
			return { message: `Failed to delete book with id ${id}, remote server (back office) off !`, code: 1 };
		}
	}
}

export async function deleteUserAction(id: number){
	const httpConfig = await config();
	let success = false;
	let res = {};
	try{
		res = await instance.delete(`user/${id}`, httpConfig);
		success = true;
	} catch (err){
		console.log(err);
		//throw new Error(`Failed to delete book with id ${id} !`);
	} finally {
		if (success){
			//revalidatePath('/book/user/home');
			return { code: 0 };
		} else {
			return { message: `Failed to delete user with id ${id}, remote server (back office) off !`, code: 1};
		}
	}
}

export async function logoutAction(){
	await deleteSessionData();
	revalidatePath('/login');
	redirect('/login');
}

export async function createUserAction(formData: UserModel){
	const httpConfig = await config();
	let res = {};
	let success = false;
	try {
		const model = {
    	name: formData.name,
    	username: formData.username,
    	email: formData.email,
    	password: formData.password,
    	roles: formData.roles
    };
		res = await instance.post('user/signup', model, httpConfig);
		//console.log(res);
		if (res.data.code === 0){
			success = true;
		}
		else{
			success = false;
			throw res.data.message;
		}
	} catch (err) {
		throw (err);
	}
	/*catch (err) {
		console.log("Error !");
		console.log(err);
		//return { message: 'Failed to insert new user, remote server (back office) off !' };
		throw new Error('Failed to insert new user, remote server (back office) off !');
	} */
	finally {
		if (success){
			//console.log(res);
				//revalidatePath('/login');
				redirect('/login');
		} 
		else {
			//console.log("Res !");
			//console.log(res);
			return { message: res.data === undefined 
				? 'Failed to insert new user, remote server (back office) off !'
				:  res.data.message };
		}
	}
}
