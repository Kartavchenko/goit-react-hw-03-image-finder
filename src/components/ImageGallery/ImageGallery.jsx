import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ objectHits }) => {
  return (
    <ul className="gallery">
      <ImageGalleryItem objectHits={objectHits} />
    </ul>
  );
};
