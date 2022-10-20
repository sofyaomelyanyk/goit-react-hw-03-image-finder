import s from '../ImageGalleryItem/ImageGalleryItem.module.css'

export const ImageGalleryItem = ({ gallery, openModal }) => {
  return (
    <>
      {gallery.map(({largeImageURL, tags, webformatURL, id}) => {
        return (
          <li
            onClick={() => openModal({ src: largeImageURL, alt: tags})}
            key={id}
            className={s["gallery-item"]}
          >
            <img src={webformatURL} alt={tags} className={s["item-image"]}/>
          </li>
        );
      })}
    </>
  );
};
