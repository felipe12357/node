import { todo } from "@prisma/client";
import { TodoEntity } from "../../domain/entities/todo.entity";
import { TodoDataRepository } from "../../domain/repositories/todo.repository";
import { TodoDataSource } from "../../domain/datasources/todo.dataSource";

export class TodoDataRepositoryImpl implements TodoDataRepository {

    constructor( private datasource: TodoDataSource){
    }

    create(text:string): Promise<TodoEntity> {
        return this.datasource.create(text)
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll()
    }
    findById(id: number): Promise<TodoEntity |null> {
       return this.datasource.findById(id);
    }
    updateById(updateTodoDto: TodoEntity): Promise<TodoEntity | null> {
        return this.datasource.updateById(updateTodoDto);
    }
    deleteById(id: number): Promise<TodoEntity | null> {
        return this.datasource.deleteById(id);
    }
}
