import * as mutationTypes from '../mutation-types';

const state = {
    stocks: []
}

const mutations = {
    [mutationTypes.SET_STOCKS] (state, stocks) {
        state.stocks = stocks;
    },
    [mutationTypes.RND_STOCKS] (state) {
        state.stocks.forEach(stock => {
            stock.price = Math.round(stock.price * (1 + (Math.random()/5 - 0.1)));
        });
    }
}

const actions = {
    randomizeStocks: ({commit}) => commit(mutationTypes.RND_STOCKS)    
}

const getters = {
    stocks: state => state.stocks
}

export default {
    state,
    mutations,
    actions,
    getters
}