import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Searchbar.css";
export default function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      return toast.error("Введите тематику картинок !");
    }
    onSubmit(search);
    setSearch("");
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleFormSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          value={search}
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}
