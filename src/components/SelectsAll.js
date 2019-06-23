import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
//import { TextField } from 'final-form-material-ui'; //???
import TextField from 'material-ui/TextField';
import { Select } from 'final-form-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import { resolve } from 'url';
import Button from '@material-ui/core/Button';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { getCountry, getState, getCity } from '../api/';
import ConnectForm from './ConnectMaterialForms';

//some delay
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
//to submit async alert
const onSubmit = async values => {
  await sleep(1000);
  window.alert(JSON.stringify(values, 0, 2));
  //send to server
  //createUser(values);
};

class SelectAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: '',
      itemsCountry: [],
      itemsState: [],
      itemsCity: [],
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
    // console.log('Option selected', selectedOption);
  };

  render() {
    const { itemsCountry, itemsState, itemsCity } = this.state;

    // user: {    "id": "1",
    // "name": "John Smith",
    //   "email": "john.smith@gmail.com",
    //     "phone_number": "380681234567",
    //       "address": null,
    //         "about_me": null,
    //           "country_id": "1",
    //             "state_id": "12",
    //               "city_id": "12",
    //                 "createdAt": 1543783744211}
    //country: id, hasc, name
    //state: id, hasc, name, country_id
    //cities: id, name, state_id

    return (
      <div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div>Select List</div>
              <div />
              <p>SELECT ALL FORM:</p>
              <div>
                <Field
                  name="coutry_id"
                  label="Select country:"
                  component={Select}
                  formControlProps={{ className: 'my-class' }}
                >
                  {itemsCountry.map(country => {
                    return (
                      <MenuItem
                        value={country.id}
                        key={country.name}
                        hasc={country.hasc}
                      >
                        {country.name}
                      </MenuItem>
                    );
                  })}
                </Field>
              </div>
              <div>
                <Field
                  name="state_id"
                  label="Select state:"
                  component={Select}
                  formControlProps={{ className: 'my-class' }}
                >
                  {itemsCountry.map(states => {
                    return (
                      <MenuItem
                        value={states.id}
                        key={states.name}
                        hasc={states.hasc}
                        country_id={states.country_id}
                      >
                        {states.name}
                      </MenuItem>
                    );
                  })}
                </Field>
                <ConnectForm />
              </div>
              <Button variant="raised" type="submit">
                Submit
              </Button>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )}
        />
      </div>
    );
  }
}
export default SelectAll;
