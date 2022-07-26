import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MovieList extends Component {

  cut=(string,maxLength)=>{
    if (!string) return null;
    if (string.length <= maxLength ) return string;
    return `${string.substring(0, maxLength)} ...`;
   }

  render() {

    return (
      <div className='row px-5'>
        {this.props.movies.map((movie,index)=>
            <div className="col-lg-4 px-4" key={index}>
                <div className="card mb-4 shadow-sm">
                    <img src={movie.imageURL} className="card-img-top" alt="err" />
                    <div className="card-body">
                        <h5 className="card-title">{movie.name}</h5>
                        <p className="card-text">{this.cut(movie.overview,100)}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <button type="button" 
                                    className="btn btn-md btn-outline-danger"
                                    onClick={(e)=>this.props.deleteClickHandler(movie)}>
                                Delete
                            </button>

                            <Link to={`/edit/${movie.id}`}
                                  type="button" 
                                  className="btn btn-md btn-outline-danger">
                                Edit
                            </Link>

                            <button className="btn btn-md btn-primary">
                                <span className="badge badge-info">{movie.rating}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    )
  }
}
export default MovieList;
