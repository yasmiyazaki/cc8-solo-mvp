import React, { Component } from "react";
import "../App.css";
import ml5 from "ml5";

export default class Magikarp extends Component {
  state = {
    video: "",
    predictions: [],
    classifier: "",
    textToRemember: ""
  };

  classifyVideo = () => {
    // [0] is necessary because of className being array
    const video = document.getElementsByClassName("videoID")[0];
    this.setState({ video });

    const modelReady = () => {
      this.classfyVideoConstant();
    };

    const mobilenet = ml5.featureExtractor("Mobilenet");
    const classifier = mobilenet.classification(video, modelReady);
    this.setState({ classifier });
  };

  classfyVideoConstant = () => {
    this.state.classifier.classify(this.gotResults);
  };

  whileTraining = loss => {
    if (loss === null) {
      console.log("Training Complete");
      this.state.classifier.classify(this.gotResults);
    } else {
      console.log(loss);
    }
  };

  gotResults = (err, results) => {
    if (err) {
      console.log(err);
    } else {
      // the results is an arry and have three possible classification
      console.log(results);
      this.setState({ predictions: results });
      setTimeout(this.classfyVideoConstant, 2000);
    }
  };

  textToRemember = event => {
    this.setState({ textToRemember: event.target.value });
  };

  rememberTextAndImage = e => {
    e.preventDefault();
    this.state.classifier.addImage(this.state.textToRemember);
  };

  trainImage = e => {
    e.preventDefault();
    this.state.classifier.train(this.whileTraining);
  };

  componentDidMount() {
    this.classifyVideo();
  }
  render() {
    return (
      <div>
        <header className="App-header">
          <h2>Magikarp: I don't know anything.</h2>
        </header>

        <h3>What Should I Remember ?</h3>
        <form>
          <input
            name="textToRemember"
            type="text"
            id="rememberText"
            onChange={this.textToRemember}
          />
          <button id="rememberThis" onClick={this.rememberTextAndImage}>
            Click 10 times to remember
          </button>
          <button id="train" onClick={this.trainImage}>
            Train Magikarp!
          </button>
        </form>

        <h3>Predictions</h3>
        {this.state.predictions.length > 0 &&
          this.state.predictions.map(prediction => (
            <div key={prediction.label}>{prediction.label}</div>
          ))}

        {this.state.predictions.length < 1 ? (
          <div>
            <img
              src="https://media.giphy.com/media/RqbS66AuyXOMg/giphy.gif"
              width="480"
              height="360"
              alt="magikarp"
            />
          </div>
        ) : (
          <div>
            <img
              src="https://media.giphy.com/media/qSLPnBoL01f4Q/giphy.gif"
              width="480"
              height="360"
              onClick={this.props.levelup}
              alt="magikarpevolve"
            />
          </div>
        )}
      </div>
    );
  }
}
