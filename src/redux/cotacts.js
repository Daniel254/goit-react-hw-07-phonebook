import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  addContactError,
  addContactRequest,
  addContactSuccess,
  removeContactRequest,
  removeContactSuccess,
} from './contact/contactActions';

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
    addContacts(state, action) {
      state.items.push(...action.payload.contacts);
    },
    removeContact(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    setContactFilter(state, action) {
      state.filter = action.payload.filter;
    },
  },
  extraReducers: {
    [addContactRequest]: state => {
      state.isLoading = true;
      console.log('addContactRequestReducer called');
    },
    [addContactSuccess]: (state, { payload }) => {
      console.log('addContactSuccessReducer called');
      state.isLoading = false;
      state.items = [...state.items, payload];
    },
    [addContactError]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [removeContactRequest]: state => {
      state.isLoading = true;
    },
    [removeContactSuccess]: (state, { payload }) => {
      state.isLoading = false;
      state.items = state.items.filter(item => item.id !== payload.id);
    },
  },
});

const persistConfig = {
  key: 'clicks',
  storage,
  blacklist: ['filter'],
};

export const getContactsFilter = state => state.contacts.filter;
export const getContacts = state => state.contacts.items;

export default persistReducer(persistConfig, contactsSlice.reducer);
export const { addContacts, removeContact, setContactFilter } =
  contactsSlice.actions;
