export interface ITodo {
  _id?: string;
  title: string;
  description: string;
  compleated: boolean;
  isprivate: boolean;
  date?: Date;
  owner?: string;
}