import Header from "./Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditContact from "./EditContact";

import api from "../api/contacts";

import ContactDetails from "./ContactDetails";
function App() {
  const [contacts, setContacts] = useState([]);
  const LOCAL_STORAGE_KEY = "contacts";

  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const addContactHandler = async (contact) => {
    const request = {
      name: contact.name,
      id: Date.now(),
      email: contact.email,
    };

    const response = await api.post("/contacts", request);

    setContacts([
      ...contacts,
      {
        name: contact.name,
        id: Date.now(),
        email: contact.email,
      },
    ]);
    console.log(response.data);
    // setContacts(response.data);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  };
  const updateContactHandler = (contact1) => {
    const newContactList = contacts.map((contact) => {
      if (contact.id == contact1.id) return contact1;
      return contact;
    });
    setContacts(newContactList);
  };
  const searchHandler = (searchterm) => {
    setSearchTerm(searchterm);
    console.log(searchterm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else setSearchResults(contacts);
  };

  const retriveContacts = async () => {
    console.log("trying to get the data");
    const response = await api.get("/contacts");
    return response.data;
  };
  useEffect(() => {
    const retriveContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
    setContacts(JSON.parse(retriveContacts));

    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      console.log("got the data");
      console.log(allContacts);
      // setContacts(contacts);
    };
    // getAllContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route
            path="/add"
            exact
            // component={() => (
            //   <AddContact addContactHandler={addContactHandler} />
            // )}
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                // contacts={contacts}
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                term={searchTerm}
                searchKeyword={searchHandler}
                getContactId={removeContactHandler}
              />
            )}
          />
          {/* <AddContact addContactHandler={addContactHandler} /> */}
          {/* <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
          <Route
            path="/contact/:id"
            exact
            render={(props) => <ContactDetails {...props} />}
          />
          <Route
            path="/edit"
            exact
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
