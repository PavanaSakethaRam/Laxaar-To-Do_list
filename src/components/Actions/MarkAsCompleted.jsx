import React from 'react';
import { Button, notification } from 'antd';
import axios from 'axios';

const MarkAsCompleted = ({ todo, fetchTodos }) => {
  const handleMarkAsCompleted = async () => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${todo._id}`, { completed: true });
      notification.success({ message: 'Todo marked as completed', duration: 2});
      fetchTodos();
    } catch (error) {
      console.error('Error marking todo as completed:', error);
      notification.error({ message: 'Error marking todo as completed', duration: 2 });
    }
  };

  return (
    <Button type="link" onClick={handleMarkAsCompleted}>
      Mark as Completed
    </Button>
  );
};

export default MarkAsCompleted;
