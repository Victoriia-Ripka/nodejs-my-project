// підключення власного модуля контакти і модуля командер
const contacts = require('./contacts')
const { Command } = require("commander");
const program = new Command();

// додаємо всі можливі варіанти значення параметрів з термінала
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

// ініціалізація аргументів  
program.parse(process.argv);
const argv = program.opts();

// функція приймає параметри з консолі та виконує потрібну дію
const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
      //обробка дії "список" і вивід в термінал списку контактів
    case "list":
        const result = await contacts.listContacts()
        console.log(result)
        break;
        //обробка дії "обрати" і вивід в термінал результату
    case "get":
        const contact = await contacts.getContactById(id)
        console.log(contact)
        break;
        //обробка дії додавання і вивід в термінал доданого контакту
    case "add":
          const newContact = await contacts.addContact({ name, email, phone })
        console.log(newContact)
          break;
        // обробка дії видалення і вивід в термінал видаленого коньакту
    case "remove":
          const contactDeleted = await contacts.removeContact(id)
          console.log(contactDeleted)
      break;
        //обробка всіх лівих екшенів
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

//виклик функції при запуску додатку
invokeAction(argv);