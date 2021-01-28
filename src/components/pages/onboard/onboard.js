import React, { Component } from 'react';
import OtpInput from 'react-otp-input';

export default class onboard extends Component {
  state = { otp: '' };

  handleChange = otp => this.setState({ otp });

/*   clearOtp = () => {
    this.setState({ otp: '' });
  };

  handleCheck = e => {
    const { name } = e.target;
    this.setState(prevState => ({ [name]: !prevState[name] }));
  };

  handleSubmit = e => {
    e.preventDefault();
    alert(this.state.otp);
  }; */

  render() {
    return (
      <div className="container">
        <div className="view">
          <div className="card">
            <form onSubmit={this.handleSubmit}>
              <p>Enter Verification Code</p>
              <OtpInput
                value={this.state.otp}
                onChange={this.handleChange}
                numInputs={6}
                separator={<span>-</span>}
              />
              <div className="margin-top--small">
              </div>
              <div className="btn-row">
                <button
                  className="btn margin-top--large"
                  type="button"
                  disabled={isDisabled || otp.trim() === ''}
                  onClick={this.clearOtp}
                >
                  Clear
                </button>
                <button
                  className="btn margin-top--large"
                  disabled={otp.length < numInputs}
                >
                  Get OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

