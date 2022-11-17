import React, { useState, useEffect } from 'react';
import { bringMovies } from '../../Services/apiCalls';
import './Search.css';

//We are passing deestructured props for a easier use
const Search = () => {

    //useState is the mandatory React hook method we are going to use on hooks

    const [movies, setMovies] = useState([]);
    const [criteria, setCriteria] = useState('');

    //I declare the input handler as an arrow function

    const inputSearchHandler = (e) => {

        //Binding the input to the hook (input criteria to hook criteria)
        setCriteria(e.target.value);
    }

    useEffect(() => {

        //This executed when the hook criteria changes.

        if (criteria !== '') {

            const bring = setTimeout(() => {

                bringMovies(criteria)
                    .then(movieResults => {
                        
                        //Here we put the movies inside the hook movies.
                        setMovies(movieResults);

                    })
                    .catch(error => console.log(error));

            }, 500);

            return () => clearTimeout(bring);

        } else if (criteria === ''){
            setMovies([]);
        }
    }, [criteria]);

    useEffect(() => {
        if (movies.length > 0) {

            console.log("we got the movies...", movies)
        }
    }, [movies]);

    const selectFilm = (film) => {
        console.log(film)
    }

    return (
        <div className='searchDesign'>
            Search for a movie:

            <input name='criteria' placeholder='Type here...' className='inputDesign'
                onChange={(e) => inputSearchHandler(e)} />


            {/* Conditional rendering...ONLY IF WE GOT MOVIES .... we will show 'em' */}

            {
                movies.length > 0 &&

                <div className='moviesContainer'>
                    {/* Here I will proceed to map the movies.... */}

                    {
                        movies.map(film => {
                            return (
                                <div className='filmDesign' key={film.id} onClick={()=>selectFilm(film)}>
                                    {film.title}
                                    <img className='posterDesign' src={`https://image.tmdb.org/t/p/original`+film.poster_path}/>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Search;