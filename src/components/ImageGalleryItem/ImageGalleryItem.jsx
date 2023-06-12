import React from 'react';
import PropTypes from 'prop-types';
import { ItemCss, ImageCss } from './ImageGalleryItem.styled';

function ImageGalleryItem({ previewURL, id, onClick, largeImageURL }) {
  return (
    <ItemCss key={id}>
      <ImageCss
        src={previewURL}
        onClick={onClick}
        data-large-image-url={largeImageURL}
        alt="your advertisment can be here"
      />
    </ItemCss>
  );
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
  previewURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
