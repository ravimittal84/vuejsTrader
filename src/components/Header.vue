<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link class="navbar-brand" to="/">Stock Trader</router-link>
            </div>

            <div class="collapse navbar-collapse">
                <ul v-if="$store.state.isAuthenticated" class="nav navbar-nav">
                    <router-link tag="li" to="/portfolio">
                        <a>Portfolio</a>
                    </router-link>
                    <router-link tag="li" to="/stocks">
                        <a>Stocks</a>
                    </router-link>
                    <router-link tag="li" to="/dashboard">
                        <a>Dashboard</a>
                    </router-link>
                </ul>

                <ul v-if="$store.state.isAuthenticated" class="nav navbar-nav navbar-right">
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
                            Settings
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu" role="menu">
                            <li>
                                <a href="#" @click.prevent="saveData({funds, stockPortfolio, stocks})">Save Data</a>
                            </li>
                            <li>
                                <a href="#" @click.prevent="loadData">Load Data</a>
                            </li>
                            <li>
                                <a href="#" @click.prevent="onSignOut">Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul v-else class="nav navbar-nav navbar-right">
                    <router-link tag="li" to="/signup">
                        <a>Sign Up</a>
                    </router-link>
                    <router-link tag="li" to="/signin">
                        <a>Sign In</a>
                    </router-link>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import StockData from '../data/stocks';
import { mapGetters, mapActions } from 'vuex';
import router from '../router';
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
            'saveData',
            'signOutUser'
        ]),
        onSignOut() {
            this.signOutUser()
                .then(res => {
                    router.replace('/signin');
                    this.open = false;
                })
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
