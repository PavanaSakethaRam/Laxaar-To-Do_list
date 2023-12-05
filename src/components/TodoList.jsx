import React, { useState, useEffect } from 'react';
import { List, Button, Modal, Form, Input, Spin } from 'antd';
import axios from 'axios';
import TodoItem from './TodoItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [showAll, setShowAll] = useState(true);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data);
    } catch (error) {
      toast.error('Error fetching todos');
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleAddCancel = () => {
    setIsAdding(false);
  };

  const handleAddFormChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async () => {
    try {
      if(newTodo.title === '' || newTodo.description === '') {
        toast.error('Title and description cannot be empty');
        return;
      }
      const res = await axios.post('http://localhost:5000/api/todos', newTodo);
      setNewTodo({
        title: '',
        description: '',
      });
      setIsAdding(false);
      if (res.status === 201) {
        toast.success('Todo added successfully');
      }
      else {
        toast.error('Error adding todo');
      }
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleShowCompleted = () => {
    setShowCompleted(true);
    setShowAll(false);
  };

  const handleShowNonCompleted = () => {
    setShowCompleted(false);
    setShowAll(false);
  };

  const handleShowAll = () => {
    setShowAll(true);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos =
    todos
      .filter((todo) => (showAll ? true : (showCompleted ? todo.completed : !todo.completed)))
      .filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <Button type="primary" onClick={handleAddClick} style={{ marginBottom: "10px" }}>
          Add Todo
        </Button>
        <Input
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginBottom: '10px' }}
        />
        <Button type="default" onClick={handleShowAll} style={{ marginRight: "5px" }}>
          Show All
        </Button>
        <Button type="default" onClick={handleShowCompleted} style={{ marginRight: "5px" }}>
          Show Completed
        </Button>
        <Button type="default" onClick={handleShowNonCompleted}>
          Show Non-Completed
        </Button>
      </div>
      <Spin spinning={loading}>
        <List
          itemLayout="vertical"
          dataSource={filteredTodos}
          renderItem={(todo) => <TodoItem todo={todo} fetchTodos={fetchTodos} />}
        />
      </Spin>
      <Modal
        title="Add Todo"
        open={isAdding}
        onCancel={handleAddCancel}
        onOk={handleAddSubmit}
      >
        <Form>
          <Form.Item label="Title">
            <Input
              type="text"
              name="title"
              value={newTodo.title}
              onChange={handleAddFormChange}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea
              name="description"
              value={newTodo.description}
              onChange={handleAddFormChange}
            />
          </Form.Item>
        </Form>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={3}
      />
    </div>
  );
};

export default TodoList;
