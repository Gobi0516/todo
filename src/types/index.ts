export interface Task {
    id: string;
    title: string;
    body: string;
    completed: boolean;
    selected?: boolean;
    createdAt: number;
  }