import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface TaskInputProps {
  onAddTask: (title: string, body: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleAddTask = () => {
    if (title.trim()) {
      onAddTask(title, body);
      setTitle('');
      setBody('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.titleInput}
          placeholder="Title..."
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
          onFocus={() => console.log("Focused")}
        />
        <TextInput
          style={styles.bodyInput}
          placeholder="About..."
          placeholderTextColor="#888"
          value={body}
          onChangeText={setBody}
          multiline
        />
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddTask}
        disabled={!title.trim()}
      >
        <Icon name="add" size={32} color="#FF9800" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    paddingTop: 40,
    alignItems: 'flex-start',
  },
  inputsContainer: {
    flex: 1,
    marginRight: 10,
  },
  titleInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#FF9800',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: '#1e1e1e',
    color: '#fff',
  },
  bodyInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#FF9800',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#1e1e1e',
    color: '#fff',
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF9800',
    marginTop: 20, 
    marginLeft: 5,
  },
});

export default TaskInput;
