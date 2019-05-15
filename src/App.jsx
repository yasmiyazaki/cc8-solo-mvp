import React, { Component } from "react";
import "./App.css";

import Webcam from "react-webcam";

import Magikarp from "./components/Magikarp";
import Gyarados from "./components/Gyarados";
import Catch from "./components/Catch";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class App extends Component {
  state = {
    video: "",
    magikarp: "NONE",
    level: {
      NONE: "No Pokemon",
      ONE: "Magikarp",
      TWO: "Gyarados"
    },
    predictions: []
  };

  setPrediction = results => {
    this.setState({ predictions: results });
  };

  levelup = () => {
    switch (this.state.magikarp) {
      case "NONE":
        this.setState({ magikarp: "ONE" });
        break;
      case "ONE":
        this.setState({ magikarp: "TWO" });
        break;
      default:
        this.setState({ magikarp: "NONE" });
        break;
    }
  };
  componentDidMount() {
    // [0] is necessary because of className being array
    const video = document.getElementsByClassName("videoID")[0];
    this.setState({ video });
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
            <h1>Welcome To Magikarp Machine Learning</h1>
            <h2>Your have {this.state.level[this.state.magikarp]}</h2>
          </header>

          {this.state.magikarp === "NONE" && <Catch levelup={this.levelup} />}
          {this.state.magikarp === "ONE" && (
            <Magikarp
              levelup={this.levelup}
              setPrediction={this.setPrediction}
              trained={this.state.predictions.length}
              video={this.state.video}
            />
          )}
          {this.state.magikarp === "TWO" && (
            <Gyarados
              levelup={this.levelup}
              setPrediction={this.setPrediction}
              video={this.state.video}
            />
          )}
        </div>
        <div className="column Two">
          <h3>Predictions</h3>
          <Paper id="prediction-table">
            <Table>
              <TableBody>
                {this.state.predictions.length > 0 ? (
                  this.state.predictions.map(prediction => (
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
          <Webcam className="videoID" />
        </div>
      </div>
    );
  }
}

export default App;
