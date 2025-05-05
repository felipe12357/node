import { CustomError } from "../errors/custom.error";

export class UserEntity {
    constructor(
        public id: string,
        public name : string, 
        public email : string,
        public emailValidated: boolean,
        public password: string, 
        public role: string,
        public img?: string, 
    ){}

    //metodo para mappear un objeto y convertilo en la entidad Todo
    static fromObject( obj: {[key:string]:any}):UserEntity {
        const { id, _id, name,email, emailValidated,password, role, img } = obj;

        if( !_id && !id) 
            throw CustomError.badRequest('Missing id');

        if( !name) 
            throw CustomError.badRequest('Missing name');

        if( !email) 
            throw CustomError.badRequest('Missing email');

        if( !password) 
            throw CustomError.badRequest('Missing password');


        return new UserEntity( _id || id, name, email, emailValidated, password, role, img);
    }
}