import React, { useDebugValue } from "react";

export default class EditContact extends React.Component {
  constructor(props) {
    super(props);
    const { id, name, email } = props.location.state.contact;
    this.state = {
      name,
      id,
      email,
    };
  }

  update = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("fields shoudl not be empty");
      return;
    }
    this.props.updateContactHandler(this.state);
    this.setState({ name: "", email: "" });
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="ui main">
        <h1>Edit Contact</h1>
        <form className="ui form" onSubmit={(e) => this.update(e)}>
          <div className="field">
            <label>Name</label>
            <input
              onChange={(e) => this.setState({ name: e.target.value })}
              type="text"
              value={this.state.name}
              placeholder="name"
            />
            <label>Email</label>
            <input
              onChange={(e) => this.setState({ email: e.target.value })}
              type="text"
              value={this.state.email}
              placeholder="Email"
            />
          </div>
          <button className="ui button blue">Add</button>
        </form>
      </div>
    );
  }
}
