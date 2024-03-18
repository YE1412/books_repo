import { RoleModel } from "./role.model";

export class UserModel{
    constructor(public name: string,
        public username: string,
        public email: string,
        public password: string,
        public roles: RoleModel[],
        public id?: number,
        public token?: string){}
}