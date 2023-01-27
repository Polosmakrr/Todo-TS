import { model, Schema, SchemaTypes } from 'mongoose';
import { ITodo } from '../types/todos.type';

const todoSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  compleated: {
    type: Boolean,
    default: false
  },
  isprivate: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'User'
  }
});

const Todo = model<ITodo>('Todo', todoSchema);

export default Todo;
