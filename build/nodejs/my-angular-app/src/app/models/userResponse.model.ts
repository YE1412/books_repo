import { UserModel } from "./user.model";

export class UserResponseModel{
    constructor(public user:UserModel,
        public message: string,
        public code: number,
        public token?: string){}
}