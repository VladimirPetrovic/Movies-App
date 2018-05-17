<template>
  <div>
    <b-form-input
      class="ml-2 mt-2 col-10"
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
      this.$emit('search-term-change', term)
    }
  }
}
</script>