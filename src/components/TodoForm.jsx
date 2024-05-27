import React, { useRef, useContext } from 'react';
import { TodoContext } from '../context/TodoProvider';
import "../App.css"

const TodoForm = () => {
  const { dispatch } = useContext(TodoContext);
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    if (value.trim()) {
      dispatch({ type: 'ADD_TODO', payload: value });
      inputRef.current.value = '';
    
    }
  };


  return (
    <form onSubmit={handleSubmit} className="flex">
      <input ref={inputRef} type="text" placeholder="Add a new todo" className="px-4 pr-4 border border-gray-300 rounded-lg mr-2 input"/>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">add</button>
    </form>
  );
};

export default TodoForm;
