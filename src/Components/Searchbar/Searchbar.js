import { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Searchbar.css";
export default class Searchbar extends Component {
  state = {
    search: "",
  };
  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.search.trim() === "") {
      return toast.error("Введите тематику картинок !");
    }
    this.props.onSubmit(this.state.search);
    this.setState({ search: "" });
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleFormSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.search}
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
