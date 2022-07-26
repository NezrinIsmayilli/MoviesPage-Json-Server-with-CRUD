import React, { Component } from 'react';
import withRouter from './withRouter';
import { Navigate } from 'react-router-dom';
import axios from 'axios'


class EditMovie extends Component {
 
    state={
        name: "",
        rating: "",
        overview: "",
        imageURL: "",
        confirm: false
      }
     
      componentDidMount(){
        const id = this.props.params.id;

        //AXIOS

        axios.get(`http://localhost:3002/movies/${id}`)
        .then(movie=>movie.data)
        .then(movie=>
            {
                this.setState(
                    {
                        name: movie.name,
                        rating: movie.rating,
                        overview: movie.overview,
                        imageURL: movie.imageURL
                    }
                )
            })

        //FETCH

        // fetch(`http://localhost:3002/movies/${id}`)
        // .then(data=>data.json())
        // .then(movie=>
        //     {
        //         this.setState(
        //             {
        //                 name: movie.name,
        //                 rating: movie.rating,
        //                 overview: movie.overview,
        //                 imageURL: movie.imageURL
        //             }
        //         )
        //     })
        }
    
      onInputChange = (e) => {
 
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        handleFormSubmit = (e) => {
            e.preventDefault();
    /* 
            const name = this.state.name;
            const rating = this.state.rating;
            const overview = this.state.overview;
            const imageURL = this.state.imageURL; */
    
            const { name, rating, overview, imageURL } = this.state;
            const id = this.props.params.id;
    
            const updatedMovie = {
                name: name,
                rating: rating,
                overview: overview,
                imageURL: imageURL
            }
    
            this.props.onEditMovie(id, updatedMovie);
            this.setState({
                confirm : true
            })
    
        }
    
  
  
  render() {

    if (this.state.confirm) {
        return (
          <Navigate to={{ pathname: "/" }}/>
        );
      }

    return (
        <div className="container">
            <form className="mt-5" onSubmit={this.handleFormSubmit}>
                <input className="form-control" id="disabledInput" type="text" placeholder="EDIT The Form To Update A Movie.." disabled/>
                <div className="form-row row">
                    <div className="form-group col-md-10">
                        <label htmlFor="inputName">Name</label>
                        <input  type="text" 
                                className="form-control" 
                                name="name"
                                value={this.state.name || ''}
                                onChange={this.onInputChange}/>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputRating">Rating</label>
                        <input type="text" 
                               className="form-control" 
                               name="rating"
                               value={this.state.rating || ''}
                               onChange={this.onInputChange}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputImage">Image URL</label>
                        <input type="text" 
                               className="form-control" 
                               name="imageURL"
                               value={this.state.imageURL || ''}
                               onChange={this.onInputChange}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="overviewTextarea">Overview</label>
                        <textarea className="form-control" 
                                  name="overview" 
                                  rows="5"
                                  value={this.state.overview || ''}
                                  onChange={this.onInputChange}>
                        </textarea>
                    </div>
                </div>
                <input type="submit" className="btn btn-danger col-12 mt-4" value="Edit Movie"/>
            </form>
        </div>
    )
  }
}
export default withRouter(EditMovie);

