import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { getAllContacts } from 'redux/contacts';

import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import SearchContact from 'components/SearchContact';
import Box from 'components/ui/Box';
import Container from 'components/ui/Container';
import Section from 'components/ui/Section';

import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from 'styles/GlobalStyle';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);
  return (
    <>
      <GlobalStyle />
      <Container>
        <Box as="h1" mx="auto">
          Phonebook
        </Box>
        <ContactForm />
        <Section mt="10px">
          <Box as="h2">Contacts</Box>
          <SearchContact />
          <ContactList />
        </Section>
      </Container>
      <ToastContainer position="top-center" hideProgressBar={true} />
    </>
  );
}
