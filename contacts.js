const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.resolve('./db/contacts.json');
console.log(contactsPath)
// TODO: задокументувати кожну функцію
function listContacts() {
  fs.readFile(contactsPath)
  .then(data => console.log(data.toString()))
  .catch(err => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
      .then(data => {
          data.filter(contact => {
              if(contact.id === contactId) return contact
          })
      })
  .catch(err => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
      .then(data => {
          data.filter(contact => {
              if(contact.id === contactId) return contact
          })
      })
  .catch(err => console.log(err.message));
}

function addContact(name, email, phone) {
  // ...твій код
}

module.exports = {
    listContacts, getContactById, removeContact, addContact,
}