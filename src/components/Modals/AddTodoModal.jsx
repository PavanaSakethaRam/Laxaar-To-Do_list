import React from 'react';
import { Modal, Form, Input } from 'antd';

const AddTodoModal = ({ isAdding, newTodo, setIsAdding, setNewTodo, handleAddSubmit }) => {
  return (
    <Modal
      title="Add Todo"
      open={isAdding}
      onCancel={() => setIsAdding(false)}
      onOk={handleAddSubmit}
    >
      <Form>
        <Form.Item label="Title">
          <Input
            type="text"
            name="title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            name="description"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTodoModal;
