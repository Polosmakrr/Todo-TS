import { ObjectId } from 'mongoose';
import { ITodo } from '../types/todos.type';
import Todo from '../models/Todo';

export default class TodoService {
  async findAll(
    userId: ObjectId,
    status: string,
    search: string,
    limit: number,
    page: number
  ): Promise<{ todos: ITodo[]; totalPages: number; page: number }> {
    const filter: { [key: string]: any } = {
      all: [{ isprivate: false }, { owner: userId, isprivate: true }],
      mytodo: [{ owner: userId }],
      private: [{ owner: userId, isprivate: true }],
      public: [{ isprivate: false }],
      compleated: [
        { compleated: true, isprivate: false },
        { owner: userId, isprivate: true, compleated: true }
      ]
    };

    const todos = await Todo.find({
      $and: [{ $or: filter[status] }, { title: { $regex: `^${search}` } }]
    })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const pages =
      (await Todo.find({
        $and: [{ $or: filter[status] }, { title: { $regex: `^${search}` } }]
      }).count()) / limit;

    const totalPages = Math.ceil(pages);
    return { todos, totalPages, page };
  }

  async getTodo(id: string): Promise<ITodo | null> {
    return Todo.findById(id);
  }

  async createTodo({ body, userId }: { body: ITodo; userId: ObjectId }): Promise<ITodo> {
    const { title, description, compleated, isprivate } = body;
    const todo = new Todo({
      title,
      description,
      compleated,
      isprivate,
      owner: userId
    });
    return todo.save();
  }

  async deleteTodo({
    todoId,
    userId
  }: {
    todoId: string;
    userId: ObjectId;
  }): Promise<ITodo | null> {
    return Todo.findOneAndRemove({ _id: todoId, owner: userId });
  }

  async updateTodo({
    todoId,
    userId,
    body
  }: {
    todoId: string;
    userId: ObjectId;
    body: ITodo;
  }): Promise<ITodo | null> {
    return Todo.findOneAndUpdate({ _id: todoId, owner: userId }, body, { new: true });
  }
}
