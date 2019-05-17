import React, { Component } from "react";
import "../App.css";

import { connect } from "react-redux";
import { changeView } from "../redux/actions";

export class Functions extends Component {
  switchView = (e, n) => {
    console.log(e, n);
    e.preventDefault();
    this.props.changeView(n);
  };

  render() {
    return (
      <div>
        <form>
          <button onClick={e => this.switchView(e, 0)}>Catch</button>
          <button onClick={e => this.switchView(e, 1)}>Magikarp</button>
          <button onClick={e => this.switchView(e, 2)}>Gyarados</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    changeView: n => {
      dispatch(changeView(n));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Functions);
