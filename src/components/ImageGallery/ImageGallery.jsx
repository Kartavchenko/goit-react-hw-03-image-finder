import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ objectHits, onClick }) => {
  return (
    <ul className={css.ImageGallery}>
      <ImageGalleryItem objectHits={objectHits} onClick={onClick} />
    </ul>
  );
};
