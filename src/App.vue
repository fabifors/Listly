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
  created() {
    this.$store.dispatch('init');
  }
};
</script>

<style lang="scss">
:root {
  --primary-color: hsl(251, 71%, 57%);
  --text-color-dark: hsl(251, 28%, 27%);
  --text-color-medium: hsl(251, 26%, 50%);
  --text-color-medium-lighter: hsl(251, 10%, 70%);
  --text-color-light: hsl(251, 20%, 94%);
  --text-color-dark--muted: hsl(251, 13%, 52%);
  --background-color: hsl(251, 42%, 87%);
  --background-color-light: hsl(251, 20%, 94%);
  --white-color: hsl(240, 25%, 98%);
}

* {
  box-sizing: border-box;
  outline-color: #fff;
}

input:focus {
  outline: 2px dashed var(--white-color);
  outline-offset: 2px;
}

body { margin: 0;}

#app {
  font-family: 'Proxima Nova', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color-dark);
  min-height: 100vh;
  padding-bottom: 5rem;
  overflow: hidden;
}

.main-wrapper {
  max-width: 750px;
  margin: 0 auto;
  position: relative;
}

.layout-section {
  max-width: 800px;
  padding: 0 0.5rem;
  margin-right: auto;
  margin-left: auto;

  @media screen and (min-width: 500px) {
    padding: 0 1.5rem;
  }
}
</style>
