import { Router } from "express";
import { TodosController } from "./controller";
import { query } from "express-validator";
import { TodoDataSourceImpl } from "../../infraestructure/datasource/todo.datasource.impl";
import { TodoDataRepositoryImpl } from "../../infraestructure/repositories/todo.repository.impl";

export class TodoRoutes {

    static get routes(): Router{
       
        const router = Router();
        const dataSource = new TodoDataSourceImpl();
        const todoRepository = new TodoDataRepositoryImpl(dataSource);
        const todosController = new TodosController(todoRepository);

        router.get('/', todosController.get);   // es igual a router.get('/', ( req, res) => todosController.getTodos(req,res));
        router.get('/:id',todosController.getById);
        //query text, valida q exista la propiedad text en el body
        router.post('/', query('text').notEmpty().escape(), todosController.create);
        router.put('/:id',query('text').notEmpty().escape(), todosController.update);
        router.delete('/:id',todosController.delete);
        return router;
    }
}