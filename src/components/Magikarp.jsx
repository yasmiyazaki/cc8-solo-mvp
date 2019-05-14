import React, { Component } from "react";
import "../App.css";
import ml5 from "ml5";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

export default class Magikarp extends Component {
  state = {
    video: "",
    predictions: [],
    classifier: "",
    textToRemember: "",
    count: 15
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
    this.setState({ count: --this.state.count });
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
          <h2>Magikarp: I don't know anything.</h2>
        </header>

        <form>
          <TextField
            id="standard-name"
            label="What to remember?"
            onChange={this.textToRemember}
            margin="normal"
          />

          {this.state.count > 0 ? (
            <Button
              variant="contained"
              id="rememberThis"
              onClick={this.rememberTextAndImage}
              color="primary"
            >
              Train {this.state.count} times!
            </Button>
          ) : (
            <Button
              variant="contained"
              id="train"
              onClick={this.trainImage}
              color="secondary"
            >
              Train!
            </Button>
          )}
        </form>

        <h3>Predictions</h3>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Is it ...?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.predictions.length > 0 ? (
                this.state.predictions.map(prediction => (
                  <TableRow>
                    <TableCell key={prediction.label}>
                      {prediction.label}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow />
              )}
            </TableBody>
          </Table>
        </Paper>

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
