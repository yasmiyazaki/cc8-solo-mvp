import React, { Component } from "react";
import "./App.css";

import Webcam from "react-webcam";

import { connect } from "react-redux";
import { levelUp, setVideo, switchVideo } from "./redux/actions";

import Magikarp from "./components/Magikarp";
import Gyarados from "./components/Gyarados";
import Catch from "./components/Catch";
import OpenMenu from "./components/Menu";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export class App extends Component {
  state = {
    level: ["No Pokemon", "Magikarp", "Gyarados"]
  };
  componentDidMount() {
    // [0] is necessary because of className being array
    const video = document.getElementsByClassName("videoID")[0];
    this.props.setVideo(video);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.videoStatus !== prevProps.videoStatus &&
      this.props.videoStatus === true
    ) {
      const video = document.getElementsByClassName("videoID")[0];
      this.props.setVideo(video);
    }
  }

  render() {
    return (
      <div className="wrapper">
        <link
          href="https://fonts.googleapis.com/css?family=Carter+One"
          rel="stylesheet"
        />
        <div className="column One">
          <header className="App-header">
            <OpenMenu />
            <h1>Welcome To Magikarp Machine Learning</h1>
            <h2>Your have {this.state.level[this.props.currentLevel]}</h2>
          </header>
          {this.props.currentLevel === 0 && <Catch />}
          {this.props.currentLevel === 1 && <Magikarp />}
          {this.props.currentLevel === 2 && <Gyarados />}
        </div>
        <div className="column Two">
          <h3>Predictions</h3>
          <Paper id="prediction-table">
            <Table>
              <TableBody>
                {this.props.predictions.length > 0 ? (
                  this.props.predictions.map(prediction => (
                    <TableRow>
                      <TableCell key={prediction.label}>
                        {prediction.label}
                      </TableCell>
                      <TableCell key={prediction.confidence}>
                        {Math.round(prediction.confidence * 100)}%
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow />
                )}
              </TableBody>
            </Table>
          </Paper>
          <button onClick={this.props.switchVideo}>
            Switch {this.props.videoStatus ? "Off" : "On"} Video
          </button>
          {this.props.videoStatus === true && <Webcam className="videoID" />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    level: state.level,
    currentLevel: state.magikarp,
    predictions: state.predictions,
    videoStatus: state.videoStatus,
    video: state.video
  };
};

const mapDispatchToProps = dispatch => {
  return {
    levelUp: () => {
      dispatch(levelUp());
    },
    setVideo: video => {
      dispatch(setVideo(video));
    },
    switchVideo: () => {
      dispatch(switchVideo());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
