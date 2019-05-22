import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "../App.css";

import { connect } from "react-redux";
import { changeView } from "../redux/actions";

export class OpenMenu extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  switchView = (e, n) => {
    console.log(e, n);
    e.preventDefault();
    this.props.changeView(n);
    this.handleClose();
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={e => this.switchView(e, 0)}>Top Page</MenuItem>
          <MenuItem onClick={e => this.switchView(e, 1)}>
            Magikarp: Train Model
          </MenuItem>
          <MenuItem onClick={e => this.switchView(e, 2)}>
            Gyarados: Video Classifier
          </MenuItem>
        </Menu>
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
)(OpenMenu);
