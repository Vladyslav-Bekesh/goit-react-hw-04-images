import React from 'react';
import PropTypes, { object } from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';
import { ListCss } from './ImageGallery.styled';

function ImageGallery({ images, onClick }) {
  return (
    <ListCss>
      {images.map(({ previewURL, largeImageURL, id }) => {
        return (
          <ImageGalleryItem
            previewURL={previewURL}
            largeImageURL={largeImageURL}
            key={id}
            onClick={onClick}
          />
        );
      })}
    </ListCss>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(object),
};

export default ImageGallery;
