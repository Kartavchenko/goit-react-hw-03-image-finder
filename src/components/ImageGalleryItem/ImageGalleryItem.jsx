import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ objectHits, onClick }) => {
  return objectHits.map(({ id, webformatURL, largeImageURL, tags }) => {
    return (
      <li className={css.ImageGalleryItem} key={id}>
        <img
          className={css.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={() => onClick(largeImageURL)}
        />
      </li>
    );
  });
};
