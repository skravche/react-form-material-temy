import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { Select } from 'final-form-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import { resolve } from 'url';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ConnectForm from './SelectsAll';

const TextFieldAdapter = ({ input, meta, ...rest }) => (
  <TextField
    {...input}
    {...rest}
    onChange={(event, value) => input.onChange(value)}
    errorText={meta.touched ? meta.error : ''}
  />
);
//some delay
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
//to submit async alert
const onSubmit = async values => {
  await sleep(1000);
  window.alert(JSON.stringify(values, 0, 2));
  //send to server
  //createUser(values);
};

//validate
const required = value => (value ? undefined : 'Required');

const cities = [{ id: 1, name: 'kyiv' }, { id: 2, name: 'lwiv' }];

const AppForm = () => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <h1>
        <span role="🏁" /> Test Task 'Temy'
      </h1>
      <div>
        This example uses{' '}
        <a href="https://github.com/JedWatson/react-select">React Select</a> and{' '}
        <a href="http://www.material-ui.com">Material UI</a>.
      </div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div>Select List</div>
            <Field
              name="city_id"
              label="Select city"
              component={Select}
              formControlProps={{ className: 'my-class' }}
            >
              {cities.map(city => {
                return (
                  <MenuItem value={city.id} key={city.name}>
                    {city.name}
                  </MenuItem>
                );
              })}
            </Field>
            <p>dasdasdjaskhdkjalsndflkjasnfkljasdn</p>
            <ConnectForm />
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </MuiThemeProvider>
  );
};
export default AppForm;
