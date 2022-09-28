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

  // componentDidMount() {
  //   this.fetchPhoto();
  // }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      this.fetchPhoto(searchQuery, page);
    }
  }

  fetchPhoto = async () => {
    const { page, hits, searchQuery } = this.state;
    try {
      const data = await serviceApi(searchQuery, page);
      this.onLoadMore();
      this.setState({
        hits: [...hits, ...data],
        // page: page + 1,
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMore = () => {
    const { page } = this.state;
    // try {
    //   const data = await serviceApi(searchQuery, page);
    this.setState({
      page: page + 1,
    });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  handleOnSearch = searchQuery => {
    this.setState({ searchQuery });
  };

  closeModal = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      this.setState({
        modalOpen: false,
        modalContent: '',
      });
    }
  };

  handleModal = modalContent => {
    this.setState({
      modalOpen: true,
      modalContent,
    });
  };

  render() {
    const { hits, modalOpen, modalContent } = this.state;
    const { closeModal, handleOnSearch, handleModal, onLoadMore } = this;
    return (
      <div>
        {modalOpen && <Modal closeModal={closeModal}>{modalContent}</Modal>}
        <Searchbar handleOnSearch={handleOnSearch} />
        <ImageGallery objectHits={hits} handleModal={handleModal} />
        <LoadMore onLoadMore={onLoadMore} />
      </div>
    );
  }
}
