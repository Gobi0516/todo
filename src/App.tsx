// src/App.tsx
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, Text } from 'react-native';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskEditModal from './components/TaskEditModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import { useTodoStore } from './store/todoStore';

const App = () => {
  const { 
    tasks, 
    isLoading, 
    editingTask,
    taskToDelete,
    fetchTasks, 
    addTask, 
    deleteTask,
    selectTask,
    toggleTask,
    setEditingTask,
    updateTask,
    setTaskToDelete,
    confirmDelete
  } = useTodoStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCloseEditModal = () => {
    setEditingTask(null);
  };

  const handleSaveEdit = (id: string, title: string, body: string) => {
    updateTask(id, title, body);
  };

  const handleCancelDelete = () => {
    setTaskToDelete(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <TaskInput onAddTask={addTask} />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading tasks...</Text>
        </View>
      ) : (
        <TaskList
          tasks={tasks}
          onDeleteTask={deleteTask}
          onSelectTask={selectTask}
          onToggleTask={toggleTask}
          onEditTask={setEditingTask} 
        />
      )}

      <TaskEditModal
        visible={!!editingTask}
        task={editingTask}
        onClose={handleCloseEditModal}
        onSave={handleSaveEdit}
      />

      <DeleteConfirmationModal
        visible={!!taskToDelete}
        onClose={handleCancelDelete}
        onConfirm={confirmDelete}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#FF9800',
  },
});

export default App;