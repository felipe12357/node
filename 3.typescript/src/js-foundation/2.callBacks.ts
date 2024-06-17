export interface UserI {
    id:number,
    name: string
}

const users:UserI[] = [
    {  id:1, name: 'sara' },
    {  id:2, name: 'natalia' },
]

export const getUserById = ( id:number, callback:(error?:string,user?:UserI)=>void) => {

    const user = users.find((user)=> user.id === id)
    return (user) 
        ? callback( undefined, user)
        : callback(`User not found with id: ${id}`)
}

