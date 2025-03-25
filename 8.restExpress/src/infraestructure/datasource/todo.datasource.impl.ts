import { todo } from "@prisma/client";
import { TodoDataSource } from "../../domain/datasources/todo.dataSource";
import { TodoEntity } from "../../domain/entities/todo.entity";
import { prisma } from "../../data/postgres";

export class TodoDataSourceImpl implements TodoDataSource {
    async create(textSend: string): Promise<TodoEntity> {

        const {id, text} =  await prisma.todo.create({
                    data: { text:textSend }
                })

        return new TodoEntity(id,text)
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map( todo => TodoEntity.fromObject(todo))
    }

    async findById(id: number): Promise<TodoEntity | null> {
        const resp = await prisma.todo.findUnique({ where: { id } });
        return (resp) && new TodoEntity(resp.id,resp.text)
    }

    async updateById(updateTodoDto: todo): Promise<TodoEntity | null> {
        let resp = await this.findById(updateTodoDto.id);

        if(resp){
            resp = await prisma.todo.update({
                where: { id: updateTodoDto.id },
                data: { text:updateTodoDto.text }
            })
        }

        return (resp) && TodoEntity.fromObject(resp)
    }

    async deleteById(id: number): Promise<TodoEntity | null> {
        let resp = await this.findById(id);

        if(resp){
            resp = await prisma.todo.delete({ where :{ id:id }});
        }
       return resp && TodoEntity.fromObject(resp);;
    }
    
}