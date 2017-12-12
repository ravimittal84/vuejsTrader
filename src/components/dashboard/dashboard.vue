<template>
  <div id="dashboard">
    <h1>Dashboard</h1>
    <!-- <p>You should only get here if you're authenticated!</p> -->
    <p v-if="hasUser">Your email: {{user.email}}</p>
    <p v-else>Fetching user information...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ''
    }
  },
  created() {
    this.$store.dispatch('fetchUsers');    
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    hasUser() {
      return this.user !== null;
    }
  }
}
</script>


<style scoped>
  h1, p {
    text-align: center;
  }

  p {
    color: red;
  }
</style>