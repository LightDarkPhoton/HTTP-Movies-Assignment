import React, { useState } from 'react'
import axios from 'axios'

const initialMovieItem = {
    director: "",
    metascore: "1",
    stars: ['Jason Bourne', 'Tom Cruise'],
    title: ""
}

const AddMovie = (props) => {

    const [addMovie, setMovie] = useState(initialMovieItem);

    const changeHandler = ev => {
        ev.persist()
        let value = ev.target.value;

        if (ev.target.name === "metascore") {
            value = parseInt(value, 10)
        }

        if (ev.target.name === 'stars') {
            value = value.split(',');
        }

        setMovie({
            ...addMovie,
            [ev.target.name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios.post(`http://localhost:5000/api/movies/`, addMovie)
        .then(res => {
            // push(`/movies`)
            console.log(res)
            props.setMovieList(res.data)
        })
        .catch((err) => console.log(err))
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={addMovie.title}
                />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={addMovie.director}
                />

                <input 
                    type="text"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={addMovie.metascore}
                />

                <input
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="stars"
                    value={addMovie.stars}
                />
                <button type="submit">Submit here</button>
            </form>
        </div>
    )
}

export default AddMovie;