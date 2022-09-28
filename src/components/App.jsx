import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './Button/Button';
import { Modal } from 'components/Modal/Modal';
import { serviceApi } from '../ServiceApi/Service';

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
    const { hits, searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      this.fetchPhoto(searchQuery, page);
      // this.onLoadMore();
    }
  }

  fetchPhoto = async () => {
    const { page, searchQuery, hits } = this.state;
    try {
      const data = await serviceApi(searchQuery, page);
      this.setState({
        hits: data,
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMore = () => {
    const { page, hits, searchQuery } = this.state;
    // const data = await serviceApi(page);
    this.setState({
      hits,
      page: page + 1,
    });
  };

  handleOnSearch = searchQuery => {
    this.setState({ searchQuery });
  };

  openModal = modalContent => {
    console.log('hi there');
    this.setState = {
      modalOpen: true,
      modalContent: modalContent,
    };
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      modalContent: '',
    });
  };

  render() {
    const { hits, modalOpen, modalContent } = this.state;
    const { closeModal, openModal, handleOnSearch, onLoadMore } = this;
    return (
      <div>
        {modalOpen && (
          <Modal objectHits={hits}>{<img src={modalContent} />}</Modal>
        )}
        <Searchbar handleOnSearch={handleOnSearch} />
        <ImageGallery objectHits={hits} onClick={openModal} />
        <LoadMore onLoadMore={onLoadMore} />
      </div>
    );
  }
}
