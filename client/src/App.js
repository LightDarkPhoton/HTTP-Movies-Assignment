import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';

import UpdateMovieForm from './Movies/UpdateMovieForm'
import { useHistory } from 'react-router-dom'
import AddMovie from './Movies/AddMovie'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const { push } = useHistory();

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const addMovieHandler = (e) => {
    e.preventDefault();
    push('/add-movie/');

  }

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <button onClick={addMovieHandler}>Add Movie</button>
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>

      <Route path="/update-movie/:id">
    <UpdateMovieForm setMovieList={setMovieList}/>
      </Route>

      <Route path="/add-movie/">
        <AddMovie setMovieList={setMovieList}/>
      </Route>
    </>
  );
};

export default App;
