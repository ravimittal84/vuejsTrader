<template>
    <div class="col-sm-6">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{stock.name}}
                    <small class="pull-right">(Price: {{stock.price | currency}})</small>
                </h3>
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <div class="form-group" :class="{'has-error' : nofunds}">
                        <input type="number" 
                        v-model.number="quantity" @input="onInput" 
                        class="form-control" placeholder="quantity">
                    </div>
                </div>
                <div class="pull-right">
                    <button :disabled="nofunds || quantity < 1" class="btn btn-success" @click="buyStock">Buy</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['stock'],
    data() {
        return {
            quantity: 0
        };
    },
    methods: {
        onInput() {
            this.stock.quantity = this.quantity > 0 ? this.quantity : 0;
        },
        buyStock() {
            if (!this.nofunds) {
                this.$store.dispatch("buyStock", this.stock);
                this.quantity = 0;
            } else {
                console.log("Insufficient funds.")
            }
        }
    },
    computed: {
        funds() {
            return this.$store.getters.funds;
        },
        nofunds() {
            return this.funds < this.quantity * this.stock.price;
        }
    }
}
</script>
