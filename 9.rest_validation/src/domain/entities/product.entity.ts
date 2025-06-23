export class ProductEntity {
    constructor(
        public id: string,
        public name: string,
        public price: number,
        public userId: string,
        public categoryId: string,
        public description?: string,
        public available?: boolean
    ){}

    //metodo para mappear un objeto y convertilo en la entidad Todo
    static fromObject( obj: {[key:string]:any}):ProductEntity {
        const { id, _id, name, price, userId, categoryId, description, available } = obj;

        return new ProductEntity( _id || id, name, price, userId, categoryId, description, available);
    }
}