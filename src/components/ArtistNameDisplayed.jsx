import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ArtistNameDisplayed extends Component {
  render() {
    const { lastArtist } = this.props;

    return (
      <div>
        <p>{`Resultado de álbuns de: ${lastArtist}`}</p>
      </div>
    );
  }
}

export default ArtistNameDisplayed;

ArtistNameDisplayed.propTypes = {
  lastArtist: PropTypes.string,
};

ArtistNameDisplayed.defaultProps = {
  lastArtist: '',
};
