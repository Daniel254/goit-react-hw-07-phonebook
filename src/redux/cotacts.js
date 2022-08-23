import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  addContact,
  getAllContacts,
  removeContact,
} from './contact/contactOperations';

const initialState = {
  items: [],
  filter: '',
  isLoading: false,
  error: null,
};

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
      state.error = payload;
    },
    [addContact.pending]: state => {
      state.isLoading = true;
    },
    [addContact.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.items.push(payload);
    },
    [addContact.rejected]: state => {
      state.isLoading = false;
    },
    [removeContact.pending]: (state, { payload }) => {
      // state.isLoading = true;
      state.error = payload;
    },
    [removeContact.fulfilled]: (state, { payload }) => {
      // state.isLoading = false;
      state.items = state.items.filter(item => item.id !== payload);
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
  blacklist: ['filter'],
};

export const getContactsFilter = state => state.contacts.filter;
export const getContacts = state => state.contacts.items;
export const getLoadingStatus = state => state.contacts.isLoading;

export default persistReducer(persistConfig, contactsSlice.reducer);
export const { setContactFilter } = contactsSlice.actions;
