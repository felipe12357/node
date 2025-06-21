import { CustomError } from "../errors/custom.error";

export class CategoryEntity {
    constructor(
        public id: string,
        public name : string, 
        public available : boolean,
    ){}

    //metodo para mappear un objeto y convertilo en la entidad Todo
    static fromObject( obj: {[key:string]:any}):CategoryEntity {
        const { id, _id, name,available, userId } = obj;

        if( !_id && !id) 
            throw CustomError.badRequest('Missing id');

        if( !name) 
            throw CustomError.badRequest('Missing name');

        return new CategoryEntity( _id || id, name, available);
    }
}