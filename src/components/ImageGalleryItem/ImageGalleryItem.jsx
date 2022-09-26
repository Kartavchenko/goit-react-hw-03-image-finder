export const ImageGalleryItem = hits => {
  const photo = hits.map(({ id, webformatURL, tags }) => {
    return (
      <li className="gallery-item" key={id}>
        <img src={webformatURL} alt={tags} />
      </li>
    );
  });
  return photo;
};
