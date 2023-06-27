import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addTodo, removeTodo } from '../store/todosReducer';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const todos = useSelector((state) => state.todos.items);
  const dispatch = useDispatch();

  const onButtonClick = () => {
    if (newTodo.trim() !== '') {
      dispatch(
        addTodo({
          id: new Date().getTime(),
          text: newTodo,
        })
      );
      setNewTodo('');
    }
  };

  const onRemoveClick = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <div>
      <h4>TodoList</h4>
      <input
        type="text"
        onChange={(e) => setNewTodo(e.target.value)}
        value={newTodo}
      />
      <button onClick={onButtonClick}>Добавить</button>
      <br />
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.text} <button onClick={() => onRemoveClick(t.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

