import React, { Component } from "react";

class SearchBar extends Component {
  state = {
    searchData: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="search-container">
        <input
          type="text"
          placeholder="Search By Name..."
          name="searchData"
          className="searchText"
          onChange={this.handleChange}
          value={this.state.searchData}
        />
        <button
          onClick={() => this.props.handleSearchIcon(this.state.searchData)}
        >
          <i className="fa fa-search"></i>
        </button>
      </div>
    );
  }
}

export default SearchBar;
