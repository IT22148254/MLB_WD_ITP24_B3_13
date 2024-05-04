import React, { Component } from 'react';
import Payment from  '../../../backend/server' // assuming the payment component file is called Payment.js

class Price extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 5000, // assuming the default amount is 7000
    };
  }

  render() {
    return (
      <div>
        <h2>Price: ${this.state.amount / 100}</h2>
        <Payment amount={this.state.amount} />
      </div>
    );
  }
}

export default Price;
