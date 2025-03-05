import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {

    static get routes(): Router{
        const router = Router();
        const todosController = new TodosController();

        router.get('/', todosController.get);   // es igual a router.get('/', ( req, res) => todosController.getTodos(req,res));
        router.get('/:id',todosController.getById);
        router.post('/',todosController.create);
        router.put('/:id',todosController.update);
        router.delete('/:id',todosController.delete);
        return router;
    }
}