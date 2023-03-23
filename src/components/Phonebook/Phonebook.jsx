import { useState, useEffect } from 'react';
import contactsData from '../contactsData.json';
import ContactsList from '../ContactsList/ContactsList';
import Filter from '../Filter/Filter';
import Form from '../Form/Form';
import { nanoid } from 'nanoid';
import css from '../Phonebook/Phonebook.module.css';

const Phonebook = () => {
  const localContacts = JSON.parse(localStorage.getItem('contacts'));
  const contactsDataObj = contactsData.map(contact => {
    contact.id = nanoid();
    return contact;
  });

  const [contacts, setContacts] = useState(
    () => localContacts ?? contactsDataObj
  );
  const [filter, setFilter] = useState('');

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSubmit = FormData => {
    const newContact = {
      id: nanoid(),
      name: FormData.name,
      number: FormData.number,
    };

    contacts.find(
      contact => contact.name.toLowerCase() === FormData.name.toLowerCase()
    )
      ? alert(`${FormData.name} is already in contacts`)
      : setContacts(prevState => [newContact, ...prevState]);
  };

  const onFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(normalizedFilter);
  });

  return (
    <>
      <div className={css.wrap}>
        <Form onSubmit={onSubmit} />
        <Filter
          onFilter={onFilter}
          type="text"
          value={filter}
          name="filter"
          title=""
          pattern=""
        />
        <ContactsList
          title="Contacts"
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </div>
    </>
  );
};
export default Phonebook;
