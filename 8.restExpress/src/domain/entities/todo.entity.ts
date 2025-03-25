export class TodoEntity {
    
    constructor(
        public id:number, public text: string
    ){}

    //metodo para mappear un objeto y convertilo en la entidad Todo
    static fromObject( obj: {[key:string]:any}):TodoEntity {
        const { id, text } = obj;
        return new TodoEntity( id, text);
    }
}