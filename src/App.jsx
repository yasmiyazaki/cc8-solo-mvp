import React, { Component } from "react";
import "./App.css";
import ml5 from "ml5";
import Webcam from "react-webcam";

import Magikarp from "./components/Magikarp";

class App extends Component {
  state = {
    predictions: [],
    classifier: "",
    label: ""
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
        this.setState({ label: results[0].label });
        classfyVideoConstant();
      }
    };
  };

  componentDidMount() {
    this.classifyVideo();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Magikarp Machine Learning App</h1>
        </header>
        <Webcam className="videoID" />
        <div>{this.state.label}</div>
        <Magikarp />
      </div>
    );
  }
}

export default App;
