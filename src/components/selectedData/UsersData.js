import React, { Component } from 'react';
import { getUsers } from '../../api';

class UsersView extends Component {
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
        <div>
          <table>
            <tr>
              <th>name</th>
              <th>email</th>
              <th>phone number</th>
              <th>country</th>
              <th>state</th>
              <th>city</th>
              <th>created</th>
            </tr>
            {items.map(items => (
              <tr key={items.id}>
                <td>{items.name}</td>
                <td>{items.email}</td>
                <td>{items.phone_number}</td>
                <td>{items.country_id}</td>
                <td>{items.state_id}</td>
                <td>{items.city_id}</td>
                <td>{new Date(items.createdAt).toDateString()}</td>
              </tr>
            ))}
          </table>
        </div>
      );
    }
  }
}
export default UsersView;
