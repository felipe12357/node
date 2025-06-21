export class PaginatedResponseDto<T> {

    private constructor(
        public total: number,
        public list: T[],
    ) {}  
    
    static create<T>(total: number, list: T[]): PaginatedResponseDto<T> {
        return new PaginatedResponseDto(total, list);
    }
}