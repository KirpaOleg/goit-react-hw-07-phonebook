import css from './ContactList.module.css';
import PropTypes from 'prop-types';
import './ContactList.module.css';
import { useSelector } from 'react-redux';
import { getFilter } from '../../redux/filterSlice';
import {
  useFetchContactsQuery,
  useDeleteContactMutation,
} from '../../redux/contactsSlice';

export const ContactList = () => {
  const filter = useSelector(getFilter);
  const { data: contacts, isFetching } = useFetchContactsQuery();
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  const findContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    if (contacts) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
  };

  const filteredContacts = findContacts();

  return (
    <>
      {isFetching && <p>Loading...</p>}
      {contacts && (
      <ul>
        {filteredContacts.length !== 0 ? (
          filteredContacts.map(({ name, id, phone }) => (
            <li key={id}>
              <div>
                <p>{name}: {phone}</p>
              </div>
              <button type="button" onClick={() => { deleteContact(id) }}>
                {isLoading ? '...' : 'Delete'}
              </button>
            </li>
          ))
        ) : (
          <li className={css.nocontacts}>No contacts found</li>
        )}
      </ul> 
      )}
    </>
  );
};

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func,
};