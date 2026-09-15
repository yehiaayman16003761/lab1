// api/todos.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/todos'
});

export const fetchTodos = (filter) => {
  const params = {};
  if (filter === 'active') params.done = false;
  if (filter === 'done') params.done = true;
  // 'all' or undefined -> no params, server returns everything

  return api.get('/', { params }).then(res => res.data);
};

export const createTodo = (title) =>
  api.post('/', { title }).then(res => res.data);

export const updateTodo = (id, updates) =>
  api.put(`/${id}`, updates).then(res => res.data);

export const deleteTodo = (id) =>
  api.delete(`/${id}`).then(res => res.data);
