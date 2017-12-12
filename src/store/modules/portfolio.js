import appService from '../../app.service';
import * as mutationTypes from '../mutation-types';

const state = {
    funds: 10000,
    stocks: [],
    user: null
}

const mutations = {
    [mutationTypes.BUY_STOCKS]: (state, { id, price, quantity }) => {
        const record = state.stocks.find(el => el.id == id);
        if (record) {
            record.quantity += quantity;
        }
        else {
            state.stocks.push({ id, price, quantity });
        }
        state.funds -= price * quantity;
    },
    [mutationTypes.SELL_STOCKS]: (state, { id, price, quantity }) => {
        const record = state.stocks.find(el => el.id == id);
        if (record && record.quantity >= quantity) {
            record.quantity -= quantity;
            state.funds += record.price * quantity; // BUG: this adds funds based on the buy price, not the actual sell price
        }

        if (record.quantity <= 0)
            state.stocks.splice(state.stocks.indexOf(record), 1);
    },
    [mutationTypes.SET_FUNDS]: (state, funds) => state.funds = funds,
    [mutationTypes.SET_PORTFOLIO_STOCKS]: (state, stocks) => state.stocks = stocks,
    [mutationTypes.SET_USER]: (state, user) => state.user = user,
    [mutationTypes.CLEAR_USER]: (state) => state.user = null
}

const actions = {
    buyStock: (context, stock) => context.commit(mutationTypes.BUY_STOCKS, stock),
    sellStock: ({ commit }, stock) => commit(mutationTypes.SELL_STOCKS, stock),
    loadData: async ({ commit, state }) => {
        var data = await appService.loadData();

        commit(mutationTypes.SET_STOCKS, data.stocks);
        commit(mutationTypes.SET_FUNDS, data.funds);
        commit(mutationTypes.SET_PORTFOLIO_STOCKS, data.stockPortfolio);
    },
    saveData: async ({ commit }, data) => {
        await appService.saveData(data);
    },
    fetchUsers: async ({ commit }) => {
        if (state.user === null) {
            var data = await appService.fetchUsers();
            let users = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    const user = data[key];
                    user.id = key;
                    users.push(user);
                }
            }
            commit(mutationTypes.SET_USER, users[0]);
        }
    }
}

const getters = {
    stockPortfolio: (state, getters) => state.stocks.map(stock => {
        const record = getters.stocks.find(el => el.id == stock.id);
        return {
            id: stock.id,
            quantity: stock.quantity,
            name: record.name,
            price: record.price
        }
    }),
    funds: state => state.funds,
    equity: (state, getters) => state.stocks.reduce((acc, stock) => {
        const record = getters.stocks.find(el => el.id == stock.id);
        return acc + (record.price * stock.quantity);
    }, 0),
    getUser: state => state.user
}

export default {
    state,
    mutations,
    actions,
    getters
}