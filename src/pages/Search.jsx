import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artistName: '',
    isSearchButtonDisabled: true,
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

  render() {
    const { artistName, isSearchButtonDisabled } = this.state;

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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
