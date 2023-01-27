import { HttpService } from '../../common/services/http.service';
import { BACKEND_KEYS } from '../../common/consts/app-keys.const';
import { ITodo } from '../../common/types/todo';

export class TodoService extends HttpService {
  async getAllTodo(query: {
    status: string;
    search: string;
    limit: number;
    page: number;
  }): Promise<{ todos: ITodo[]; page: number; totalPages: number }> {
    const { status, search, limit, page } = query;
    return this.get(
      `${BACKEND_KEYS.TODOS}?status=${status}&search=${search}&limit=${limit}&page=${page}`
    );
  }

  getTodoById(id: string): Promise<ITodo> {
    return this.get(`${BACKEND_KEYS.TODOS}/${id}`);
  }

  createTodo(todo: ITodo) {
    return this.post(BACKEND_KEYS.TODOS, todo);
  }

  updateTodo(todo: ITodo, id: string) {
    return this.put(`${BACKEND_KEYS.TODOS}/${id}`, todo);
  }

  deleteTodo(id: string) {
    return this.delete(`${BACKEND_KEYS.TODOS}/${id}`);
  }
}

export const todoService = new TodoService();
