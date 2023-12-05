import React from 'react';
import { List, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';

const TodoItem = ({ todo, fetchTodos }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editForm, setEditForm] = React.useState({ title: todo.title, description: todo.description });

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
      toast.success('Todo updated successfully');
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
      toast.error('Error updating todo');
    }
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${todo._id}`);
      toast.success('Todo deleted successfully');
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast.error('Error deleting todo');
    }
  };

  const handleMarkAsCompleted = async () => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${todo._id}`, { completed: true });
      toast.clearWaitingQueue();
      toast.success('Todo marked as completed');
      fetchTodos();
    } catch (error) {
      console.error('Error marking todo as completed:', error);
      toast.error('Error marking todo as completed');
    }
  };

  const handleMarkAsNotCompleted = async () => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${todo._id}`, { completed: false });
      toast.clearWaitingQueue();
      toast.warning('Todo marked as not completed');
      fetchTodos();
    } catch (error) {
      console.error('Error marking todo as not completed:', error);
      toast.error('Error marking todo as not completed');
    }
  };

  return (
    <List.Item
      actions={[
        <Button type="link" onClick={handleEditClick}>
          Edit
        </Button>,
        <Button type="link" danger onClick={handleDeleteClick}>
          Delete
        </Button>,
        !todo.completed ? (
          <Button type="link" onClick={handleMarkAsCompleted}>
            Mark as Completed
          </Button>
        ) : (
          <Button type="link" onClick={handleMarkAsNotCompleted}>
            Mark as Not Completed
          </Button>
        ),
      ]}
    >
      <List.Item.Meta title={todo.title} description={todo.description} />
      <Modal
        title="Edit Todo"
        open={isEditing}
        onCancel={handleEditCancel}
        onOk={handleEditSubmit}
      >
        <Form>
          <Form.Item label="Title">
            <Input
              type="text"
              name="title"
              value={editForm.title}
              onChange={handleEditFormChange}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              name="description"
              value={editForm.description}
              onChange={handleEditFormChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </List.Item>
  );
};

export default TodoItem;
