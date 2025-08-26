export interface Task {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LogEntry {
  id: string;
  action: 'add' | 'update' | 'toggle' | 'remove' | 'clear' | 'list';
  taskId: string | null;
  timestamp: string;
  details: string;
}