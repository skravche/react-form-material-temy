import React, { Component } from 'react';
import { Field } from 'react-final-form';
import { Select } from 'final-form-material-ui';
import MenuItem from '@material-ui/core/MenuItem';

import { getState } from './../../api';

class SelectState extends Component {
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
  };
  render() {
    const { itemsState } = this.state;

    return (
      <Field
        name="state_id"
        label="Select state:"
        component={Select}
        formControlProps={{ className: 'my-class' }}
      >
        {itemsState.map(states => {
          return (
            <MenuItem
              value={states.id}
              key={states.name}
              country_id={states.country_id}
            >
              {states.name}
            </MenuItem>
          );
        })}
      </Field>
    );
  }
}

export default SelectState;
