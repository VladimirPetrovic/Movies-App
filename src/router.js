import Vue from 'vue'
import VueRouter from 'vue-router'

import AppMovies from './pages/AppMovies'
import MovieRow from './components/MovieRow'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/movies', name: 'home'},
    { path: '/movies', component: AppMovies, name: 'movies'},
    { path: '/movies/:id', component: MovieRow, name: 'movie-details'}
]

export const router = new VueRouter({
    mode: 'history',
    routes
})