import React, { Component } from 'react';
import serialize from 'form-serialize';
import { Navigate } from 'react-router-dom';

class AddMovie extends Component {
  
  state={
    confirm: false
  }

  handleFormSubmit=(e)=>{
    e.preventDefault();
    const newMovie = serialize(e.target, { hash: true });
    this.props.addClickHandler(newMovie);
    this.setState({
        confirm : true
    })
  }
  
  render() {

    if (this.state.confirm) {
        return (
          <Navigate to={{ pathname: "/"}}/>
        );
      }
      
    return (
        <div className="container">
            <form className="mt-5" onSubmit={this.handleFormSubmit}>
                <input className="form-control" id="disabledInput" type="text" placeholder="Fill The Form To Add A Movie.." disabled/>
                <div className="form-row row">
                    <div className="form-group col-md-10">
                        <label htmlFor="inputName">Name</label>
                        <input  type="text" 
                                className="form-control" 
                                name="name"
                                required/>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputRating">Rating</label>
                        <input type="text" 
                               className="form-control" 
                               name="rating"
                               required/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputImage">Image URL</label>
                        <input type="text" 
                               className="form-control" 
                               name="imageURL"
                               required/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="overviewTextarea">Overview</label>
                        <textarea className="form-control" 
                                  name="overview" 
                                  rows="5"
                                  required>
                        </textarea>
                    </div>
                </div>
                <input type="submit" className="btn btn-danger col-12 mt-4" value="Add Movie"/>
            </form>
        </div>
    )
  }
}
export default AddMovie;
