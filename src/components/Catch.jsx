import React, { Component } from "react";
import "../App.css";

import { connect } from "react-redux";
import { levelUp, clearPrediction } from "../redux/actions";

export class Catch extends Component {
  resetPrediction = () => setTimeout(this.props.clearPrediction(), 3000);

  render() {
    this.resetPrediction();
    return (
      <div className="catch">
        <h2>Catch Magikarp!!</h2>
        <p>
          To catch magikarp, click the image{" "}
          <span role="img" aria-label="down">
            ⬇️
          </span>
        </p>
        <img
          src="https://media.giphy.com/media/2MxHTqM1vEFfG/giphy.gif"
          onClick={this.props.levelUp}
          className="gif levelOne"
          alt="catch"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    levelUp: () => {
      dispatch(levelUp());
    },
    clearPrediction: () => {
      dispatch(clearPrediction());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catch);
