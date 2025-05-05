import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/todos';

export const getTodos = async () => {
  const res = await axios.get(API_BASE_URL);
  return res.data;
};

export const addTodo = async (todo) => {
  const res = await axios.post(API_BASE_URL, todo);
  return res.data;
};

export const deleteTodo = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/${id}`);
  return res.data;
};

export const updateTodo = async (id, updatedData) => {
  const res = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
  return res.data;
};
