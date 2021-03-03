import React, { Component } from "react";
import PropTypes from "prop-types";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.name || !this.state.number) {
      return;
    }
    this.props.onSubmitData({ ...this.state });
    this.reset();
  };
  reset() {
    this.setState({
      name: "",
      number: "",
    });
  }

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Name</h2>
        <input
          type="text"
          value={name}
          name="name"
          onChange={this.handleChange}
        />
        <h2>Number</h2>
        <input
          type="text"
          name="number"
          value={number}
          onChange={this.handleChange}
        />
        <p></p>
        <button type="submit"> Add new contact </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmitData: PropTypes.func.isRequired,
};

export default ContactForm;
