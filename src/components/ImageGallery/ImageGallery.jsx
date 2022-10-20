import PropTypes from 'prop-types';
import s from '../ImageGallery/ImageGallery.module.css'

export const ImageGallery = ({children}) => {
   return(
      <ul className={s.gallery}>
  {children}
</ul>
   )
}

ImageGallery.propTypes = {
   children: PropTypes.node,
}

