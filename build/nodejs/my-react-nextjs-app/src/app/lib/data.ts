import type { BookModel, RoleModel } from '@/app/lib/definitions'
import * as Actions from '@/app/lib/actions';
import { z } from 'zod';

export async function fetchBooksData(): BookModel[] {
	return await Actions.getBooksAction();
};

export async function fetchBookData(id: number): BookModel {
	return await Actions.getBookAction(id);
};

export async function fetchUsersData(): UserModel[] {
	return await Actions.getUsersAction();
};

export async function fetchUserData(id: number): UserModel {
	return await Actions.getUserAction(id);
};


export async function fetchUserSessionRoles() : RoleModel[] | null {
	const usr = await Actions.getSessionData();
	//console.log(usr.user.roles);
	return usr !== null ? usr.roles : null;
};

export async function fetchUserSession() : UserModel | null {
	const usr = await Actions.getSessionData();
	return usr !== null ? usr : null;
};

export function logout() {
	Actions.logoutAction();
};

export const FormLoginSchema = z.object({
	usernameOrEmail: z.string().nonempty('Username/Email is required !'),
	password: z.string().nonempty('Password is required !')
});

export const BookCreationSchema = z.object({
	title: z.string().nonempty('Title is required !'),
	author: z.string().nonempty('Author is required !'),
	isbn: z.string().nonempty('Isbn is required !')
		.min(13, 'Isbn must be at least 13 characters.')
		.regex(/^\d+$/, 'Invalid Isbn supplied, must contain only digits'),
	pagesNum: z.coerce.number({
	  required_error: 'Pages Number is required !',
	  invalid_type_error: 'Pages Number must be a number',
	}).gt(0, 'Pages Number can\'t be equals or lower than 0'),
	id: z.number()
});

export const NewBookSchema = BookCreationSchema.omit({id: true});

//const castToArrayOfString = z.preprocess((val) => String.prototype.split.call(val, ','), z.string().array());

export const UserCreationSchema = z.object({
	id: z.number(),
	name: z.string().nonempty('Name is required !'),
	username: z.string().nonempty('Username is erquired !'),
	email: z.string().email({message: 'Invalid email address !'}).nonempty('Email is required !'),
	password: z.string().nonempty('Password is required !'),
	//roles: castToArrayOfString.nonempty('User must have at least 1 role !')
	roles: z.string().nonempty('User must have at least 1 role !')
		.transform((val) => val.split(','))
});

export const NewUserSchema = UserCreationSchema.omit({id: true});
export const UpdateUserRolesSchema = UserCreationSchema.omit({password: true});