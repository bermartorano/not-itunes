import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumsList extends Component {
  render() {
    const { apiAwnser } = this.props;

    return (
      <div>
        <ul>
          {apiAwnser.map(({ collectionId, collectionName }) => {
            const listItem = <li key={ collectionId }>{collectionName}</li>;
            // const result = <Link data-testid={`link-to-album-${collectionId}`} to={ `/album/${collectionId}` }>{ listItem }</Link>;
            return (
              <Link
                key={ collectionId }
                data-testid={ `link-to-album-${collectionId}` }
                to={ `/album/${collectionId}` }
              >
                { listItem }
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default AlbumsList;

AlbumsList.propTypes = {
  apiAwnser: PropTypes.arrayOf(
    PropTypes.shape({
      artistName: PropTypes.string,
      artistId: PropTypes.number,
      collectionId: PropTypes.number,
      collectionName: PropTypes.string,
      collectionPrice: PropTypes.number,
      releaseDate: PropTypes.string,
      trackCount: PropTypes.number,
    }),
  ),
};

AlbumsList.defaultProps = {
  apiAwnser: [],
};
