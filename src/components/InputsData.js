import React, { Component } from 'react';
import { createUser } from '../api';
import SelectCity from './selectedData/SelectCity';
import SelectState from './selectedData/SelectState';
import SelectCountry from './selectedData/SelectCountry';
import { Form, Field } from 'react-final-form';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';

const TextFieldAdapter = ({ input, meta, ...rest }) => (
  <TextField
    {...input}
    {...rest}
    onChange={(event, value) => input.onChange(value)}
    errorText={meta.touched ? meta.error : ''}
  />
);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
  createUser(values);
};

const required = value => (value ? undefined : 'Required');

class InputsData extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <h1>Test Task 'Temy'</h1>
        <div>
          This example uses <a href="http://www.material-ui.com">Material UI</a>
        </div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field
                  name="name"
                  component={TextFieldAdapter}
                  validate={required}
                  hintText="Name"
                  floatingLabelText="Name:"
                />
              </div>
              <div>
                <Field
                  name="email"
                  component={TextFieldAdapter}
                  validate={required}
                  hintText="Email"
                  floatingLabelText="Email:"
                />
              </div>
              <div>
                <SelectCountry />
              </div>
              <div>
                <SelectState />
              </div>
              <div>
                <SelectCity />
              </div>
              <div>
                <Field
                  name="phone_number"
                  component={TextFieldAdapter}
                  validate={required}
                  hintText="Phone Number"
                  floatingLabelText="Phone:"
                />
              </div>
              <div>
                <Field
                  name="address"
                  component={TextFieldAdapter}
                  hintText="Address"
                  floatingLabelText="Address:"
                />
              </div>
              <div>
                <Field
                  name="about_me"
                  multiline={true}
                  component={TextFieldAdapter}
                  rows={2}
                  rowsMax={8}
                  floatingLabelText="About Me:"
                />
              </div>

              <div className="buttons">
                <button
                  type="submit"
                  disabled={submitting}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>

              <pre>{JSON.stringify(values, undefined, 2)}</pre>
            </form>
          )}
        />
      </MuiThemeProvider>
    );
  }
}
export default InputsData;
