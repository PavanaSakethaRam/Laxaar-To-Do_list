import React from 'react';
import { Button, notification } from 'antd';
import axios from 'axios';

const DeleteTodo = ({ todo, fetchTodos }) => {
  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${todo._id}`);
      notification.success({ message: 'Todo deleted successfully', duration: 2 });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
      notification.error({ message: 'Error deleting todo', duration: 2 });
    }
  };

  return (
    <Button type="link" danger onClick={handleDeleteClick}>
      Delete
    </Button>
  );
};

export default DeleteTodo;
