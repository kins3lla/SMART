import DropDownMenu from 'material-ui/DropDownMenu';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const styles = {
  customWidth: {
    width: 200,
  },
};



class DropDown extends React.Component {
constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div>
        <br />
        <MuiThemeProvider >
        <DropDownMenu
          value={this.state.value}
          onChange={this.handleChange}
          style={styles.customWidth}
          autoWidth={false}
        >
          <MenuItem value={1} primaryText="Home" />
          <MenuItem value={2} primaryText="Rate Your Day!" />
          <MenuItem value={3} primaryText="About" />
        </DropDownMenu>
        </MuiThemeProvider >
      </div>
    );
  }


}

export default DropDown;
