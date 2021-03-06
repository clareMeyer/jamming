import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchTerm: ''
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(e){
    this.setState({searchTerm: e.target.value});
  }
  /*the method passes the state of the term to this.props.onSearch*/
  search(){
    this.props.onSearch(this.state.searchTerm);
  }
  render(){
    return(
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
        {/*this is a hyperlink for a search button*/}
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
