import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import Section from 'components/ui/Section';
import { Button, Input, InputError, LabelName } from './ContactForm.styled';

import { getContacts } from 'redux/contacts';

import { toast } from 'react-toastify';
import { addContact } from 'redux/contacts';
import sanitizeString from 'utils/sanitizeString';

function ContactForm() {
  const dispatch = useDispatch();
  const contactList = useSelector(getContacts);
  const schema = yup.object().shape({
    name: yup
      .string()
      .required()
      .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, {
        message:
          "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
      }),
    phone: yup
      .string()
      .required()
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
        {
          message:
            'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
        }
      ),
  });

  const checkExistingContactName = newContact =>
    contactList.find(
      contact =>
        sanitizeString(contact.name) === sanitizeString(newContact.name)
    );

  const submitHandler = (values, formik) => {
    try {
      if (checkExistingContactName(values)) {
        throw new Error(`${values.name} is already in contacts`);
      }
      dispatch(addContact(values));
      formik.resetForm();
    } catch (error) {
      toast(error.message, { type: 'error' });
    }
  };

  return (
    <Section>
      <Formik
        initialValues={{
          name: '',
          phone: '',
        }}
        onSubmit={submitHandler}
        validationSchema={schema}
      >
        <Form autoComplete="off">
          <LabelName>
            Name
            <Input name="name" type="text" />
          </LabelName>
          <InputError name="name" component="p" />

          <LabelName>
            Number
            <Input name="phone" type="tel" />
          </LabelName>
          <InputError name="phone" component="p" />

          <Button type="submit">Add contact</Button>
        </Form>
      </Formik>
    </Section>
  );
}

export default ContactForm;
