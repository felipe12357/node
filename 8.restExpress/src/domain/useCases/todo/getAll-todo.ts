import { TodoEntity } from "../../entities/todo.entity";
import { TodoDataRepository } from "../../repositories/todo.repository";

export interface GetAllTodoUseCase {
    execute(): Promise<TodoEntity[]>
}

export class GetAllTodo implements GetAllTodoUseCase {

    constructor(private todoRepository: TodoDataRepository){
    }

    execute(): Promise<TodoEntity[]> {
        return this.todoRepository.getAll()
    }
}