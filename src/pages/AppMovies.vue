<template>
  <div>
    <movie-search @search-term="onSearchTermChanged"/>
    <div class="ml-2 mt-4">List of movies</div>
    <div class="ml-2 mt-4">Selected: {{ selectedMoviesCounter }}</div>
    <div class="container">
      <movie-row
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @on-selected-movie="onSelectedMovie" />

        <div v-if="!movies.length">
          No movies
        </div>
    </div>
  </div>
</template>

<script>
import { moviesService } from '../utils/MoviesService'
import MovieRow from '../components/MovieRow'
import MovieSearch from '../components/MovieSearch'

export default {
  components: {
    MovieRow,
    MovieSearch
  },
  data() {
    return {
      movies: [],
      selectedMovies: []
    }
  },
  beforeRouteEnter(to, from, next) {
    moviesService.getAllMovies().then(({ data }) => {
      next((context) => {
        context.movies = data
      })
    }).catch((error) => {
      console.error(error)
    })
  },
  methods: {
    onSearchTermChanged(term) {
      moviesService.getAllMovies(term).then((response) => {
        this.movies = response
      }).catch((error) => {
        console.error(error)
      })
    },
    onSelectedMovie(movie) {
      if (this.selectedMovies.indexOf(movie) > -1) {
        return;
      }
      this.selectedMovies.push(movie)
    }
  },
  computed: {
    selectedMoviesCounter() {
      return this.selectedMovies.length
    }
  }
}
</script>
