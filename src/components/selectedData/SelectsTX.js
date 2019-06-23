import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
//import { TextField } from 'final-form-material-ui'; //???
import TextField from 'material-ui/TextField';
import { Select } from 'final-form-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import SelectCity from './SelectCity';
import SelectState from './SelectState';
import SelectCountry from './SelectCountry';

//some delay
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
//to submit async alert
const onSubmit = async values => {
  await sleep(1000);
  window.alert(JSON.stringify(values, 0, 2));
  //send to server
  //createUser(values);
};

class SelectsTX extends Component {
  render() {
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
                <SelectCity />
                <SelectState />
                <SelectCountry />
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
export default SelectsTX;
