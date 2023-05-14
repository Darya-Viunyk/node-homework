/** @format */
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");
// console.log(contactsPath);

class FileOperishins {
  constructor(contactsPath) {
    this.contactsPath = contactsPath;
  }

  async writeContacts(data) {
    try {
      return await fs.writeFile(
        this.contactsPath,
        JSON.stringify(data, null, 2)
      );
    } catch (error) {
      console.log(error.message);
    }
  }
  async listContacts() {
    console.log("read file contacts.json");
    return await fs.promises
      .readFile(this.contactsPath, "utf8")
      .then(JSON.parse)
      .catch(console.error);
  }
  async getContactById(contactId) {
    try {
      const contacts = await this.listContacts();
      const contact = contacts.find((contact) => {
        return contact.id === contactId;
      });
      return contact;
    } catch (error) {
      console.log(error.message);
    }
  }
  async addContact(data) {
    try {
      const list = await this.listContacts();
      const obj = JSON.parse(list);

      const newArray = [...obj, data];
      await fs.writeFile(this.contactsPath, JSON.stringify(newArray, null, 2));
    } catch (error) {
      console.log(error.message);
    }
  }
  async removeContact(contactId) {
    const contactIndex = data.findIndex((item) => {
      return item.id === contactId;
    });
    if (contactIndex === -1) return false;
    const contact = data[contactIndex];
    data.splice(contactIndex, 1);
    try {
      await fs.unlink(this.contactsPath);
      return contact;
    } catch (error) {
      console.log(error.message);
    }
  }
}
const file = new FileOperishins(contactsPath);

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
