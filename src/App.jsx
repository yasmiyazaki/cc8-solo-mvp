import React, { Component } from "react";
import "./App.css";
import ml5 from "ml5";
import Webcam from "react-webcam";

import NavBar from "./components/Navbar";
import Magikarp from "./components/Magikarp";

import Grid from "@material-ui/core/Grid";

class App extends Component {
  state = {
    video: "",
    predictions: "",
    classifier: "",
    label: "",
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
      <div className="App">
        <NavBar />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
        <header className="App-header">
          <h2>I will forget everything every 1 min</h2>
        </header>
        <Grid container spacing={24}>
          <Grid item lg={6} sm={3}>
            <Magikarp
              predictions={this.state.predictions}
              remember={this.textToRemember}
              rememberTextAndImage={this.rememberTextAndImage}
              train={this.trainImage}
            />
          </Grid>
          <Grid item lg={6} sm={3}>
            <Webcam className="videoID" />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
