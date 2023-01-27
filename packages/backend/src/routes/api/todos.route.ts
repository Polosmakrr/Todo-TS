import { Router } from 'express';
import { errorHandler } from '../../error/error.handler';
import todoController from '../../controllers/todo.controller';
import { asyncWrapper } from '../../middlewares/async.wrapper';
import { vallidator } from '../../middlewares/validation.middlevare';
import isExist from '../../middlewares/is-exist.middleware';
import { ITodo } from '../../types/todos.type';
import Todo from '../../models/Todo';
import { schemaAdd, schemaEdit } from '../../schema/validation.todo';
import { auth } from '../../middlewares/auth.middleware';

const todosRouter: Router = Router();

todosRouter.get('', auth, asyncWrapper(todoController.getAllTodo.bind(todoController)));

todosRouter.get(
  '/:id',
  isExist.check<ITodo>(Todo),
  asyncWrapper(todoController.getTodoById.bind(todoController))
);
todosRouter.post(
  '',
  auth,
  vallidator(schemaAdd),
  asyncWrapper(todoController.addTodo.bind(todoController))
);
todosRouter.put(
  '/:id',
  auth,
  isExist.check<ITodo>(Todo),
  vallidator(schemaEdit),
  asyncWrapper(todoController.updateTodoById.bind(todoController))
);
todosRouter.delete(
  '/:id',
  auth,
  isExist.check<ITodo>(Todo),
  asyncWrapper(todoController.deleteTodoByID.bind(todoController))
);
todosRouter.use(errorHandler);

export default todosRouter;
