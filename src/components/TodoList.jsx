import React from 'react';
import { List, Button, Input, Spin } from 'antd';
import useTodos from '../hooks/useTodos';
import useAddTodo from '../hooks/useAddTodo';
import useFilterTodos from '../hooks/useFilterTodo';
import TodoItem from './TodoItem';
import AddTodoModal from './Modals/AddTodoModal';

const TodoList = () => {
  const { todos, loading, fetchTodos } = useTodos();
  const { isAdding, newTodo, setIsAdding, setNewTodo, handleAddSubmit } = useAddTodo(fetchTodos);
  const { searchTerm, handleSearchChange, handleShowCompleted, handleShowNonCompleted, handleShowAll, filteredTodos } = useFilterTodos(todos);

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <Button type="primary" onClick={() => setIsAdding(true)} style={{ marginBottom: "10px" }}>
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
      <AddTodoModal
        isAdding={isAdding}
        newTodo={newTodo}
        setIsAdding={setIsAdding}
        setNewTodo={setNewTodo}
        handleAddSubmit={handleAddSubmit}
      />
    </div>
  );
};

export default TodoList;