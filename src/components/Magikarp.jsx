import React, { Component } from "react";

export default class Magikarp extends Component {
  render() {
    return (
      <div>
        <h3>Predictions</h3>
        {this.props.predictions.map(prediction => (
          <div>{prediction.label}</div>
        ))}
        <h3>Remember</h3>
        <form>
          <input />
          <button />
        </form>

        <div>
          <button>Evolve</button>
        </div>
      </div>
    );
  }
}
