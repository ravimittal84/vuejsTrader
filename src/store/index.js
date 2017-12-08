import Vue from 'vue';
import Vuex from 'vuex';
import stocks from './modules/stocks';
import portfolio from './modules/portfolio';
import authService from '../auth.service';
import appService from '../app.service';

Vue.use(Vuex);

const state = {
    isAuthenticated: false,
    token: null,
    userId: null
};

const actions = {
    signUpUser({ commit, dispatch }, authData) {
        authService.saveUser({
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        }).then(data => {
            commit('login', data);
            appService.saveUser(authData)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }).catch(err => console.log(err));
    },
    signInUser({ commit }, creds) {
        return new Promise((resolve, reject) => {
            authService.signInUser({
                email: creds.email,
                password: creds.password,
                returnSecureToken: true
            }).then(data => {
                commit('login', data);
                resolve();
            }).catch(res => {
                window.alert('could not login!');
                console.log(res);
                reject(res);
            });
        });
    }
}

const mutations = {
    login(state, data) {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('token', data.idToken);
            window.localStorage.setItem('userId', data.localId);
            window.localStorage.setItem('tokenExpiration', data.expiration);
        }
        state.isAuthenticated = true;
        state.idToken = data.idToken;
        state.userId = data.localId;
    },
    logout(state) {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('userId');
            window.localStorage.removeItem('tokenExpiration');
        }
        state.isAuthenticated = false;
        state.idToken = null;
        state.userId = null;
    }
}

const store = new Vuex.Store({
    modules: {
        stocks,
        portfolio
    },
    state,
    actions,
    mutations
});

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', event => {
        let expiration = window.localStorage.getItem('tokenExpiration');
        var unixTimestamp = new Date().getTime() / 1000;
        if (expiration !== null && parseInt(expiration) - unixTimestamp > 0) {
            store.state.isAuthenticated = true;
        }
    })
}

export default store;