import React, { Component } from "react";
import "../App.css";
import ml5 from "ml5";

import { connect } from "react-redux";
import {
  levelUp,
  setClassifier,
  setPrediction,
  clearPrediction
} from "../redux/actions";

export class Gyarados extends Component {
  classifyVideo = () => {
    const modelReady = () => {
      classfyVideoConstant();
    };

    this.props.setClassifier(
      ml5.imageClassifier("MobileNet", this.props.video, modelReady)
    );

    const classfyVideoConstant = () => {
      this.props.classifier.predict(this.props.video, gotResults);
    };

    const gotResults = (err, results) => {
      if (err) {
        console.log(err);
      } else {
        // the results is an arry and have three possible classification
        this.props.setPrediction(results);
        this.recursiveClassify(classfyVideoConstant);
      }
    };
  };

  recursiveClassify = callback => {
    setTimeout(callback, 2000);
  };

  // componentDidMount() {
  componentDidUpdate(prevProps) {
    if (
      this.props.videoStatus !== prevProps.videoStatus &&
      this.props.videoStatus === true
    ) {
      setTimeout(() => this.classifyVideo(), 3000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.recursiveClassify);
    this.recursiveClassify = () => this.props.clearPrediction();
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
          onClick={this.props.levelUp}
          alt="gyarados"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    classifier: state.classifier,
    video: state.video,
    predictions: state.predictions,
    videoStatus: state.videoStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    levelUp: () => {
      dispatch(levelUp());
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
)(Gyarados);
