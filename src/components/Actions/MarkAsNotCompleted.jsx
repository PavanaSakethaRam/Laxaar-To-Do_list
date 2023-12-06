import React from 'react';
import { Button, notification } from 'antd';
import axios from 'axios';

const MarkAsNotCompleted = ({ todo, fetchTodos }) => {
  const handleMarkAsNotCompleted = async () => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${todo._id}`, { completed: false });
      notification.warning({ message: 'Todo marked as not completed', duration: 2 });
      fetchTodos();
    } catch (error) {
      console.error('Error marking todo as not completed:', error);
      notification.error({ message: 'Error marking todo as not completed', duration: 2 });
    }
  };

  return (
    <Button type="link" onClick={handleMarkAsNotCompleted}>
      Mark as Not Completed
    </Button>
  );
};

export default MarkAsNotCompleted;
