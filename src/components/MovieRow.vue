<template>
  <div class="row mb-2 mt-2" :class="{ 'highlighted': isSelected}">
    <div class="col-sm" v-text="movie.id"></div>
    <div class="col-sm" v-text="movie.title"></div>
    <div class="col-sm" v-text="movie.director"></div>
    <div class="col-sm" v-text="movie.releaseDate"></div>
    <div class="col-sm" v-text="movie.genre"></div>
    <div class="col-sm" v-text="movie.duration"></div>
    <div class="col-sm">
      <b-button
        variant="primary"
        @click="onSelected"
      >
        Select / Deselect
      </b-button>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true
    },
    selectedMoviesIds: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    isSelected() {
      return this.selectedMoviesIds.indexOf(this.movie.id) > -1
    }
  },
  methods: {
    onSelected() {
      this.$emit('on-selected-movie', this.movie, !this.isSelected)
    },
  }
}
</script>

<style>
  .highlighted {
    background: grey
  }
</style>