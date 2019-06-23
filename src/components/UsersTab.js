import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getUsers } from '../api';

class UsersViewTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    getUsers
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Failed to load data!');
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
  }

  render() {
    const { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>Loading the data...</div>;
    } else {
      return (
        <Paper className="paper-tab">
          <Table className="tab=form">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phohe Num</TableCell>
                <TableCell align="right">Country</TableCell>
                <TableCell align="right">State</TableCell>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">Data Create</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(items => (
                <TableRow key={items.name}>
                  <TableCell component="th" scope="row">
                    {items.name}
                  </TableCell>
                  <TableCell align="right">{items.email}</TableCell>
                  <TableCell align="right">{items.phone_number}</TableCell>
                  <TableCell align="right">{items.country_id}</TableCell>
                  <TableCell align="right">{items.state_id}</TableCell>
                  <TableCell align="right">{items.city_id}</TableCell>
                  <TableCell align="right">
                    {new Date(items.createdAt).toDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    }
  }
}

export default UsersViewTab;
