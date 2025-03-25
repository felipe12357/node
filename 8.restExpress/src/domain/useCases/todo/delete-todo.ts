import { TodoEntity } from "../../entities/todo.entity";
import { TodoDataRepository } from "../../repositories/todo.repository";

export interface DeleteTodoUseCase {
    execute(id: number): Promise<TodoEntity | null>
}

export class DeleteTodo implements DeleteTodoUseCase {

    constructor(private todoRepository: TodoDataRepository){
    }

    execute(id: number): Promise<TodoEntity | null> {
        return this.todoRepository.deleteById(id);
    }
}