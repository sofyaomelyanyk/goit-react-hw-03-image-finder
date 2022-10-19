import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
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
  };

  fetchPictures = (picture, page, perPage) => {
    picturesRequest(picture, page, perPage).then(res =>
      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...res.data.hits],
      }))
    );
  }

  componentDidUpdate(_, prevState) {
   const {picture, page, perPage} = this.state
    if (prevState.picture !== picture || prevState.page !== page) {
      this.fetchPictures(picture, page, perPage);
    }
  }

  addName = picture => {
    this.setState({ picture,  gallery: [], page: 1});
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { addName } = this;
    return (
      <>
        <Searchbar addName={addName} />
        <ImageGallery>
          {!this.state.picture && <h1>ВВЕДИТЕ ЧТО-НИБУДЬ</h1>}
          <ImageGalleryItem gallery={this.state.gallery} />
        </ImageGallery>
        <Button text="Load more" onClick={this.loadMore} />
        <Modal />
      </>
    );
  }
}
