<template>
    <div class="container-fluid">
        <div v-if="stocks.length > 0" class="row">
            <stock v-for="stock in stocks" :key="stock.id" :stock="stock"></stock>
        </div>
        <div class="row" v-else>
            <span class="alert alert-danger">No stocks to display.</span>
        </div>
    </div>
</template>

<script>
import Stock from './Stock';
export default {
    components: {
        'stock': Stock
    },
    computed: {
        stocks() {
            return this.$store.getters.stocks;
        }
    }
}
</script>
