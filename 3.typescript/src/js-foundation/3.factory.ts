export interface personProps {
    name:string,
    birthdate:string
}

export const buildPerson = (getId:()=>string,getAge:(date:string)=>string)=> {
    return ({name, birthdate}:personProps) =>{
        return {
            id: getId(),
            name: name,
            birthdate,
            age: getAge(birthdate)
        }
    }
}
