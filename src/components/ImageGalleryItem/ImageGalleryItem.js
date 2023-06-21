import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  tags,
  onImageClick,
  largeImageURL,
  imageId
}) => {

  const handleImageClick = () => {
    onImageClick(largeImageURL);
  };

  return (
    <li className={css.gallery_item} key={imageId}>
      <img
        className={css.gallery_item_image}
        src={webformatURL}
        alt={tags}
        onClick={handleImageClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onImageClick: PropTypes.func,
  largeImageURL: PropTypes.string,
  imageId: PropTypes.number.isRequired,
};

export default ImageGalleryItem;