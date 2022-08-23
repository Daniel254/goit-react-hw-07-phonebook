import axios from 'axios';
import { BASE_URL } from 'constants/contactsApiConstants';

const instance = axios.create({
  baseURL: BASE_URL,
});

//Read All
export const getAllContacts = () =>
  instance.get({
    url: '/contacts',
  });

//Create
export const createContactApi = async contact => {
  const post = await instance.post('/contacts', contact);
  return post.data;
};
//Delete
export const removeContactApi = async id => {
  const del = await instance.delete(`/contacts/${id}`);
  return del.data.id;
};
