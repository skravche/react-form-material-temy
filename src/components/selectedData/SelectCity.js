import React, { Component } from 'react';
import { Field } from 'react-final-form';
import { Select } from 'final-form-material-ui';
import MenuItem from '@material-ui/core/MenuItem';

import { getCity } from './../../api';

class SelectCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: '',
      itemsCity: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    getCity
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Failde to load data');
        } else {
          return response.json();
        }
      })
      .then(json => {
        this.setState({
          isLoadedCity: true,
          itemsCity: json,
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
    const { itemsCity } = this.state;
    return (
      <Field
        name="city_id"
        label="Select city"
        component={Select}
        formControlProps={{ className: 'my-class' }}
      >
        {itemsCity.map(city => {
          return (
            <MenuItem value={city.id} key={city.name} state_id={city.state_id}>
              {city.name}
            </MenuItem>
          );
        })}
      </Field>
    );
  }
}

export default SelectCity;
