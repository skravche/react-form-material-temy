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
  render() {
    const { itemsCountry } = this.state;
    return (
      <div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div>!!!!!INPUTS!!!!!</div>

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
