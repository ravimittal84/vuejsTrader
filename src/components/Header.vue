<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link class="navbar-brand" to="/">Stock Trader</router-link>
            </div>

            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <router-link tag="li" to="/portfolio">
                        <a>Portfolio</a>
                    </router-link>
                    <router-link tag="li" to="/stocks">
                        <a>Stocks</a>
                    </router-link>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a>Equity: {{equity | currency}}</a>
                    </li>
                    <li>
                        <a>Funds: {{funds | currency}}</a>
                    </li>
                    <li>
                        <a @click="update">Update Price</a>
                    </li>
                    <li class="dropdown" :class="{'open' : open}">
                        <a href="#" @click.prevent="open = !open" class="dropdown-toggle">
                            Dropdown
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu" role="menu">
                            <li>
                                <a href="#" @click.prevent="save">Save Data</a>
                            </li>
                            <li>
                                <a href="#" @click.prevent="load">Load Data</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import StockData from '../data/stocks';
import { mapGetters, mapActions } from 'vuex';
import appService from '../app.service';
export default {
    data() {
        return {
            open: false
        };
    },
    methods: {
        ...mapActions([
            'randomizeStocks',
            'setStock',
            'setFunds',
            'setPortfolioStocks'
        ]),
        update() {
            this.randomizeStocks();
        },
        save() {
            appService.saveData({
                funds: this.funds,
                stockPortfolio: this.stockPortfolio,
                stocks: this.stocks
            });
            this.open = false;
        },
        load() {
            appService.loadData()
                .then(data => {
                    this.setStock(data.stocks);
                    this.setFunds(data.funds);
                    this.setPortfolioStocks(data.stockPortfolio);
                });
            this.open = false;
        }
    },
    computed: {
        ...mapGetters([
            'funds',
            'equity',
            'stockPortfolio',
            'stocks'
        ])
    }
}
</script>
