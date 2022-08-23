import { createContactApi, removeContactApi } from 'services/mock-api';
import {
  addContactError,
  addContactRequest,
  addContactSuccess,
  removeContactError,
  removeContactRequest,
  removeContactSuccess,
} from './contactActions';

export const addContactsOperation = contact => (dispatch, getState) => {
  dispatch(addContactRequest());
  createContactApi(contact)
    .then(newContact => {
      dispatch(addContactSuccess(newContact));
    })
    .catch(({ message }) => dispatch(addContactError(message)));
};

export const removeContactOperation = id => dispatch => {
  dispatch(removeContactRequest());
  removeContactApi(id)
    .then(removedId => {
      dispatch(removeContactSuccess({ id }));
    })
    .catch(({ message }) => {
      dispatch(removeContactError(message));
    });
};

// export const getContacts = createAsyncThunk('contacts/getAll', async () =>{

// });
