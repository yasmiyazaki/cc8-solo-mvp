import React, { Component } from "react";
import "../App.css";
import ml5 from "ml5";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { connect } from "react-redux";
import {
  levelUp,
  textToRemember,
  countMinusOne,
  resetCount,
  setClassifier,
  setPrediction,
  clearPrediction
} from "../redux/actions";

export class Magikarp extends Component {
  state = {
    commentOne: "I don't know anything.",
    commentTwo: "I remembered something!"
  };

  classifyVideo = () => {
    const modelReady = () => {
      this.classfyVideoConstant();
    };

    const mobilenet = ml5.featureExtractor("Mobilenet");
    this.props.setClassifier(
      mobilenet.classification(this.props.video, modelReady)
    );
  };

  classfyVideoConstant = () => {
    this.props.classifier.classify(this.gotResults);
  };

  whileTraining = loss => {
    if (loss === null) {
      // console.log("Training Complete");
      this.props.classifier.classify(this.gotResults);
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
      this.recursiveClassify(this.classfyVideoConstant);
    }
  };

  rememberTextAndImage = e => {
    e.preventDefault();
    this.props.classifier.addImage(this.props.text);
    this.props.countMinusOne();
  };

  trainImage = e => {
    e.preventDefault();
    this.props.classifier.train(this.whileTraining);
    this.props.resetCount();
  };

  recursiveClassify = callback => {
    setTimeout(callback, 2000);
  };

  componentDidMount() {
    this.classifyVideo();
  }

  componentWillUnmount() {
    clearTimeout(this.recursiveClassify);
    this.recursiveClassify = () => this.props.clearPrediction();
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h2>
            Magikarp:{" "}
            {this.props.predictions.length < 1
              ? this.state.commentOne
              : this.state.commentTwo}
          </h2>
        </header>

        <form>
          <TextField
            id="standard-name"
            label="What to remember?"
            onChange={this.props.textToRemember}
            margin="normal"
          />
          <div>
            {this.props.count > 0 ? (
              <Button
                variant="contained"
                id="rememberThis"
                onClick={this.rememberTextAndImage}
                color="primary"
                className="training-button"
              >
                Train {this.props.count} times!
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

        {this.props.predictions.length < 1 ? (
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
              onClick={this.props.levelUp}
              alt="magikarpevolve"
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    classifier: state.classifier,
    text: state.textToRemember,
    count: state.count,
    video: state.video,
    predictions: state.predictions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    levelUp: () => {
      dispatch(levelUp());
    },
    textToRemember: e => {
      dispatch(textToRemember(e));
    },
    countMinusOne: () => {
      dispatch(countMinusOne());
    },
    resetCount: () => {
      dispatch(resetCount());
    },
    setClassifier: classifier => {
      dispatch(setClassifier(classifier));
    },
    setPrediction: results => {
      dispatch(setPrediction(results));
    },
    clearPrediction: () => {
      dispatch(clearPrediction());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Magikarp);
