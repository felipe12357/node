export class CreateCategoryDto {

    private constructor(
        public name: string,
        public available?: boolean,
    ) {}
}