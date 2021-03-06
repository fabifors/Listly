<template>
  <div id="app">
    <div class="main-wrapper">
      <nav-bar />
      <transition
        name="page"
        mode="out-in"
        @beforeLeave="beforeLeave"
        @enter="enter"
        @afterEnter="afterEnter"
      >
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'TodoApp',
  components: {
    'nav-bar': Navbar,
  },
  data: () => {
    return {
      prevHeight: 0,
    };
  },
  created() {
    this.$store.dispatch('lists/initLists', { root: true });
    this.$store.dispatch('todos/initTodos', { root: true });
    this.$store.dispatch('categories/initCategories', { root: true });
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = 'auto';
    },
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
  --background-color--lighter: hsl(251, 42%, 90%);
  --background-color-light: hsl(251, 20%, 94%);
  --white-color: hsl(240, 25%, 98%);

  --text-color-muted--light: hsla(251, 13%, 52%, 0.5);
  --text-color-muted--medium: hsla(251, 13%, 52%, 0.8);

  --box-shadow: hsla(251, 28%, 27%, 0.16);
}

* {
  box-sizing: border-box;
  outline-color: #fff;
  margin: 0;
  padding: 0;
}

.sr-only {
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
  -webkit-clip-path: inset(50%) !important;
    clip-path: inset(50%) !important;  /* 2 */
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;            /* 3 */
}

input[type="text"]:focus{
  outline: 2px dashed var(--background-color);
  outline-offset: 2px;
}

body { margin: 0;}

.page-enter-active {
  height: 100%;
  animation: page-enter 0.4s;
}
.page-leave-active {
  height: 100%;
  animation: page-leave 0.4s;
}


@keyframes page-enter {
  0% {
    opacity: 0;
    transform: translateY(10%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}

@keyframes page-leave {
  0% {
    opacity: 1;
    transform: translateY(0%);
  }
  100% {
    opacity: 0;
    transform: translateY(10%);
  }
}

#app {
  font-family: 'Proxima Nova', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color-dark);
  min-height: 100vh;
  // padding-bottom: 5rem;
  overflow: hidden;
}

#app *:not(i) {
  font-family: 'Proxima Nova', Helvetica, Arial, sans-serif;
}

.main-wrapper {
  max-width: 950px;
  margin: 0 auto;
}

.desktop-only {
  display: none;
  @media screen and (min-width: 500px) {
    display: block;
  }
}

.layout-section {
  max-width: 900px;
  padding: 0rem 1rem;
  margin-right: auto;
  margin-left: auto;

  @media screen and (min-width: 500px) {
    padding: 2rem 1.5rem;
  }
}
</style>
