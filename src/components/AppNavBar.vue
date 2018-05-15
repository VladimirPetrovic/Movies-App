<template>
    <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" :to="{name: 'home'}">Movies</router-link>
        <div class="navbar-nav">
          <router-link class="nav-item nav-link" :to="{name: 'movies'}">Posts</router-link>
        </div>
    </nav>
  </div>
</template>

<script>
export default {

}
</script>
