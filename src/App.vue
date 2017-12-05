<template>
  <div id="app">
    <app-header></app-header>
    <div class="container-fluid">
      <transition mode="out-in" name="slide">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import Header from './components/Header';

export default {
  components: {
    'appHeader': Header
  }
}
</script>

<style>
  .slide-enter-active{
    animation: slide-in 150ms ease-out forwards;
  }

  .slide-leave-active {
    animation: slide-out 150ms ease-out forwards;
  }

  @keyframes slide-in {
    from {
      transform: translateX(-30px);
      opacity: 0;
    }

    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-out {
    from {
      transform: translateX(0);
      opacity: 1;
    }

    to {
      transform: translateX(30px);
      opacity: 0;
    }
  }
</style>
