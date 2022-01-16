import React from "react";
import { Link } from "react-router-dom";
import img from "../images/user.png";
export default function ContactCard(props) {
  const { contact } = props;
  return (
    <div className="item">
      <img className="ui avatar image" src={img} />
      <div className="content">
        {/* <Link to={`/contact/${contact.id}`}> */}
        {/* from this link itself we are setting the path with id which was setted by router and also we are sending props like name
        we can access the props using props.locatio.state.contact*/}
        <Link
          to={{
            pathname: `/contact/${contact.id}`,
            state: { contact: props.contact },
          }}
        >
          <div className="header">{contact.name}</div>
          <div>{contact.email}</div>
        </Link>
        <i
          style={{ color: "red", marginTop: "7px" }}
          className="trash alternate outline icon"
          onClick={() => props.clickHandler(contact.id)}
        ></i>
        <Link
          to={{
            pathname: `edit`,
            state: { contact: props.contact },
          }}
        >
          <i
            style={{ color: "blue", marginLeft: "7px" }}
            className="edit alternate outline icon"
          ></i>
        </Link>
      </div>
    </div>
  );
}
