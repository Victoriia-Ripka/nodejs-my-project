const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.resolve('./db/contacts.json');

// зчитуємо всі дані з файлу
const listContacts = async() =>  {
  const result = await fs.readFile(contactsPath)
  return result.toString()
}

// зчитуємо всі дані з файлу і методом перебору масива шукаємо потріьний контакт
const getContactById = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath))
  const contact = contacts.find(contact => contact.id === contactId)
  return contact
}

// зчитуємо всі дані з файлу і методом перебору масива шукаємо потрібний контак
// якщо його не знайдено - повертаємо нал
// якщо знайдено - вирізаємо його з маисва і повертаємо
const removeContact = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath))
  const index = contacts.findIndex(item => item.id === contactId)
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}

// зчитуємо всі дані з файлу
// створюємо новий айдішник і об'єкт нового контакта
// додаємо його в масив і перезаписуємо файл
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
