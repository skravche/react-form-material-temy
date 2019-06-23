import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { Select } from 'final-form-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import { resolve } from 'url';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppForm from './MaterialTest';
import SellectsAll from './SelectsAll';

import { getState } from '../api/';

class ConnectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: '',
      itemsState: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    getState
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Failde to load data');
        } else {
          return response.json();
        }
      })
      .then(json => {
        this.setState({
          isLoadedState: true,
          itemsState: json,
        });
      })
      .then(error => {
        this.setState({ error });
      });
  }

  state = { selectedOption: null };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    // console.log('Option selected', selectedOption);
  };
  render() {
    const { itemsState } = this.state;

    return (
      <Field
        name="city_id"
        label="Select city"
        component={Select}
        formControlProps={{ className: 'my-class' }}
      >
        {itemsState.map(states => {
          return (
            <MenuItem value={states.id} key={states.name}>
              {states.name}
            </MenuItem>
          );
        })}
      </Field>
    );
  }
}

export default ConnectForm;
