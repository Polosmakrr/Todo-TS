// TODO: Put a real interfaces here
import { ObjectId } from 'mongoose';

export interface ITodo {
  title: string;
  description: string;
  compleated: boolean;
  isprivate: boolean;
  id?: ObjectId;
  owner: ObjectId;
}
