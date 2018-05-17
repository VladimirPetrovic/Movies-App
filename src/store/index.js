import Vue from 'vue'
import Vuex from 'vuex'

import { moviesService } from '../utils/MoviesService'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    counter: 1,
    searchTerm: '',
    movies: []
  },
  getters: {
    getCounter(state) {
      return state.counter
    },
    getSearchTerm(state) {
      return state.searchTerm
    },
    getMovies(state) {
      return state.movies
    }
  },
  mutations: {
    incrementCounter(state) {
      state.counter++
    },
    setSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm
    },
    setMovies(state, movies) {
      state.movies = movies
    }
  },
  actions: {
    incrementCounterAction(store) {
      setTimeout(() => {
        store.commit('incrementCounter')
      }, 3000)
    },
    fetchMovies(store) {
      console.log('fetchMovies')
      moviesService.getAllMovies().then(({ data }) => {
        let movies = data.map((movie) => {
          movie.duration = parseInt(movie.duration)
          return movie
        })

        store.commit('setMovies', movies)
      })
    }
  }
})