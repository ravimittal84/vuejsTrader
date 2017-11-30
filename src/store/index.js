import Vue from 'vue';
import Vuex from 'vuex';
import appService from '../app.service';
import postsModule from './posts';

Vue.use(Vuex);

const state = {
    isAuthenticated: false
}

const store = new Vuex.Store({
    state
});

export default store;