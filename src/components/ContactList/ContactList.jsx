import { useSelector } from 'react-redux';

import Notification from 'components/ui/Notification';
import { List } from './ContactList.styled';

import { getContacts, getContactsFilter } from 'redux/contacts';
import sanitizeString from 'utils/sanitizeString';
import ContactListItem from './ContactListItem';

function ContactList() {
  const contactList = useSelector(getContacts);
  const filter = useSelector(getContactsFilter);
  const filteredContactList = contactList.filter(item =>
    sanitizeString(item.name).includes(filter)
  );

  return (
    <>
      {filteredContactList.length > 0 ? (
        <List>
          {filteredContactList.reverse().map(contact => (
            <ContactListItem key={contact.id} {...contact} />
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

export default ContactList;
