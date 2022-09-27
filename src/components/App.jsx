import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './Button/Button';
import { serviceApi } from '../ServiceApi/Service';

export class App extends Component {
  state = {
    hits: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchPhoto();
  }

  componentDidUpdate(prevProps, prevState) {
    const { hits } = this.state;
    if (prevState.hits === hits) {
      this.fetchPhoto();
    }
    // if (prevProps.searchQuery !== searchQuery) {
    //   this.fetchPhoto();
    // }
  }
  // розібратися з пошуком і завантаженням нових сторінок
  fetchPhoto = async () => {
    const { page, searchQuery } = this.state;
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
    const { page } = this.state;
    // const data = await serviceApi(searchQuery, page);
    this.setState({
      // hits: [...hits, ...data],
      page: page + 1,
    });
  };

  handleOnSearch = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    const { hits } = this.state;
    return (
      <div>
        <Searchbar handleOnSearch={this.handleOnSearch} />
        <ImageGallery objectHits={hits} />
        <LoadMore onLoadMore={this.onLoadMore} />
      </div>
    );
  }
}
