import React, { Component } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import AddMovie from './AddMovie';
import Search from './Search';
import MovieList from './MovieList';
import axios from 'axios'
import EditMovie from './EditMovie';


class App extends Component {

  state={
    movies: [],
    searchQuery: ""
  };

//GET 

  async getMovies(){
    // AXIOS

  await  axios.get('http://localhost:3002/movies')
    .then(movie=>movie.data)
    .then(movie=>
      {
        this.setState(
          {
            movies: movie
          }
        )
      })

    //FETCH

    // fetch('http://localhost:3002/movies')
    // .then(data=>data.json())
    // .then(movie=>
    //   {
    //     this.setState(
    //       {
    //         movies: movie
    //       }
    //     )
    //   })
}


  componentDidMount(){
    this.getMovies();

  }

//-----------------------------------------------------------------------------------------------------------



//DELETE 
deleteMovie=async(movie)=>{

  //AXIOS

  await axios.delete(`http://localhost:3002/movies/${movie.id}`)

  //FETCH

  // fetch(`http://localhost:3002/movies/${movie.id}`,
  // {
  //   method: "DELETE"
  // })

  const newList = this.state.movies.filter((m)=>
    m.id !== movie.id
  );

  this.setState(
    {movies: newList}
  )
};


//-----------------------------------------------------------------------------------------------------------
 

//ADD 
 addMovie= async (movie)=>{

  //AXIOS

  await axios.post(`http://localhost:3002/movies/`, movie)

  this.setState({
      movies: this.state.movies.concat([movie])
  })
  this.getMovies();

 }


//-----------------------------------------------------------------------------------------------------------

//Search 
searchMovie=(e)=>{
  this.setState(
    {searchQuery: e.target.value}
  )
};

//-----------------------------------------------------------------------------------------------------------


// EDIT
editMovie = async (id, updatedMovie) => {

  //AXIOS
  
  await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie)
  this.getMovies();
 
  }


  render() {

    let filterMovie = this.state.movies.filter((movie)=>
    movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !==-1
    ).sort((a, b) => {
      return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
    });
    
    return (
      <BrowserRouter>
        <Routes>
        <Route path="/" exact element={ 
                            <div className='container mt-5'>
                              <div className="row">
                                 <div className="col-12">
                                   <Search searchClickHandler={this.searchMovie} />
                                 </div>
                              </div>
                              <div className='px-5'>
                                <MovieList movies={filterMovie} deleteClickHandler={this.deleteMovie}/>
                              </div>
                           </div>
                        }>
         </Route>
         
         <Route path="/add" element={
            <AddMovie
                 addClickHandler={(movie)=>{this.addMovie(movie) }}
            />}
            >
        
          </Route>
          
          <Route path="/edit/:id" element={
            <EditMovie
                onEditMovie={(id, movie) => {
                    this.editMovie(id, movie)
                }}/>
          }>
          </Route>
    
        </Routes>
      </BrowserRouter>
    
    )
  }
}
export default App;