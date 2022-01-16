import React, { useDebugValue } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";
import { useRef } from "react";

const ContactList = (props) => {
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };
  const inputEl = useRef();
  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        key={contact.id}
        contact={contact}
        clickHandler={deleteContactHandler}
      />
    );
  });

  return (
    <div className="ui celled list">
      <h2>Contact List </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputEl}
            value={props.term}
            onChange={getSearchTerm}
            type="text"
            placeholder="search contacts"
            className="prompt"
          />
          <i className="search" />
        </div>
      </div>

      {renderContactList.length > 0 ? (
        renderContactList
      ) : (
        <div>no contacts matched</div>
      )}
      <Link to="/add">
        <button className="ui button blue">AddContact</button>
      </Link>
    </div>
  );
};

export default ContactList;
