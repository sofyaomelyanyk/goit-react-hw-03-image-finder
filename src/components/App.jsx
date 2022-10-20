import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import s from '../components/App.module.css';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { picturesRequest } from './services/api';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    gallery: [],
    picture: '',
    page: 1,
    perPage: 12,
    isLoading: false,
    error: null,
    currentImage: null,
    isShow: false,
  };

  componentDidUpdate(_, prevState) {
    const { picture, page, perPage } = this.state;
    if (prevState.picture !== picture || prevState.page !== page) {
      this.fetchPictures(picture, page, perPage);
    }
  }

  fetchPictures = async (picture, page, perPage) => {
    const message = 'Nothing found for your request!';

    try {
      this.setState({ isLoading: true, isShow: false, error: null });
      const res = await picturesRequest(picture, page, perPage);

      if (!res.data.hits.length) {
        throw new Error(message)
      }

      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...res.data.hits],
        isShow: true,
      }));
    } catch {
      this.setState({ error: message, isShow: false });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  addName = picture => {
    this.setState({ picture, gallery: [], page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = data => {
    this.setState({ currentImage: data });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  render() {
    const { addName, loadMore, openModal, closeModal } = this;
    const { isLoading, gallery, currentImage, error, isShow } = this.state;
    return (
      <div className={s.app}>
        <Searchbar addName={addName} />
        {isLoading && <Loader />}
        {error && <h2>{error}</h2>}
        <ToastContainer autoClose={3000} theme="dark" />
        <ImageGallery>
          <ImageGalleryItem openModal={openModal} gallery={gallery} />
        </ImageGallery>
        {isShow && <Button text="Load more" onClick={loadMore} />}
        {currentImage && (
          <Modal currentImage={currentImage} closeModal={closeModal} />
        )}
      </div>
    );
  }
}
