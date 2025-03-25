import { TodoEntity } from "../../entities/todo.entity";
import { TodoDataRepository } from "../../repositories/todo.repository";

export interface CreateTodoUseCase {
    execute(text:string): Promise<TodoEntity>
}

export class CreateTodo implements CreateTodoUseCase {

    constructor(private todoRepository: TodoDataRepository){
    }

    execute(text: string): Promise<TodoEntity> {
        return this.todoRepository.create(text);
    }
}