import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  createContactApi,
  getAllContactsApi,
  removeContactApi,
} from 'services/mock-api';

const initialState = {
  items: [],
  filter: '',
  isLoading: false,
  error: null,
};

// Async actions
export const removeContact = createAsyncThunk(
  'contacts/remove',
  async (id, thunkApi) => {
    try {
      return await removeContactApi(id);
    } catch (error) {
      toast(error.message, { type: 'error' });
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
      toast(error.message, { type: 'error' });
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContactFilter(state, action) {
      state.filter = action.payload.filter;
    },
  },
  extraReducers: {
    [getAllContacts.pending]: state => {
      // state.isLoading = true;
    },
    [getAllContacts.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      state.items = payload;
    },
    [getAllContacts.rejected]: (state, { payload }) => {
      // state.isLoading = false;
    },
    [addContact.pending]: state => {
      state.isLoading = true;
    },
    [addContact.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.items = payload;
    },
    [addContact.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
    [removeContact.pending]: state => {
      state.isLoading = true;
    },
    [removeContact.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.items = payload;
    },
    [removeContact.rejected]: state => {
      state.isLoading = false;
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
  blacklist: ['filter'],
};

// Contacts selectors
export const getContactsFilter = state => state.contacts.filter;
export const getContacts = state => state.contacts.items;
export const getLoadingStatus = state => state.contacts.isLoading;

// Contacts redusers
export default persistReducer(persistConfig, contactsSlice.reducer);

// Contacts actions
export const { setContactFilter } = contactsSlice.actions;
