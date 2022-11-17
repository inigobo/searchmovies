//Here is where I am going to call the API 

import axios from 'axios';

var root = 'https://api.themoviedb.org/3/';
var apiKey = '210d6a5dd3f16419ce349c9f1b200d6d';


export const bringMovies = async (criteria) => {

    //In order to use await, function must by async
    let res = await axios.get(`${root}search/movie?api_key=${apiKey}&language=en-US&query=${criteria}&page=1&include_adult=false`);

    return res.data.results;
}