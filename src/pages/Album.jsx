import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import LoadingScreen from './LoadingScreen';

class Album extends Component {
  state = {
    artistName: '',
    collectionName: '',
    musics: [],
    loading: false,
  };

  async componentDidMount() {
    this.infoPrep();
  }

  maintainFavChecked = () => {
    getFavoriteSongs()
      .then((favoriteSongs) => {
        if (favoriteSongs.length > 0) {
          const { musics } = this.state;
          const musicsCopied = [...musics];
          const newMusics = favoriteSongs.reduce((acc, cur) => {
            const musicFound = acc.find((music) => music.trackId === cur.trackId);
            const index = acc.indexOf(musicFound);
            acc[index] = cur;
            return acc;
          }, musicsCopied);
          this.setState({ musics: newMusics });
        }
      });
  };

  infoPrep = () => {
    const { match: { params: { id } } } = this.props;
    getMusics(`${id}`).then((resolve) => {
      const firstElementRemoved = ([, ...y]) => y;
      const musicsInfo = firstElementRemoved(resolve);
      const musicsInfoWithFavorite = musicsInfo.map((musicObj) => {
        musicObj.favorite = false;
        return musicObj;
      });
      this.setState({
        artistName: resolve[0].artistName,
        collectionName: resolve[0].collectionName,
        musics: musicsInfoWithFavorite,
      }, () => this.maintainFavChecked());
    });
  };

  copyMusicChangedFav = (music) => {
    const musicCopied = { ...music };
    musicCopied.favorite = !music.favorite;
    return musicCopied;
  };

  replaceMusic = (musics, music) => {
    const vectorCopied = [...musics];
    const index = musics.indexOf(music);
    vectorCopied[index] = this.copyMusicChangedFav(music);
    return vectorCopied;
  };

  handleClickFavorites = ({ target }) => {
    const { musics } = this.state;
    const music = musics.find((v) => v.trackId === Number(target.id));
    const musicWithFavChanged = this.copyMusicChangedFav(music);
    if (target.checked) {
      this.setState({
        loading: true,
        musics: this.replaceMusic(musics, music),
      }, () => {
        addSong(musicWithFavChanged)
          .then(this.setState({ loading: false }));
      });
    } else {
      this.setState({
        loading: true,
        musics: this.replaceMusic(musics, music),
      }, () => {
        removeSong(musicWithFavChanged)
          .then(this.setState({ loading: false }));
      });
    }
  };

  render() {
    const { artistName, collectionName, musics, loading } = this.state;

    if (loading) {
      return <LoadingScreen />;
    }

    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="album-name">{ collectionName }</h2>
        <h3 data-testid="artist-name">{ artistName }</h3>
        <ul>
          {musics.map(({ trackName, previewUrl, trackId, favorite }) => {
            const v = (<MusicCard
              key={ trackName }
              trackName={ trackName }
              previewUrl={ previewUrl }
              trackId={ trackId }
              handleClickFavorites={ this.handleClickFavorites }
              favorite={ favorite }
            />);
            return <li key={ trackName }>{ v }</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({ id: PropTypes.string }),
    path: PropTypes.string,
    url: PropTypes.string,
  }),
};

Album.defaultProps = {
  match: {},
};
