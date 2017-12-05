const state = {
    funds: 10000,
    stocks: []
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
            state.funds += record.price * quantity;
        }

        if (record.quantity <= 0)
            state.stocks.splice(state.stocks.indexOf(record), 1);
    },
    'SET_FUNDS'(state, funds) {
        state.funds = funds;
    },
    'SET_PORTFOLIO_STOCKS'(state, stocks) {
        state.stocks = stocks
    }
}

const actions = {
    buyStock: (context, stock) => context.commit('BUY_STOCKS', stock),
    sellStock: ({ commit }, stock) => commit('SELL_STOCKS', stock),
    setFunds: ({commit}, funds) => commit('SET_FUNDS', funds),
    setPortfolioStocks: ({commit}, stocks) => commit('SET_PORTFOLIO_STOCKS', stocks ? stocks : [])
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
}

export default {
    state,
    mutations,
    actions,
    getters
}