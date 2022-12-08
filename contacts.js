const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.resolve('./db/contacts.json');

// TODO: задокументувати кожну функцію
const listContacts = async() =>  {
  const result = await fs.readFile(contactsPath)
  return result.toString()
}

const getContactById = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath))
  const contact = contacts.find(contact => contact.id === contactId)
  return contact
}

const removeContact = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath))
  const index = contacts.findIndex(item => item.id === contactId)
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}

const addContact = async ({ name, email, phone }) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath))
  newId = parseInt(contacts[contacts.length-1].id) + 1
  const newContact = {
    id: newId.toString(),
    name,
    email,
    phone
  }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact;
} 

module.exports = {
    listContacts, getContactById, removeContact, addContact,
}
