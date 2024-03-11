export type LoginRequest = {
	usernameOrEmail: string;
	password: string;
};

export type UserModel = {
	name: string;
    username: string;
    email: string;
    password: string;
    roles: RoleModel[];
    id?: number;
    token?: string;
};

export type LoginResponse = {
	user:UserModel;
    message: string;
    code: number;
    token?: string;
};

export type BookModel = {
    title: string;
    author: string;
    isbn: string;
    pagesNum: number;
    id?: number;
};

export type RoleModel = {
    id: number;
    name: string;
};