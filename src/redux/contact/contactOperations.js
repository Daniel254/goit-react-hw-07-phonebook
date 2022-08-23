import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createContactApi,
  getAllContactsApi,
  removeContactApi,
} from 'services/mock-api';

export const removeContact = createAsyncThunk(
  'contacts/remove',
  async (id, thunkApi) => {
    try {
      return await removeContactApi(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getAllContacts = createAsyncThunk(
  'contacts/getAll',
  async (_, thunkApi) => {
    try {
      return await getAllContactsApi();
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async (contact, thunkApi) => {
    try {
      return await createContactApi(contact);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
