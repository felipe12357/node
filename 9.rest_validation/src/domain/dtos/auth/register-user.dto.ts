export type RegisterUserDtoType = {
    name:string,
    email: string,
    password: string
}

import { regularExps } from "../../../utils/regular-exp";


//esto se hace para hacer la validacion de los datos manualmente, en lugar de esto
//se utiliza express validator y lo hago en conjunto con types
export class RegisterUserDto {

    private constructor(
        public name: string,
        public email: string,
        public password: string,
    ) {}

    static create( object: { [key:string]:any}): [string?, RegisterUserDto?] {
        const {name , email, password} = object;

        if(!name) return ['missing name'];

        if(!email) return ['missing email'];

        if(!regularExps.email.test(email)) return ['email not valid'];

        if(!password) return ['missing password'];

        if(password.length < 6) return ['Password to short']

        return [undefined, new RegisterUserDto(name, email, password)];
    }
}