import { useState, useEffect } from "react";
import Searchbar from "./Searchbar/Searchbar";
import { ToastContainer } from "react-toastify";
import ImageGallery from "./ImageGallery/ImageGallery";
import { fetchImage } from "./Api/Api";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";

import Loader from "./Modal/Modal";

export default function App() {
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageId, setLargeImageId] = useState(null);
  const [largeImage, setLargeImage] = useState("");

  const onSearch = (search) => {
    setSearch(search);
    setImages([]);
    setPageNumber(1);
  };
  useEffect(() => {
    if (search === "") {
      return;
    }

    fetchImage(search, pageNumber)
      .then((data) => setImages((prev) => [...prev, ...data]))
      .catch((error) => setError(error));
  }, [search, pageNumber]);

  const fetchImageMore = () => {
    setPageNumber((prev) => prev + 1);
  };

  const handleGalleryItem = (largeImageURL) => {
    setLargeImage(largeImageURL);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
    setLargeImage("");
  };

  return (
    <div>
      <ToastContainer />
      <Searchbar onSubmit={onSearch} />
      <ImageGallery images={images} onImageClick={handleGalleryItem} />
      {isLoading && <Loader />}
      {images.length > 0 && <Button fetchImages={fetchImageMore} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt="" width="800x" height="600px" />
        </Modal>
      )}
    </div>
  );
}
