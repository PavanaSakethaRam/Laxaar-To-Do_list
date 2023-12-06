import React, { useState } from 'react';
import { Button, notification } from 'antd';
import axios from 'axios';
import EditTodoModal from '../Modals/EditTodoModal';

const EditTodo = ({ todo, fetchTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ title: todo.title, description: todo.description });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleEditFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${todo._id}`, { ...editForm, completed: todo.completed });
      setIsEditing(false);
      notification.success({ message: 'Todo updated successfully', duration: 2 });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
      notification.error({ message: 'Error updating todo', duration: 2 });
    }
  };

  return (
    <>
      <Button type="link" onClick={handleEditClick}>
        Edit
      </Button>
      <EditTodoModal 
        isEditing={isEditing} 
        handleEditCancel={handleEditCancel} 
        handleEditSubmit={handleEditSubmit} 
        editForm={editForm} 
        handleEditFormChange={handleEditFormChange} 
      />
    </>
  );
};

export default EditTodo;
