import { TodoEntity } from "../../entities/todo.entity";
import { TodoDataRepository } from "../../repositories/todo.repository";

export interface GetTodoUseCase {
    execute(id: number): Promise<TodoEntity | null>
}

export class GetTodo implements GetTodoUseCase {

    constructor(private todoRepository: TodoDataRepository){
    }

    execute(id: number): Promise<TodoEntity | null > {
        return this.todoRepository.findById(id)
    }
}