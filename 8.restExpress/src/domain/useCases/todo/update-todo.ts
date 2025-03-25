import { TodoEntity } from "../../entities/todo.entity";
import { TodoDataRepository } from "../../repositories/todo.repository";

export interface UpdateTodoUseCase {
    execute(todo: TodoEntity): Promise<TodoEntity | null>
}

export class UpdateTodo implements UpdateTodoUseCase {

    constructor(private todoRepository: TodoDataRepository){
    }

    execute(todo: TodoEntity): Promise<TodoEntity | null> {
        return this.todoRepository.updateById(todo);
    }
}