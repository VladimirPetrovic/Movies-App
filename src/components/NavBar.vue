<template>
    <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" :to="{name: 'home'}">Movies</router-link>
        <div class="navbar-nav">
          <router-link class="nav-item nav-link" :to="{name: 'movies'}">Movies list</router-link>
          <movie-search @search-term-change="setSearchTerm"/>
        </div>
    </nav>
  </div>
</template>

<script>
import MovieSearch from './MovieSearch.vue'

import { mapMutations } from 'vuex'

export default {
  components: {
    MovieSearch
  },
  methods: {
    ...mapMutations([
      'setSearchTerm'
    ])
  }
}
</script>