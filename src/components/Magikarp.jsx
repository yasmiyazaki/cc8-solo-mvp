import React, { Component } from "react";
import "../App.css";
import ml5 from "ml5";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class Magikarp extends Component {
  state = {
    classifier: "",
    textToRemember: "",
    count: 15,
    commentOne: "I don't know anything.",
    commentTwo: "I remembered something!"
  };

  classifyVideo = () => {
    const modelReady = () => {
      this.classfyVideoConstant();
    };

    const mobilenet = ml5.featureExtractor("Mobilenet");
    const classifier = mobilenet.classification(this.props.video, modelReady);
    this.setState({ classifier });
  };

  classfyVideoConstant = () => {
    this.state.classifier.classify(this.gotResults);
  };

  whileTraining = loss => {
    if (loss === null) {
      // console.log("Training Complete");
      this.state.classifier.classify(this.gotResults);
    }
    // this will print the process of training
    // else {
    //   console.log(loss);
    // }
  };

  gotResults = (err, results) => {
    if (err) {
      console.log(err);
    } else {
      // the results is an arry and have three possible classification
      this.props.setPrediction(results);
      setTimeout(this.classfyVideoConstant, 2000);
    }
  };

  textToRemember = event => {
    this.setState({ textToRemember: event.target.value });
  };

  rememberTextAndImage = e => {
    e.preventDefault();
    this.state.classifier.addImage(this.state.textToRemember);
    this.setState({ count: this.state.count - 1 });
  };

  trainImage = e => {
    e.preventDefault();
    this.state.classifier.train(this.whileTraining);
    this.setState({ count: 15 });
  };

  componentDidMount() {
    this.classifyVideo();
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h2>
            Magikarp:{" "}
            {this.props.trained < 1
              ? this.state.commentOne
              : this.state.commentTwo}
          </h2>
        </header>

        <form>
          <TextField
            id="standard-name"
            label="What to remember?"
            onChange={this.textToRemember}
            margin="normal"
          />
          <div>
            {this.state.count > 0 ? (
              <Button
                variant="contained"
                id="rememberThis"
                onClick={this.rememberTextAndImage}
                color="primary"
                className="training-button"
              >
                Train {this.state.count} times!
              </Button>
            ) : (
              <Button
                variant="contained"
                id="train"
                onClick={this.trainImage}
                className="training-button"
                color="secondary"
              >
                Train!
              </Button>
            )}
          </div>
        </form>

        {this.props.trained < 1 ? (
          <div>
            <img
              src="https://media.giphy.com/media/RqbS66AuyXOMg/giphy.gif"
              className="gif"
              alt="magikarp"
            />
          </div>
        ) : (
          <div>
            <img
              src="https://media.giphy.com/media/qSLPnBoL01f4Q/giphy.gif"
              className="gif"
              onClick={this.props.levelup}
              alt="magikarpevolve"
            />
          </div>
        )}
      </div>
    );
  }
}
