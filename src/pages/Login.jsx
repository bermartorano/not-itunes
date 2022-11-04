import React, { Component } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import LoadingScreen from './LoadingScreen';

class Login extends Component {
  state = {
    isloginButtonDisabled: true,
    loginName: '',
    loading: false,
  };

  loginValidation = () => {
    const { loginName } = this.state;
    this.setState({
      isloginButtonDisabled: (loginName.length <= 2),
    });
  };

  onLoginNameChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, this.loginValidation);
  };

  salveNameInput = () => {
    const { loginName } = this.state;
    this.setState({ loading: true }, () => {
      createUser({ name: loginName })
        .then(() => this.setState({ loading: false }))
        .then(() => <Switch><Redirect exact from="/" to="/search" /></Switch>);
    });
  };

  render() {
    const {
      isloginButtonDisabled,
      loginName,
      loading,
    } = this.state;

    if (loading) {
      return (<div><LoadingScreen /></div>);
    }

    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        <form action="">
          <label htmlFor="name-imput">
            Digite seu nome:
            <input
              type="text"
              name="loginName"
              placeholder="João da Silva"
              id="name-imput"
              data-testid="login-name-input"
              value={ loginName }
              onChange={ this.onLoginNameChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            name="loginButton"
            disabled={ isloginButtonDisabled }
            onClick={ this.salveNameInput } // trocarrrr
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
