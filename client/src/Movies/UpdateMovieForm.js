import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovieItem = {
    // Where would you go to get this information?: The server.js file
    director: "",
    metascore: "",
    stars: [],
    title: ""
}

const UpdateMovieForm = props => {

    const { push } = useHistory();
    const [newMovieItem, setNewMovieItem] = useState(initialMovieItem);
    const { id } = useParams() // Maybe this is where id comes into play

    useEffect(() => {
        // How do we know what link to place here?
        // If you look at Movie.js, they basically show how to call this specific URL, but perhaps you could look at teh server to get the endpoint.
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res)
            setNewMovieItem(res.data)
        })
        .catch(err => console.log(err));
    }, [id]) // What does [id] do? 

    const changeHandler = ev => {
        ev.persist()
        let value = ev.target.value;

        // What is this doing?
        // It takes an integer and returns a string value in base 10
        if (ev.target.name === "metascore") {
            value = parseInt(value, 10)
        }

        setNewMovieItem({
            ...newMovieItem,
            [ev.target.name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios.put(`http://localhost:5000/api/movies/${id}`, newMovieItem)
        .then(res => {
            // Where does the setItems equivalent come from props like in the guided project? Doesn't seem like we have to do that here. Why? Actually maybe it's like a reset or something

            // What's going on here? 
            // Basically, we're going to be looking at the single item when we click on it, looks like.
            push(`/movies/${id}`)
        })
        .catch((err) => console.log(err))

    }

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={newMovieItem.title}
                />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={newMovieItem.director}
                />

                <input 
                    type="text"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={newMovieItem.metascore}
                />

                <input
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="stars"
                    value={newMovieItem.stars}
                />

                <button type="submit">Submit Button</button>

            </form>
        </div>
    )
}

export default UpdateMovieForm;