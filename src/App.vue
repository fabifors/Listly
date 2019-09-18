<template>
  <div id="app">
    <div class="main-wrapper">
      <nav-bar />
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'TodoApp',
  components: {
    'nav-bar': Navbar
  },
  mounted () {
    this.$store.dispatch('init');
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body { margin: 0;}

#app {
  font-family: 'Proxima Nova', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  padding-bottom: 5rem;
}

.main-wrapper {
  max-width: 750px;
  margin: 0 auto;
  position: relative;
}

.layout-section {
  max-width: 700px;
  padding: 0 0.5rem;
  margin-right: auto;
  margin-left: auto;

  @media screen and (min-width: 500px) {
    padding: 0 1.5rem;
  }
}
</style>
