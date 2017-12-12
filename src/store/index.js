import Vue from 'vue';
import Vuex from 'vuex';
import stocks from './modules/stocks';
import portfolio from './modules/portfolio';
import authService from '../auth.service';
import appService from '../app.service';

import * as mutationTypes from './mutation-types';

Vue.use(Vuex);

const state = {
    isAuthenticated: false,
    token: null,
    userId: null
};

const actions = {
    setLogoutTimer({ commit }, expiresIn) {
        setTimeout(function () {
            commit(mutationTypes.LOGOUT);
        }, expiresIn);
    },
    signUpUser({ commit, dispatch }, authData) {
        return new Promise((resolve, reject) => {
            authService.saveUser({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }).then(data => {
                const expiration = new Date().getTime() + (data.expiresIn * 1000);
                const userData = {
                    idToken: data.idToken,
                    localId: data.localId,
                    expiration
                }
                commit(mutationTypes.LOGIN, data);
                dispatch('setLogoutTimer', data.expiresIn * 1000);
                appService.saveUser(authData)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
                resolve();
            }).catch(err => {
                console.log(err);
                reject(res);
            });
        });
    },
    signInUser({ commit, dispatch }, creds) {
        return new Promise((resolve, reject) => {
            authService.signInUser({
                email: creds.email,
                password: creds.password,
                returnSecureToken: true
            }).then(data => {
                const expiration = new Date().getTime() + (data.expiresIn * 1000);
                const userData = {
                    idToken: data.idToken,
                    localId: data.localId,
                    expiration
                }
                commit(mutationTypes.LOGIN, userData);
                dispatch('setLogoutTimer', data.expiresIn * 1000);
                resolve();
            }).catch(res => {
                window.alert('could not login!');
                console.log(res);
                reject(res);
            });
        });
    },
    signOutUser({ commit }) {
        return new Promise(resolve => {
            commit(mutationTypes.LOGOUT);
            commit(mutationTypes.CLEAR_USER, null, { root: true });
            resolve();
        });
    }
}

const mutations = {
    [mutationTypes.LOGIN]: (state, data) => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('token', data.idToken);
            window.localStorage.setItem('userId', data.localId);
            window.localStorage.setItem('tokenExpiration', data.expiration);
        }
        state.isAuthenticated = true;
        state.token = data.idToken;
        state.userId = data.localId;
    },
    [mutationTypes.LOGOUT]: (state) => {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('userId');
            window.localStorage.removeItem('tokenExpiration');
        }
        state.isAuthenticated = false;
        state.token = null;
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
        const expiration = window.localStorage.getItem('tokenExpiration');
        const token = window.localStorage.getItem('token');
        const userId = window.localStorage.getItem('userId');        
        const expiresIn = parseInt(expiration) - new Date().getTime();
        if (token !== null && expiration !== null && expiresIn > 0) {
            store.state.token = token;
            store.state.userId = userId;
            store.state.isAuthenticated = true;
            store.dispatch('setLogoutTimer', expiresIn);
        }
    })
}

export default store;