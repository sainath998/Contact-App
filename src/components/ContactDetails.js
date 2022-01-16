import React from "react";
import { Link } from "react-router-dom";
import img from "../images/user.png";
export default function ContactDetails(props) {
  const { name, email } = props.location.state.contact;
  console.log(props);
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={img} />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>

          <div className="center-div">
            <Link to="/">
              <button className="ui button blue">Back to Contact List</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
