<template>
  <div>
    <b-form-input
      class="ml-2 mt-3 col-3"
      size="sm"
      type="text"
      placeholder="Enter movie name"
      @input="emitInputChangeEvent">
    </b-form-input>
  </div>
</template>

<script>
export default {
  methods: {
    emitInputChangeEvent(term) {
      this.$emit('search-term', term)
    }
  }
}
</script>
