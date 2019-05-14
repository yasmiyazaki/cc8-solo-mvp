import React, { Component } from "react";
import "../App.css";
import ml5 from "ml5";

export default class Gyarados extends Component {
  state = {
    video: "",
    predictions: [],
    classifier: "",
    label: "",
    textToRemember: ""
  };

  classifyVideo = () => {
    // [0] is necessary because of className being array
    const video = document.getElementsByClassName("videoID")[0];

    const modelReady = () => {
      classfyVideoConstant();
    };
    const classifier = ml5.imageClassifier("MobileNet", video, modelReady);

    const classfyVideoConstant = () => {
      classifier.predict(video, gotResults);
    };

    const gotResults = (err, results) => {
      if (err) {
        console.log(err);
      } else {
        // the results is an arry and have three possible classification
        this.setState({ predictions: results });
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
        <h3>Predictions</h3>
        {this.state.predictions.map(prediction => (
          <div>{prediction.label}</div>
        ))}

        <img
          src="https://media.giphy.com/media/eydmTJPFi6KGc/giphy.gif"
          width="480"
          height="360"
          onClick={this.props.levelup}
          alt="gyarados"
        />
      </div>
    );
  }
}
