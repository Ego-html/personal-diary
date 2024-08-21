export interface Note {
  id: string;
  title: string,
  completed: boolean;
  description?: string;
  createdAt: Date;
  text: string;
  image?: string;
  index: number;
}
