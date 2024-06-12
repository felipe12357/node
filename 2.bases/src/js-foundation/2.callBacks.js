const users = [
    {  id:1, name: 'sara' },
    {  id:2, name: 'natalia' },
]

const getUserById = ( id, callback) => {

    const user = users.find((user)=> user.id === id)
    return (user) 
        ? callback(null, user)
        : callback(`User not found with id: ${id}`)
}

module.exports = {
    getUserById
}
