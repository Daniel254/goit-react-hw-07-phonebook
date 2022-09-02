import axios from 'axios';
import { BASE_URL } from 'constants/contactsApiConstants';

const instance = axios.create({
  baseURL: BASE_URL,
});

export const getAllContactsApi = async () => {
  const response = await instance.get('/contacts');
  return response.data;
};

export const createContactApi = async contact => {
  const response = await instance.post('/contacts', contact);
  return response.data;
};

export const removeContactApi = async id => {
  const response = await instance.delete(`/contacts/${id}`);
  return response.data;
};
