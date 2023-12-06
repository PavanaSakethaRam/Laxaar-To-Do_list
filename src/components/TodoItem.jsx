import React from 'react';
import { List } from 'antd';
import EditTodo from './Actions/EditTodo';
import DeleteTodo from './Actions/DeleteTodo';
import MarkAsCompleted from './Actions/MarkAsCompleted';
import MarkAsNotCompleted from './Actions/MarkAsNotCompleted';

const TodoItem = ({ todo, fetchTodos }) => {
  return (
    <List.Item
      actions={[
        <EditTodo todo={todo} fetchTodos={fetchTodos} />,
        <DeleteTodo todo={todo} fetchTodos={fetchTodos} />,
        !todo.completed ? (
          <MarkAsCompleted todo={todo} fetchTodos={fetchTodos} />
        ) : (
          <MarkAsNotCompleted todo={todo} fetchTodos={fetchTodos} />
        ),
      ]}
    >
      <List.Item.Meta title={todo.title} description={todo.description} />
    </List.Item>
  );
};

export default TodoItem;
