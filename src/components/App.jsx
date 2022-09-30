import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './Button/Button';
import { Modal } from 'components/Modal/Modal';
import { serviceApi } from '../ServiceApi/Service';
import { Loader } from './Loader/Loader';
import PropTypes from 'prop-types';

export class App extends Component {
  state = {
    hits: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    error: null,
    modalOpen: false,
    modalContent: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      this.fetchPhoto();
      this.setState({ isLoading: true });
    }
  }

  fetchPhoto = async () => {
    const { page, hits, searchQuery } = this.state;
    try {
      this.setState({
        isLoading: true,
      });
      const data = await serviceApi(searchQuery, page);
      this.setState(({ page }) => {
        return {
          hits: [...hits, ...data],
          page: page + 1,
        };
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleOnSearch = searchQuery => {
    if (searchQuery !== this.state.searchQuery) {
      this.setState({ searchQuery, page: 1, hits: [] });
    }
  };

  closeModal = e => {
    window.removeEventListener('keydown', this.onEscKeyPress);
    this.setState({
      modalOpen: false,
      modalContent: '',
    });
  };

  onEscKeyPress = e => {
    if (e.key === 'Escape') {
      this.closeModal();
    }
  };

  handleModal = modalContent => {
    window.addEventListener('keydown', this.onEscKeyPress);
    this.setState({
      modalOpen: true,
      modalContent,
    });
  };

  render() {
    const { hits, modalOpen, modalContent, isLoading } = this.state;
    const { closeModal, handleOnSearch, handleModal, fetchPhoto } = this;
    const cards = Boolean(hits.length);
    return (
      <div>
        {modalOpen && <Modal closeModal={closeModal}>{modalContent}</Modal>}
        <Searchbar handleOnSearch={handleOnSearch} />
        <ImageGallery objectHits={hits} handleModal={handleModal} />
        {isLoading ? <Loader /> : cards && <LoadMore onLoadMore={fetchPhoto} />}
      </div>
    );
  }
}

App.propTypes = {
  fetchPhoto: PropTypes.func,
  handleOnSearch: PropTypes.func,
  closeModal: PropTypes.func,
  onEscKeyPress: PropTypes.func,
  handleModal: PropTypes.func,
  cards: PropTypes.bool,
  Searchbar: PropTypes.element,
  LoadMore: PropTypes.element,
  Loader: PropTypes.element,
};
