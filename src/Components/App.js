import { Component } from "react";
import Searchbar from "./Searchbar/Searchbar";
import { ToastContainer } from "react-toastify";
import ImageGallery from "./ImageGallery/ImageGallery";
import Api from "./Api/Api";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";

import Loader from "./Modal/Modal";

export default class App extends Component {
  state = {
    images: [],
    pageNumber: 1,
    search: "",
    error: "",
    isLoading: false,
    showModal: false,
    largeImageId: null,
    largeImage: "",
  };

  onSearch = (search) => {
    this.setState({ search, images: [], pageNumber: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.search !== prevState.search) {
      this.fetchImage(false);
    }
  }
  fetchImageMore = () => {
    this.fetchImage(true);
  };
  fetchImage = () => {
    const { search, pageNumber } = this.state;
    Api.fetchImage(search, pageNumber)
      .then((images) => {
        this.setState((state) => ({
          images: [...state.images, ...images],
          pageNumber: state.pageNumber + 1,
        }));
        return images[0];
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  handleGalleryItem = (largeImageURL) => {
    this.setState({
      largeImage: largeImageURL,
      showModal: true,
    });
  };
  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
      largeImage: "",
    }));
  };

  render() {
    const { isLoading, images, showModal, largeImage } = this.state;
    return (
      <div>
        <ToastContainer />
        <Searchbar onSubmit={this.onSearch} />
        <ImageGallery images={images} onImageClick={this.handleGalleryItem} />
        {isLoading && <Loader />}
        {images.length > 0 && <Button fetchImages={this.fetchImageMore} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage} alt="" width="800x" height="600px" />
          </Modal>
        )}
      </div>
    );
  }
}
