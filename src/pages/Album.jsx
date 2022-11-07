import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import LoadingScreen from './LoadingScreen';

class Album extends Component {
  state = {
    artistName: '',
    collectionName: '',
    musics: [],
    loading: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const albumInfo = await getMusics(`${id}`);
    const firstElementRemoved = ([, ...y]) => y;
    const musicsInfo = firstElementRemoved(albumInfo);
    const musicsInfoWithFavorite = musicsInfo.map((musicObj) => {
      musicObj.favorite = false;
      return musicObj;
    });
    this.setState({
      artistName: albumInfo[0].artistName,
      collectionName: albumInfo[0].collectionName,
      musics: musicsInfoWithFavorite,
    });
  }

  replaceMusic = (musics, music) => {
    const vectorCopied = [...musics];
    const index = musics.indexOf(music);
    const musicCopied = { ...music };
    musicCopied.favorite = !music.favorite;
    vectorCopied[index] = musicCopied;
    return vectorCopied;
  };

  handleClickFavorites = ({ target }) => {
    const { musics } = this.state;
    const music = musics.find((v) => v.trackId === Number(target.id));
    if (target.checked) {
      this.setState({
        loading: true,
        musics: this.replaceMusic(musics, music),
      }, () => {
        addSong(music)
          .then(this.setState({ loading: false }));
      });
    } else {
      this.setState({
        loading: true,
        musics: this.replaceMusic(musics, music),
      }, () => {
        removeSong(music)
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
