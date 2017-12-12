<template>
  <div class="row text-center">
    <h1>Welcome!</h1>
    <div v-if="!$store.state.isAuthenticated">
      <router-link class="btn btn-primary" to="/signup">Sign Up</router-link>
      <router-link class="btn btn-primary" to="/signin">Sign In</router-link>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>
