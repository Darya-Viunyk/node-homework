/** @format */

const contactsModule = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsModule.listContacts();
      console.table(contacts);
      console.log(contacts);
      console.log("Hello table");
      break;

    case "get":
      {
        console.log("switch get item");
        const contact = await contactsModule.getContactById(id);
        console.table(contact);
      }
      break;

    case "add": {
      const contact = await contactsModule.addContact(name, email, phone);
      if (!contact)
        return console.log(
          "Contact has not been added. Please, complete name, email and phone"
        );
      console.log(`Contact with name: ${name} has been added.`);
      console.table(contact);
      break;
    }

    case "remove":
      const contact = await contactsModule.removeContact(id);
      if (!contact) return console.log(`Not found id: ${id}.`);
      console.log(`Contact with id: ${id} has been removed.`);
      console.table(contact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
