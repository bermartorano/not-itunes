import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import LoadingScreen from '../pages/LoadingScreen';

class Header extends Component {
  state = {
    UserName: '',
    loading: true,
  };

  render() {
    const { UserName, loading } = this.state;
    getUser().then(({ name }) => {
      this.setState({
        UserName: name,
        loading: false,
      });
    });

    if (loading) {
      return (<div><LoadingScreen /></div>);
    }

    return (
      <header data-testid="header-component">
        Header
        <p data-testid="header-user-name">{ UserName }</p>
      </header>
    );
  }
}

export default Header;
