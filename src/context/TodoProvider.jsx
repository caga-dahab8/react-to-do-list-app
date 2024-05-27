import React, { createContext, useReducer, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const initialState = {
  todos: [],
  filter: 'all', // all, completed, incomplete
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }],
      };
      case 'EDIT_TODO':
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
          ),
        };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

// Create Context
export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [storedState, setStoredState] = useLocalStorage('todoState', initialState);

  const [state, dispatch] = useReducer(todoReducer, storedState);

  useEffect(() => {
    setStoredState(state);
  }, [state, setStoredState]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);

export default TodoContext;
