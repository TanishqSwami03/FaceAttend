import api from './axios';

export const getAllStudents = async () => {
  const res = await api.get('/students/');
  return res.data;
};

export const addStudent = async (data) => {
  const res = await api.post('/students/', data);
  return res.data;
};