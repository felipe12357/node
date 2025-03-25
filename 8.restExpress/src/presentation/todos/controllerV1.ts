import { Request, Response } from "express";
import { TodoDataRepository } from "../../domain/repositories/todo.repository";
import { TodoEntity } from "../../domain/entities/todo.entity";

export class TodosController {


    constructor(private todoRepository: TodoDataRepository) {
     }

    public get = async(req:Request, res: Response) => {
        const todos = await this.todoRepository.getAll();
        res.json(todos);
    }

    public getById = async(req:Request, res: Response) => {
        const id = +req.params.id;
        if( isNaN(id)) //400 => bad request
            res.status(400).json({error: 'id is not a number'})
        else {
            const todo = await this.todoRepository.findById(id);
            (todo) ? res.json(todo) : res.status(404).json({"error":'id not found'}) 
        }
    }

    public create = async(req:Request, res: Response)  => {
        const {text} = req.body;
        if( !text ) 
            res.status(400).json({error: "there are missing parameters in the the request"});

        const todo = await this.todoRepository.create(text);
        res.json(todo);
    }

    public update = async(req:Request, res: Response) => {
        const id = +req.params.id;

        if( isNaN(id)) //400 => bad request
            res.status(400).json({error: 'id is not a number'});
        else {
           const todoEntity = new TodoEntity(id, req.body.text);
           const todo = await this.todoRepository.updateById(todoEntity )

            if(!todo)
                res.status(404).json({"error":'id not found'});
            else
                res.json(todo);
        }
    }

    public delete = async(req:Request, res:Response) => {
        const id = +req.params.id;

        if( isNaN(id)) //400 => bad request
            res.status(400).json({error: 'id is not a number'});
        else {
            const todo = await this.todoRepository.deleteById(id);
            if(!todo) 
                res.status(404).json({"error":'id not found'}) 
            else
                res.json(todo);
        }
    }
}
