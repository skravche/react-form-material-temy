import React, { Component } from 'react';
import { Field } from 'react-final-form';
import { Select } from 'final-form-material-ui';
import MenuItem from '@material-ui/core/MenuItem';

import { getCountry } from './../../api';

class SelectCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: '',
      itemsCountry: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    getCountry
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Failde to load data');
        } else {
          return response.json();
        }
      })
      .then(json => {
        this.setState({
          isLoadedCountry: true,
          itemsCountry: json,
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
    const { itemsCountry } = this.state;
    return (
      <Field
        name="country_id"
        label="Select Country:"
        component={Select}
        formControlProps={{ className: 'my-class' }}
      >
        {itemsCountry.map(country => {
          return (
            <MenuItem
              value={country.id}
              name={country.name}
              hasc={country.hasc}
            >
              {country.name}
            </MenuItem>
          );
        })}
      </Field>
    );
  }
}
export default SelectCountry;
