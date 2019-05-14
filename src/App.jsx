import React, { Component } from "react";
import "./App.css";

import Webcam from "react-webcam";

import NavBar from "./components/Navbar";
import Magikarp from "./components/Magikarp";
import Gyarados from "./components/Gyarados";
import Catch from "./components/Catch";

import Grid from "@material-ui/core/Grid";

class App extends Component {
  state = {
    magikarp: "NONE",
    level: {
      NONE: "No Pokemon",
      ONE: "Magikarp",
      TWO: "Gyarados"
    }
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

  render() {
    return (
      <div className="App">
        <NavBar />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
        <header className="App-header">
          <h2>Your Status: {this.state.level[this.state.magikarp]}</h2>
        </header>
        <Grid container spacing={24}>
          <Grid item lg={6} sm={3}>
            {this.state.magikarp === "NONE" && <Catch levelup={this.levelup} />}
            {this.state.magikarp === "ONE" && (
              <Magikarp levelup={this.levelup} />
            )}
            {this.state.magikarp === "TWO" && (
              <Gyarados levelup={this.levelup} />
            )}
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
