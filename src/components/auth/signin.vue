<template>
  <div id="signin">
    <div class="signin-form">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input  class="form-control"
                  type="email"
                  id="email"
                  v-model="email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input  class="form-control"
                  type="password"
                  id="password"
                  v-model="password">
        </div>
        <div class="row">
          <div class="col-xs-12">
          <button class="btn btn-primary pull-right" type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      onSubmit () {
        const formData = {
          email: this.email,
          password: this.password,
        }
        this.$store.dispatch('signInUser', formData);
      }
    }
  }
</script>

<style scoped>
  .signin-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

</style>