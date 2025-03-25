import { todo } from "@prisma/client";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDataRepository {
    abstract create(text:string): Promise<TodoEntity>
    abstract getAll(): Promise<TodoEntity[]>
    abstract findById(id:number): Promise<TodoEntity | null>
    abstract updateById(updateTodoDto:TodoEntity): Promise<TodoEntity | null>
    abstract deleteById(id:number): Promise<TodoEntity | null>
}