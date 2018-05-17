<template>
  <div>
    <movie-search @search-term="onSearchTermChanged"/>
    <div class="ml-2 mt-4">List of movies</div>

    <b-badge class="ml-2 mt-4">
      Selected: {{ selectedMoviesCounter }}
    </b-badge>
    <b-button
      variant="primary"
      class="btn-sm"
      @click="selectAll"
    >
      Select all
    </b-button>
    <b-button
        variant="primary"
        class="btn-sm"
        @click="deselectMovies"
      >
        Deselect all
    </b-button>
    <b-dropdown text="Sort by">
      <b-dropdown-item
        @click="sortBy('title', 'asc')"
      >
        Name Asc
      </b-dropdown-item>
      <b-dropdown-item
        @click="sortBy('title', 'desc')"
      >
        Name Desc
      </b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item
        @click="sortBy('duration', 'asc')"
      >
        Duration Asc
      </b-dropdown-item>
      <b-dropdown-item
        @click="sortBy('duration', 'desc')"
      >
        Duration Desc
      </b-dropdown-item>
    </b-dropdown>
    <div class="container">
      <movie-row
        v-for="movie in filteredMovies"
        :key="movie.id"
        :movie="movie"
        :selectedMoviesIds="selectedMoviesIds"
        @on-selected-movie="onSelectedMovie" />

        <movies-paginator
          :pages="pages"
          v-if="pages > 1"
          @selected-page="onSelectedPage"
          :selectedPage="selectedPage"
        />
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
import MoviesPaginator from '../components/MoviesPaginator'

export default {
  components: {
    MovieRow,
    MovieSearch,
    MoviesPaginator
  },
  data() {
    return {
      movies: [],
      selectedMoviesIds: [],
      selectedPage: 1,
      currentTerm: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    moviesService.getAllMovies().then(({ data }) => {
      next((context) => {
        context.movies = data.map((movie => {
          movie.duration = parseInt(movie.duration)
          return movie
        }))
      })
    }).catch((error) => {
      console.error(error)
    })
  },
  methods: {
    onSearchTermChanged(term) {
      // moviesService.getAllMovies(term).then((response) => {
      //   this.movies = response
      // }).catch((error) => {
      //   console.error(error)
      // })
      this.currentTerm = term
    },
    onSelectedMovie(movie, isSelected) {
      if (!isSelected) {
        let movieIndex = this.selectedMoviesIds.indexOf(movie.id)
        this.selectedMoviesIds.splice(movieIndex, 1)
        return;
      }
      this.selectedMoviesIds.push(movie.id)
    },
    deselectMovies() {
      this.selectedMoviesIds = []
    },
    selectAll() {
      this.selectedMoviesIds = this.movies.map(movie => movie.id)
    },
    sortBy(prop, order) {
      let orderCoefficient = order === 'asc' ? 1 : -1

      this.movies = this.movies.sort((movie1, movie2) => {
        return movie1[prop] >= movie2[prop] ? orderCoefficient : -orderCoefficient
      })
    },
    onSelectedPage(page) {
      this.selectedPage = page
    }
  },
  computed: {
    selectedMoviesCounter() {
      return this.selectedMoviesIds.length
    },
    pages() {
      return Math.ceil(this.movies.length / 5)
    },
    currentlyVisibleMovies() {
      let bottomLimit = (this.selectedPage -1) * 5
      let topLimit =  bottomLimit + 5

      return this.movies.filter((movie, index) => {
        return index >= bottomLimit && index < topLimit
      })
    },
    filteredMovies() {
      return this.currentlyVisibleMovies.filter((movie) => {
        return movie.title.toLowerCase().includes(this.currentTerm.toLowerCase())
      })
    }
  }
}
</script>
