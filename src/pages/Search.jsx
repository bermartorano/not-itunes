import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingScreen from './LoadingScreen';

class Search extends Component {
  state = {
    artistName: '',
    isSearchButtonDisabled: true,
    apiAwnser: '',
    loading: false,
  };

  searchValidation = () => {
    const { artistName } = this.state;
    this.setState({
      isSearchButtonDisabled: (artistName.length < 2),
    });
  };

  onSearchInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, this.searchValidation);
  };

  onButtonClick = () => {
    const { artistName } = this.state;
    this.setState({ loading: true }, () => {
      searchAlbumsAPI(artistName)
        .then((resolve) => this.setState({
          artistName: '',
          apiAwnser: resolve,
          loading: false,
        }));
    });
  };

  render() {
    const { artistName, isSearchButtonDisabled, loading } = this.state;

    if (loading) {
      return (<div><LoadingScreen /></div>);
    }

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="artist-name">
            <input
              type="text"
              name="artistName"
              id="artist-name"
              data-testid="search-artist-input"
              placeholder="Aerosmith"
              value={ artistName }
              onChange={ this.onSearchInputChange }
            />
          </label>
          <button
            type="button"
            name="searchButton"
            data-testid="search-artist-button"
            disabled={ isSearchButtonDisabled }
            onClick={ this.onButtonClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
