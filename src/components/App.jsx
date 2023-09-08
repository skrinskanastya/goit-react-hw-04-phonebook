import { ContactForm } from './ContactForm/ContactForm';
import { useEffect, useState } from 'react';
import { Filter } from './Filter';
import { ContactsList } from './ContactsList/ContactsList';
import { Layout } from './Layout';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedNames = localStorage.getItem('names');
    return savedNames ? JSON.parse(savedNames) : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedNames = localStorage.getItem('names');
    if (savedNames !== null) {
      setContacts(JSON.parse(savedNames));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('names', JSON.stringify(contacts));
  }, [contacts]);

  const updateContacts = newContact => {
    if (contacts.some(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const findContact = nameToFind => {
    setFilter(nameToFind);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Layout>
      <h1>Phonebook</h1>
      <ContactForm onUpdate={updateContacts} />
      <h2>Contacts</h2>
      <Filter filter={filter} onSearch={findContact} />
      <ContactsList
        filteredContacts={getFilteredContacts()}
        onDelete={deleteContact}
      />
    </Layout>
  );
};
