import React, { Component } from "react";
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";
import shortid from "shortid";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    if (localStorage.getItem("contacts")) {
      this.setState((prevState) => ({
        contacts: [...JSON.parse(localStorage.getItem("contacts"))],
      }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  changeFilter = (event) => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  onDeleteContact = (id) => {
    this.setState({
      contacts: this.state.contacts.filter((contact) => contact.id !== id),
    });
  };

  onSubmitData = (data) => {
    const { contacts } = this.state;

    const addContact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    const sameName = this.state.contacts.find(
      (contact) =>
        contact.name === addContact.name && contact.number === addContact.number
    );

    const sameNumber = this.state.contacts.find(
      (contact) => contact.number === addContact.number
    );

    if (sameName) {
      alert(`${addContact.name} is already in contacts!`);
      return;
    }

    if (sameNumber) {
      alert(`${addContact.number} is already in contacts!`);
      return;
    }

    this.setState({
      contacts: [...contacts, addContact],
    });
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <>
        <h1>Phonebook</h1>

        <ContactForm onSubmitData={this.onSubmitData} />
        {contacts.length !== 0 && (
          <>
            <h2>Contacts</h2>
            {contacts.length > 1 && (
              <Filter value={filter} onChangeFilter={this.changeFilter} />
            )}
            <ContactList
              contacts={this.filterContacts()}
              onDeleteContact={this.onDeleteContact}
            />
          </>
        )}
      </>
    );
  }
}

export default App;
