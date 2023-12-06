import { useState } from 'react';
import axios from 'axios';
import { notification } from 'antd';

const useAddTodo = (fetchTodos) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });

  const handleAddSubmit = async () => {
    try {
      if(newTodo.title === '' || newTodo.description === '') {
        notification.error({ message: 'Title and description cannot be empty', duration: 2 });
        return;
      }
      const res = await axios.post('http://localhost:5000/api/todos', newTodo);
      setNewTodo({
        title: '',
        description: '',
      });
      setIsAdding(false);
      if (res.status === 201) {
        notification.success({ message: 'Todo added successfully', duration: 2 });
      }
      else {
        notification.error({ message: 'Error adding todo', duration: 2 });
      }
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
      notification.error({ message: 'Error adding todo', duration: 2 });
    }
  };

  return { isAdding, newTodo, setIsAdding, setNewTodo, handleAddSubmit };
};

export default useAddTodo;