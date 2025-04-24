import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Task from './Task';
import { Task as TaskType } from '../types';

interface TaskListProps {
  tasks: TaskType[];
  onDeleteTask: (id: string) => void;
  onSelectTask: (id: string) => void;
  onToggleTask: (id: string) => void;
  onEditTask: (task: TaskType) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onDeleteTask, 
  onSelectTask, 
  onToggleTask,
  onEditTask 
}) => {
  if (tasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tasks yet. Add one to get started!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Task
          task={item}
          onDelete={onDeleteTask}
          onSelect={onSelectTask}
          onToggle={onToggleTask}
          onEdit={onEditTask}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#FF9800',
    textAlign: 'center',
  },
});

export default TaskList;