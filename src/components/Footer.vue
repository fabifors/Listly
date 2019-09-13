<template>
  <footer class="footer layout-section">
    <div 
      class="info-container"  
      @mouseleave="hoverEnd()"
    >
      <i 
        class="info-container__icon far fa-info-circle" 
        @mouseover="hoverStart()" 
      />
      <div :class="`info-container__inner ${state.hover ? 'hover-active': null}`">
        <h3>About this project</h3>
        <p>This project was created by <a href="https://github.com/fabifors">fabifors</a> and here is <a href="https://github.com/fabifors/vue-todo">the link for the public repo</a></p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => {
    return {
      state: {
        hover: false
      }
    }
  },
  methods: {
    hoverStart() {
      this.state.hover = true
    },
    hoverEnd() {
      this.state.hover = false
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  color: slateblue;
  width: 100%;
}

.info-container {
  width: 100%;
  padding: 1rem;
  position: relative;

  &__icon {
    z-index: 999;
    color: slateblue;
    position: absolute;
    right: 24px;
    bottom: 23px;
    font-size: 1.5rem;
  }

  &__inner {
    border-radius: 5px;
    color: #fff;
    padding: 1em 1.25em;
    background: slateblue;
    clip-path: circle(0% at 97% 87%);
    transition: clip-path 0.5s;
    height: 100%;

    a {
      color: rgb(203, 225, 247);
      font-weight: 600;
      display: inline-block;
      text-decoration: none;
      transition: padding 300ms, color 300ms ease-in 200ms;
      position:relative;

      &::after {
        position: absolute;
        content: '';
        display: block;
        width: calc(100% - 5px);
        height: 10px;
        margin-left: 2%;
        margin-top: -7px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.2);
        transition: transform 300ms, padding 200ms;
      }

      &:hover {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        color: rgb(145, 240, 216);
        &::after {
          transform: translateX(-12px) translateY(-12px) scaleY(1.5);
          padding: 5px;
        }
      }
    }
  }

  .hover-active {
    clip-path: circle(75% at 50% 50%);
  }
}
</style>