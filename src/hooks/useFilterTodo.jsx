import { useState } from 'react';

const useFilterTodos = (todos) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [showAll, setShowAll] = useState(true);

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

  const filteredTodos =
    todos
      .filter((todo) => (showAll ? true : (showCompleted ? todo.completed : !todo.completed)))
      .filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return {
    searchTerm,
    showCompleted,
    showAll,
    handleSearchChange,
    handleShowCompleted,
    handleShowNonCompleted,
    handleShowAll,
    filteredTodos
  };
};

export default useFilterTodos;