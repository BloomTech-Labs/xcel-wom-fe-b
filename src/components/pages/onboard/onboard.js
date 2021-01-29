import React, { Component } from 'react';
import OtpInput from 'react-otp-input';

export default class onboard extends Component {
  state = { otp: '' };

  handleChange = otp => this.setState({ otp });

  clearOtp = () => {
    this.setState({ otp: '' });
  };

  handleCheck = e => {
    const { name } = e.target;
    this.setState(prevState => ({ [name]: !prevState[name] }));
  };

  handleSubmit = e => {
    e.preventDefault();
    alert(this.state.otp);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Enter Verification Code</p>
        <OtpInput
          value={this.state.otp}
          onChange={this.handleChange}
          numInputs={6}
          separator={<span>-</span>}
        />
        <button className="btnClear" type="button" onClick={this.clearOtp}>
          Clear
        </button>
        <button className="btnSubmit" type="button" onClick={this.Submit}>
          Submit
        </button>
      </form>
    );
  }
}
