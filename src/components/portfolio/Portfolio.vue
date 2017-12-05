<template>
  <div>
      <stock :id='stock.id' :name='stock.name' :quantity='stock.quantity' :price='stock.price' v-for="stock in stocks" :key="stock.id"></stock>
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
            return this.$store.getters.stockPortfolio;
        }
    }
}
</script>
