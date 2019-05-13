import React, { Component } from "react";
import "./App.css";
import ml5 from "ml5";
import Webcam from "react-webcam";

import NavBar from "./components/Navbar";
import Magikarp from "./components/Magikarp";

import Grid from "@material-ui/core/Grid";

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
            <Magikarp predictions={this.state.predictions} />
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
