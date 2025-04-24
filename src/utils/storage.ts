import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types';

const STORAGE_KEY = '@todo_tasks';

export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

export const loadTasks = async (): Promise<Task[]> => {
  try {
    const tasksString = await AsyncStorage.getItem(STORAGE_KEY);
    return tasksString ? JSON.parse(tasksString) : [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};
