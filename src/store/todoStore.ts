// src/store/todoStore.ts
import { create } from 'zustand';
import { Task } from '../types';
import { loadTasks, saveTasks } from '../utils/storage';

interface TodoState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  editingTask: Task | null;
  taskToDelete: string | null;
 
  // Actions
  fetchTasks: () => Promise<void>;
  addTask: (title: string, body: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  selectTask: (id: string) => void;
  clearSelection: () => void;
  toggleTask: (id: string) => Promise<void>;
  setEditingTask: (task: Task | null) => void;
  updateTask: (id: string, title: string, body: string) => Promise<void>;
  setTaskToDelete: (id: string | null) => void;
  confirmDelete: () => Promise<void>;
  
}

export const useTodoStore = create<TodoState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  editingTask: null,
  taskToDelete: null,
 
  fetchTasks: async () => {
    set({ isLoading: true });
    try {
      const tasks = await loadTasks();
      set({ tasks, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to load tasks', isLoading: false });
    }
  },
 
  addTask: async (title: string, body: string) => {
    if (!title.trim()) return;
   
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      body: body.trim(),
      completed: false,
      selected: false,
      createdAt: Date.now(),
    };
   
    const updatedTasks = [...get().tasks, newTask];
    set({ tasks: updatedTasks });
    await saveTasks(updatedTasks);
  },
 
  deleteTask: async (id: string) => {
    set({ taskToDelete: id });
  },

  confirmDelete: async () => {
    const { taskToDelete } = get();
    if (!taskToDelete) return;

    const updatedTasks = get().tasks.filter(task => task.id !== taskToDelete);
    set({ tasks: updatedTasks, taskToDelete: null });
    await saveTasks(updatedTasks);
  },

  setTaskToDelete: (id: string | null) => {
    set({ taskToDelete: id });
  },

  selectTask: (id: string) => {
    // First, check if the task is already selected
    const selectedTask = get().tasks.find(task => task.id === id);
   
    if (selectedTask && selectedTask.selected) {
      // If already selected, clear the selection
      const updatedTasks = get().tasks.map(task => ({ ...task, selected: false }));
      set({ tasks: updatedTasks });
    } else {
      // Otherwise, clear any existing selections and select this task
      const updatedTasks = get().tasks.map(task =>
        ({ ...task, selected: task.id === id })
      );
      set({ tasks: updatedTasks });
    }
  },

  clearSelection: () => {
    const updatedTasks = get().tasks.map(task => ({ ...task, selected: false }));
    set({ tasks: updatedTasks });
  },

  toggleTask: async (id: string) => {
    const updatedTasks = get().tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    set({ tasks: updatedTasks });
    await saveTasks(updatedTasks);
  },

  setEditingTask: (task: Task | null) => {
    set({ editingTask: task });
  },

  updateTask: async (id: string, title: string, body: string) => {
    if (!title.trim()) return;
    
    const updatedTasks = get().tasks.map(task => 
      task.id === id 
        ? { ...task, title: title.trim(), body: body.trim() } 
        : task
    );
    
    set({ tasks: updatedTasks, editingTask: null });
    await saveTasks(updatedTasks);
  }
}));