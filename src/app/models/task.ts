export interface Task {
  _id?: string;
  title: string;
  description?: string;
  completed: boolean;
  category: string;
  createdAt?: Date;
}
