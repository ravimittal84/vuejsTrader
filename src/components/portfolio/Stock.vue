<template>
  <div class="col-sm-6">
      <div class="panel panel-primary">
          <div class="panel-heading">
              <h3 class="panel-title">
                  {{name}} <small class="pull-right">(Quantity: {{quantity}} | Price: {{price | currency}})</small>
              </h3>
          </div>
          <div class="panel-body">
              <div class="pull-left">
                  <input type="number" v-model.number="sellQuantity" @input="onInput" class="form-control" placeholder="quantity">
              </div>
              <div class="pull-right">
                  <button :disabled="sellQuantity < 1 || sellQuantity > quantity" class="btn btn-success" @click="sellStock">Sell</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'quantity', 'price'],
  data() {
    return {
      sellQuantity: this.quantity
    }
  },
  methods: {
      // TODO: check insufficient quantity, disable sell button.
    sellStock() {
      this.$store.dispatch('sellStock', {id: this.id, quantity: this.sellQuantity});
    },
    onInput() {
          this.sellQuantity = this.quantity > 0 ? this.sellQuantity : 0;
          this.sellQuantity = this.sellQuantity <= this.quantity ? this.sellQuantity : this.quantity;
    }
  }
}
</script>
