import { Request, Response } from "express";

export class TodosController {

    constructor() { }

    public get(req:Request, res: Response) {
        res.json(todos)
    }

    public getById(req:Request, res: Response) {
        const id = +req.params.id;

        if( isNaN(id)) //400 => bad request
            res.status(400).json({error: 'id is not a number'})
        else {
            // 404 => element not found
            const todo = todos.find(todo => todo.id === id);
            (todo) ? res.json(todo) : res.status(404).json({"error":'id not found'})
        }
    }

    public create(req:Request, res: Response) {
        const {text, id} = req.body;
        if( !text || !id) 
            res.status(400).json({error: "there are missing parameters in the the request"});

        todos.push({text,id});
        res.json({text,id});
    }

    public update(req:Request, res: Response) {
        const id = +req.params.id;

        if( isNaN(id)) //400 => bad request
            res.status(400).json({error: 'id is not a number'});
        else {
            // 404 => element not found
            const todo = todos.find(todo => todo.id === id);
            if(!todo)
                res.status(404).json({"error":'id not found'});
            else{
                todo.text = req.body.text;
                res.json(todo);
            }
                
        }
    }

    public delete(req:Request, res:Response) {
        const id = +req.params.id;

        if( isNaN(id)) //400 => bad request
            res.status(400).json({error: 'id is not a number'});
        else {
            const position =  todos.findIndex(todo => todo.id === id);
            if(position === -1){
                res.status(404).json({error: 'id not found'});
            }else {
                const deletedTodo = todos[position];
                todos.splice(position,1);
                res.json(deletedTodo)
            }
        }
    }
    
}

const todos = [
    { id:123, text:'hola mundo11' },
    { id:234, text:'hola mundo22' },
    { id:35, text:'hola mundo32' },
]