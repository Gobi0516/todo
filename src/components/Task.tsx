// src/components/Task.tsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Task as TaskType } from '../types';
import { useTodoStore } from '../store/todoStore';

interface TaskProps {
  task: TaskType;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (task: TaskType) => void; // Add this line
}

const Task: React.FC<TaskProps> = ({ task, onDelete, onSelect, onToggle }) => {
  const { setEditingTask } = useTodoStore();
  
  const handleEdit = () => {
    setEditingTask(task);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.taskContainer}
        onPress={() => onSelect(task.id)}
      >
        <TouchableOpacity
          style={[styles.checkbox, task.completed && styles.checkboxChecked]}
          onPress={() => onToggle(task.id)}
        >
          {task.completed && <Icon name="checkmark" size={16} color="#000" />}
        </TouchableOpacity>
        
        <View style={styles.textContainer}>
          <Text style={[styles.taskTitle, task.completed && styles.completedText]}>
            {task.title}
          </Text>
          <Text style={[styles.taskBody, task.completed && styles.completedText]}>
            {task.body}
          </Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(task.id)}
      >
        <Icon name="close" size={18} color="#000" />
      </TouchableOpacity>

      {task.selected && (
        <View style={styles.taskActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share-social" size={20} color="#FF9800" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="information-circle" size={20} color="#FF9800" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleEdit}
          >
            <Icon name="pencil" size={20} color="#FF9800" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF9800',
    backgroundColor: '#1e1e1e',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  taskBody: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
  },
  deleteButton: {
    marginTop: 15,
    position: 'absolute',
    right: 10,
    top: 10,
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#FF9800',
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 2,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 7,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    borderWidth: 1,
    borderColor: '#FF9800',
  },
});

export default Task;