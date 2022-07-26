import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Search extends Component {
  render() {
    return (
      <form onSubmit={(e)=>{e.preventDefault()}}>
        <div className="form-row row mb-5">
          <div className="col-10">
            <input 
                type="text" 
                className="form-control" 
                placeholder="Seach a movie"
                onChange={this.props.searchClickHandler}/>
          </div>
          <div className="col-2">
              <Link
                    to="/add"
                    type="button" 
                    className="btn btn-md btn-danger"
                    style={{float: "right"}}
                    >Add Movie
              </Link>
          </div>
        </div>
      </form>
    )
  }
}
export default Search;