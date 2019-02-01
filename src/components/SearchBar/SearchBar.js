import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        term: ''
    }
    this.search = this.search.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  handleSearchChange(e) {
    const termValue = e.target.value;
    this.setState({
      term: termValue
    })
    e.preventDefault();
  }
  search () {
    this.props.onSearch(this.state.term);
  }
  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" value={this.state.term} onChange={this.handleSearchChange}/>
        <a onClick={this.search}>SEARCH</a>
      </div>

    );
  }
}

export default SearchBar;
