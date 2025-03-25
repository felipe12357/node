import { Request, Response } from "express";
import { TodoDataRepository } from "../../domain/repositories/todo.repository";
import { TodoEntity } from "../../domain/entities/todo.entity";
import { CreateTodo, DeleteTodo, GetAllTodo, GetTodo, UpdateTodo } from "../../domain/useCases";

export class TodosController {


    constructor(private todoRepository: TodoDataRepository) {
    }

    public get = (req:Request, res: Response) => {
        new GetAllTodo(this.todoRepository).execute()
         .then( (todos)=>res.json(todos) );
    }

    public getById = (req:Request, res: Response) => {
        const id = +req.params.id;
        if( isNaN(id)) //400 => bad request
            res.status(400).json({error: 'id is not a number'})
        else {
            new GetTodo(this.todoRepository).execute(id)
            .then( (todo)=>{
                (todo) ? res.json(todo) : res.status(404).json({"error":'id not found'}) 
            });           
        }
    }

    public create = (req:Request, res: Response)  => {
        const {text} = req.body;
        if( !text ) 
            res.status(400).json({error: "there are missing parameters in the the request"});

        new CreateTodo(this.todoRepository).execute(text)
        .then( (todo)=> res.json(todo));   
    }

    public update = (req:Request, res: Response) => {
        const id = +req.params.id;

        if( isNaN(id)) //400 => bad request
            res.status(400).json({error: 'id is not a number'});
        else {
           const todoEntity = new TodoEntity(id, req.body.text);
           new UpdateTodo(this.todoRepository).execute(todoEntity)
            .then((todo)=>{
                if(!todo)
                    res.status(404).json({"error":'id not found'});
                else
                    res.json(todo);
            })
        }
    }

    public delete = (req:Request, res:Response) => {
        const id = +req.params.id;

        if( isNaN(id)) //400 => bad request
            res.status(400).json({error: 'id is not a number'});
        else {

            new DeleteTodo(this.todoRepository).execute(id)
            .then((todo)=>{
                (!todo) ?
                    res.status(404).json({"error":'id not found'})
                : res.json(todo);
            })
        }
    }
}
