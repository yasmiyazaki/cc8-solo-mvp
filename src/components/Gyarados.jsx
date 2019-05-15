import React, { Component } from "react";
import "../App.css";
import ml5 from "ml5";

export default class Gyarados extends Component {
  classifyVideo = () => {
    const modelReady = () => {
      classfyVideoConstant();
    };

    const classifier = ml5.imageClassifier(
      "MobileNet",
      this.props.video,
      modelReady
    );

    const classfyVideoConstant = () => {
      classifier.predict(this.props.video, gotResults);
    };

    const gotResults = (err, results) => {
      if (err) {
        console.log(err);
      } else {
        // the results is an arry and have three possible classification
        this.props.setPrediction(results);
        setTimeout(classfyVideoConstant, 2000);
      }
    };
  };

  componentDidMount() {
    this.classifyVideo();
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h2>I can classify 1000 things!</h2>
        </header>

        <img
          src="https://media.giphy.com/media/eydmTJPFi6KGc/giphy.gif"
          className="gif"
          onClick={this.props.levelup}
          alt="gyarados"
        />
      </div>
    );
  }
}
