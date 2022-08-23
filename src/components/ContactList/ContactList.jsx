import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Notification from 'components/Notification';
import { DeleteBtn, List } from './ContactList.styled';

import { useEffect } from 'react';
import { getAllContacts, removeContact } from 'redux/contact/contactOperations';
import { getContacts, getContactsFilter } from 'redux/cotacts';
import sanitizeString from 'utils/sanitizeString';

function ContactList() {
  const dispatch = useDispatch();
  const contactList = useSelector(getContacts);
  const filter = useSelector(getContactsFilter);
  const filteredContactList = contactList.filter(item =>
    sanitizeString(item.name).includes(filter)
  );

  const deleteContactHandler = id => {
    dispatch(removeContact(id));
  };

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  return (
    <>
      {filteredContactList.length > 0 ? (
        <List>
          {filteredContactList.reverse().map(({ id, name, number }) => (
            <li key={id}>
              {name}: <br />
              {number}
              <DeleteBtn onClick={() => deleteContactHandler(id)}>
                Delete
              </DeleteBtn>
            </li>
          ))}
        </List>
      ) : contactList.length === 0 ? (
        <Notification message="Contact list is empty" />
      ) : (
        <Notification message="No contacts found" />
      )}
    </>
  );
}

ContactList.propTypes = {
  contactList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
};

export default ContactList;
