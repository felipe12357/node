export type ProductType = {
    id: string,
    name: string,
    price: number,
    userId: string,
    categoryId: string,
    description?: string,
    available?: boolean
}

export type CategoryType = {
    id: string,
    name: string,
    available?: boolean
}