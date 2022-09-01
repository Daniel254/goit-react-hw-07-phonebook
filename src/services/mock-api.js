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
  await instance.post('/contacts', contact);
  return await getAllContactsApi();
};

export const removeContactApi = async id => {
  await instance.delete(`/contacts/${id}`);
  return await getAllContactsApi();
};
