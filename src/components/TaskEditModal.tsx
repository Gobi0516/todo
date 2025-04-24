// src/components/TaskEditModal.tsx
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text,
  Modal
} from 'react-native';
import { Task } from '../types';

interface TaskEditModalProps {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (id: string, title: string, body: string) => void;
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({ 
  visible, 
  task, 
  onClose, 
  onSave 
}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setBody(task.body);
    }
  }, [task]);

  const handleSave = () => {
    if (task && title.trim()) {
      onSave(task.id, title, body);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.titleInput}
            placeholder="Mini Input..."
            placeholderTextColor="#888"
            value={title}
            onChangeText={setTitle}
          />
          
          <TextInput
            style={styles.bodyInput}
            placeholder="Max Input..."
            placeholderTextColor="#888"
            value={body}
            onChangeText={setBody}
            multiline
          />
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#FF9800',
  },
  titleInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#FF9800',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#121212',
    color: '#fff',
  },
  bodyInput: {
    height: 120,
    borderWidth: 1,
    borderColor: '#FF9800',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#121212',
    color: '#fff',
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  cancelButton: {
    marginRight: 10,
    backgroundColor: '#333',
    borderColor: '#FF9800',
  },
  saveButton: {
    marginLeft: 10,
    backgroundColor: '#FF9800',
    borderColor: '#FF9800',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TaskEditModal;