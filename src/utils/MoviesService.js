import axios from 'axios'

export default class MoviesService {
    constructor() {
        axios.defaults.baseURL = 'http://localhost:3000/api/'
    }
    getAllMovies(term = '') {
        return axios.get('movies', {
            params: {
                term
            }
        })
    }
}

export const moviesService = new MoviesService()