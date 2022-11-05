import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <div>
          <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </div>
      </header>
    );
  }
}

export default Header;
