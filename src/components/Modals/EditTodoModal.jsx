import React from 'react';
import { Modal, Form, Input } from 'antd';

const EditTodoModal = ({ isEditing, handleEditCancel, handleEditSubmit, editForm, handleEditFormChange }) => {
  return (
    <Modal title="Edit Todo" open={isEditing} onCancel={handleEditCancel} onOk={handleEditSubmit}>
      <Form>
        <Form.Item label="Title">
          <Input type="text" name="title" value={editForm.title} onChange={handleEditFormChange} />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea name="description" value={editForm.description} onChange={handleEditFormChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTodoModal;