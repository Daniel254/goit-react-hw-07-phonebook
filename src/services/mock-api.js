import axios from 'axios';
import { BASE_URL } from 'constants/contactsApiConstants';

const instance = axios.create({
  baseURL: BASE_URL,
});

export const getAllContactsApi = async () => {
  const response = await instance.get('/contacts');
  return response.data.map(item => ({
    id: item.id,
    name: item.name,
    number: item.phone,
  }));
};

export const createContactApi = async contact => {
  const response = await instance.post('/contacts', {
    name: contact.name,
    phone: contact.number,
  });
  return {
    id: response.data.id,
    name: response.data.name,
    number: response.data.phone,
  };
};

export const removeContactApi = async id => {
  const response = await instance.delete(`/contacts/${id}`);
  return response.data.id;
};
