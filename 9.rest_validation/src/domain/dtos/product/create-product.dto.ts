export class CreateProductDto {
    private constructor(
        public readonly name: string,
        public readonly price: number,
        public readonly userId: string,
        public readonly categoryId: string,
        public readonly description?: string,
        public readonly available?: boolean
    ){}
}