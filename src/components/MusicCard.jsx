import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, handleClickFavorites, favorite } = this.props;

    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ `${trackId}` } data-testid={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            id={ `${trackId}` }
            type="checkbox"
            onClick={ handleClickFavorites }
            checked={ favorite }
          />
        </label>
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  handleClickFavorites: PropTypes.func,
  favorite: PropTypes.bool,
};

MusicCard.defaultProps = {
  trackName: 'Não recebi o nome',
  previewUrl: 'Não recebi a url',
  trackId: 0,
  handleClickFavorites: '',
  favorite: false,
};
