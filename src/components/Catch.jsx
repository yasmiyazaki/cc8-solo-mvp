import React, { Component } from "react";
import "../App.css";
import ml5 from "ml5";

export default class Catch extends Component {
  render() {
    return (
      <div className="catch">
        <h2>Catch Magikarp!!</h2>
        <p>To catch magikarp, click the image ⬇️</p>
        <img
          src="https://media.giphy.com/media/2MxHTqM1vEFfG/giphy.gif"
          onClick={this.props.levelup}
          className="gif levelOne"
        />
      </div>
    );
  }
}
