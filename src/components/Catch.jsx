import React, { Component } from "react";
import "../App.css";
import ml5 from "ml5";

export default class Catch extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <h2>Catch Magikarp!!</h2>
        </header>

        <img
          src="https://media.giphy.com/media/2MxHTqM1vEFfG/giphy.gif"
          width="480"
          height="360"
          onClick={this.props.levelup}
        />
      </div>
    );
  }
}
