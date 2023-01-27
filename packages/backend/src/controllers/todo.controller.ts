import { Request } from 'express';
import { ITodo } from '../types';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(
    req: Request<
      never,
      never,
      never,
      { status: string; search: string; limit: number; page: number }
    >
  ) {
    const { user } = req;
    const { status, search, limit, page } = req.query;
    return this.todoService.findAll(user._id!, status, search, limit, page);
  }

  async getTodoById(req: Request<{ id: string }>) {
    return this.todoService.getTodo(req.params.id);
  }

  async addTodo(req: Request<never, never, ITodo>) {
    const { user } = req;
    return this.todoService.createTodo({ body: req.body, userId: user._id! });
  }

  async deleteTodoByID(req: Request<{ id: string }>) {
    const { user } = req;
    const { id } = req.params;
    return this.todoService.deleteTodo({ todoId: id, userId: user._id! });
  }

  async updateTodoById(req: Request<{ id: string }, never, ITodo>) {
    const { user } = req;
    const { id } = req.params;
    return this.todoService.updateTodo({ todoId: id, userId: user._id!, body: req.body });
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
