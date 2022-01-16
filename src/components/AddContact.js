import React, { useDebugValue } from "react";

export default class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("fields shoudl not be empty");
      return;
    }
    this.props.addContactHandler(this.state);
    console.log(this.props);
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="ui main">
        <h1>Add Contact</h1>
        <form className="ui form" onSubmit={(e) => this.add(e)}>
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
