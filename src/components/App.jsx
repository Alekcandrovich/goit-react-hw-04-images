import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import Loader from './Loader';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import Modal from './Modal';
import { fetchImages } from '../servise/api';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

  useEffect(() => {
    if (!searchQuery) return;
      const fetchImagesApi = async () => {
        setIsLoading(true);
    try {
      const { totalHits, hits } = await fetchImages(searchQuery, page);

      if (page === 1) {
        Notiflix.Notify.success(`"Hooray! We found ${totalHits} images."`);
      }
      
      if (!hits.length) {
        Notiflix.Notify.failure(
          'An error occurred while fetching images. Please try again later.'
        );
        return;
      }

      if (totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      const imagesProp = hits.map(
      ({
        id,
        tags,
        webformatURL,
        largeImageURL,
      }) => ({
        id,
        tags,
        webformatURL,
        largeImageURL,
        })
      );

      setTotalHits(totalHits);
      setImages(prevImages => [...prevImages, ...imagesProp]);
      } catch (error) {
      Notiflix.Notify.failure(
        'An error occurred while fetching images. Please try again later.'
      );
      } finally {
      setIsLoading(false);
      }
    };

      fetchImagesApi();
    }, [page, searchQuery]);

  const onSearchSubmit = async query => {
    setSearchQuery(query);
    setPage(1);
    setTotalHits(0);
    setImages([]);
  };

  const onLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onImageClick = imgUrl => {
    setShowModal(true);
    setModalImageUrl(imgUrl);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setModalImageUrl('');
  };

  return (
    <div>
      <Searchbar onSubmit={onSearchSubmit} />
      <ImageGallery>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            webformatURL={image.webformatURL}
            tags={image.tags}
            largeImageURL={image.largeImageURL}
            onImageClick={() => onImageClick(image.largeImageURL)}
            imageId={image.id}
          />
        ))}
      </ImageGallery>
        {isLoading && (
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          className="loader_center loader_overlay"
        />
      )}
      {!isLoading && totalHits !== images.length && (
        <Button onClick={onLoadMoreClick}>Load more</Button>
      )}
      {showModal && (
        <Modal onCloseModal={onCloseModal}>
          <img src={modalImageUrl} alt="modal" />
        </Modal>
      )}
    </div>
  );
};

export default App;