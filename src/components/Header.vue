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
                    <li>
                        <router-link to="/signup">Sign Up</router-link>
                    </li>
                    <li>
                        <router-link to="/signin">Sign In</router-link>
                    </li>
                    <li>
                        <router-link to="/dashboard">Dashboard</router-link>
                    </li>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a>Equity: {{equity | currency}}</a>
                    </li>
                    <li>
                        <a>Funds: {{funds | currency}}</a>
                    </li>
                    <li>
                        <a @click="randomizeStocks">Update Price</a>
                    </li>
                    <li class="dropdown" @mouseover="open = true" @mouseout="open = false" :class="{'open' : open}">
                        <a href="#" class="dropdown-toggle">
                            Dropdown
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu" role="menu">
                            <li>
                                <a href="#" @click.prevent="saveData({funds, stockPortfolio, stocks})">Save Data</a>
                            </li>
                            <li>
                                <a href="#" @click.prevent="loadData">Load Data</a>
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
export default {
    data() {
        return {
            open: false
        };
    },
    methods: {
        ...mapActions([
            'randomizeStocks',
            'loadData',
            'saveData'
        ])
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
