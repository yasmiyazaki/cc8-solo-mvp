import React, { Component } from "react";
import "../App.css";

export default class Magikarp extends Component {
  render() {
    return (
      <div>
        <h3>Predictions</h3>
        {this.props.predictions.length > 0 &&
          this.props.predictions.map(prediction => (
            <div key={prediction.label}>{prediction.label}</div>
          ))}
        <h3>Remember</h3>
        <form>
          <input
            name="textToRemember"
            type="text"
            id="rememberText"
            onChange={this.props.remember}
          />
          <button id="rememberThis" onClick={this.props.rememberTextAndImage}>
            Click 10 times to remember
          </button>
          <button id="train" onClick={this.props.train}>
            Train Magikarp!
          </button>
        </form>

        <div>
          <iframe
            src="https://giphy.com/embed/RqbS66AuyXOMg"
            frameBorder="0"
            className="magikarp-gif"
            allowFullScreen
            title="magikarp"
          />
          <button>Evolve</button>
        </div>
        <div>
          <iframe
            src="https://giphy.com/embed/qSLPnBoL01f4Q"
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen
            title="gyarados"
          />
        </div>
      </div>
    );
  }
}
