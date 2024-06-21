interface CheckServiceI {
    execute(url:string):Promise<Boolean>
}

type SuccessCallBack =()=>void;
type ErrorCallBack = (error:string)=>void;

export class CheckService implements CheckServiceI{
    //all recibir los metodos en el constructor estoy implementando
    //injection de dependencias
    constructor(
        private readonly successCallBack:SuccessCallBack,
        private readonly errorCallBack:ErrorCallBack){
    }

    async execute(url:string):Promise<boolean>{
        try {
            const req = await fetch(url);
            if( !req.ok)
                throw new Error(`Error checking the url : ${url}`)
            this.successCallBack();
            return true
        }catch(error){
            this.errorCallBack(`${error}`);
            return false;
        }
    }
}