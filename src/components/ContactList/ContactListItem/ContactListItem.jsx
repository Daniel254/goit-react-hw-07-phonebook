import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoadingStatus, removeContact } from 'redux/contacts';
import { DeleteBtn, ListItem } from './ContactListItem.styled';

export default function ContactListItem({ id, name, phone }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadingStatus);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteContactHandler = () => {
    dispatch(removeContact(id));
    setIsDeleting(true);
  };

  useEffect(() => {
    !isLoading && setIsDeleting(false);
  }, [isLoading]);

  return (
    <ListItem>
      {name}: <br />
      {phone}
      <DeleteBtn onClick={deleteContactHandler} disabled={isDeleting}>
        {isDeleting ? '...' : 'Delete'}
      </DeleteBtn>
    </ListItem>
  );
}
