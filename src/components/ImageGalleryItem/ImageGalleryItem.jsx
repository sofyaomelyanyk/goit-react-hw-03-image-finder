import { Component } from 'react';

export class ImageGalleryItem extends Component {
  render() {
    console.log(this.props);
    return (
      <>
        {this.props.gallery.map(image => {
          return (
            <li key={image.id} className="gallery-item">
              <img src={image.webformatURL} alt={image.tags} />
            </li>
          );
        })}
      </>
    );
  }
}
