import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
// import { ImageGallery } from './ImageGallery/ImageGallery';
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

  // componentDidUpdate() {}

  fetchPhoto = async () => {
    try {
      const hits = await serviceApi(this.state.searchQuery);
      this.setState({
        hits,
      });
      console.log(hits);
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleOnSearch = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    // console.log(this.fetchPhoto);
    return (
      <div>
        <Searchbar handleOnSearch={this.handleOnSearch} />

        {/* <ImageGallery joga={this.fetchPhoto()} /> */}
      </div>
    );
  }
}
