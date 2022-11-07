import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    artistName: '',
    collectionName: '',
    musics: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const albumInfo = await getMusics(`${id}`);
    const firstElementRemoved = ([, ...y]) => y;
    const musicsInfo = firstElementRemoved(albumInfo);
    this.setState({
      artistName: albumInfo[0].artistName,
      collectionName: albumInfo[0].collectionName,
      musics: musicsInfo,
    });
  }

  render() {
    const { artistName, collectionName, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="album-name">{ collectionName }</h2>
        <h3 data-testid="artist-name">{ artistName }</h3>
        <ul>
          {musics.map(({ trackName, previewUrl }) => {
            const tn = trackName;
            const pv = previewUrl;
            const v = <MusicCard key={ tn } trackName={ tn } previewUrl={ pv } />;
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
