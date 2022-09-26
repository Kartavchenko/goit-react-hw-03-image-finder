import axios from 'axios';

export const serviceApi = async searchQuery => {
  const API_KEY = '29112190-958e52871e0e9d14dd5397067';
  const PROPERTIES = 'image_type=photo&orientation=horizontal';
  const PER_PAGE = '12';

  const image = await axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&key=${API_KEY}&${PROPERTIES}&per_page=${PER_PAGE}`
  );
  return image.data.hits;
};
