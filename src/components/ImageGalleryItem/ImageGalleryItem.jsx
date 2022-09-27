export const ImageGalleryItem = ({ objectHits }) => {
  return objectHits.map(({ id, webformatURL, largeImageURL, tags }) => {
    return (
      <li className="gallery-item" key={id}>
        <img src={webformatURL} alt={tags} />
      </li>
    );
  });
};
