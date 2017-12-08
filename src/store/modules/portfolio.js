import appService from '../../app.service';

const state = {
    funds: 10000,
    stocks: [],
    user: null
}

const mutations = {
    'BUY_STOCKS'(state, { id, price, quantity }) {
        const record = state.stocks.find(el => el.id == id);
        if (record) {
            record.quantity += quantity;
        }
        else {
            state.stocks.push({ id, price, quantity });
        }
        state.funds -= price * quantity;
    },
    'SELL_STOCKS'(state, { id, price, quantity }) {
        const record = state.stocks.find(el => el.id == id);
        if (record && record.quantity >= quantity) {
            record.quantity -= quantity;
            state.funds += record.price * quantity; // BUG: this adds funds based on the buy price, not the actual sell price
        }

        if (record.quantity <= 0)
            state.stocks.splice(state.stocks.indexOf(record), 1);
    },
    'SET_FUNDS'(state, funds) {
        state.funds = funds;
    },
    'SET_PORTFOLIO_STOCKS'(state, stocks) {
        state.stocks = stocks
    },
    'SET_USER'(state, user) {
        state.user = user;
    }
}

const actions = {
    buyStock: (context, stock) => context.commit('BUY_STOCKS', stock),
    sellStock: ({ commit }, stock) => commit('SELL_STOCKS', stock),
    async loadData({ commit }) {
        var data = await appService.loadData();

        commit('SET_STOCKS', data.stocks);
        commit('SET_FUNDS', data.funds);
        commit('SET_PORTFOLIO_STOCKS', data.stockPortfolio);
    },
    async saveData({ commit }, data) {
        await appService.saveData(data);
    },
    fetchUsers({ commit }) {
        appService.fetchUsers().then(data => {
            let users = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    const user = data[key];
                    user.id = key;
                    users.push(user);
                }
            }
            commit('SET_USER', users[0]);
        });
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