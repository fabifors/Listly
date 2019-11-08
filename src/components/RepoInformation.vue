<template>
  <div 
    class="info-container"  
    @mouseleave="hoverEnd()"
  >
    <i 
      class="info-container__icon far fa-info-circle" 
      @mouseover="hoverStart()" 
    />
    <div :class="`info-container__inner${state.hover ? ' hover-active': ''}`">
      <h3>About this project</h3>
      <p>
        This project was created by 
        <a 
          href="https://github.com/fabifors" 
          target="_blank"
        >
          fabifors
        </a> and here is 
        <a 
          href="https://github.com/fabifors/vue-todo" 
          target="_blank"
        >
          the link for the public repo
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RepoInformation',
  data: () => {
    return {
      state: {
        hover: false
      }
    };
  },
  methods: {
    hoverStart() {
      this.state.hover = true;
    },
    hoverEnd() {
      this.state.hover = false;
    }
  }
};
</script>

<style lang="scss" scoped>

.info-container {
  width: 100%;
  // padding: 1rem;
  position: fixed;
  bottom: 0rem;
  right: 0rem;

  &__icon {
    z-index: 999;
    color: var(--text-color-dark--muted);
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: 2px dashed var(--text-color-dark--muted);
    border-radius: 10px;
  }

  &__inner {
    border-radius: 0px;
    color:var(--text-color-light);
    padding: 1em 1.25em;
    background-image: linear-gradient(to right bottom, var(--text-color-dark--muted), var(--text-color-dark));
    clip-path: circle(0% at 98% 75%);
    transition: clip-path 0.5s;
    height: 100%;
    padding: 2rem 1.5rem;

    h3 {
      margin-bottom: 0.5rem;
    }

    a {
      color: var(--text-color-light);
      font-weight: 600;
      display: inline-block;
      text-decoration: none;
      transition: padding 300ms, color 200ms ease-in 200ms;
      position:relative;

      &::after {
        position: absolute;
        content: '';
        display: block;
        width: calc(100% - 5px);
        height: 10px;
        margin-left: 7px;
        margin-top: -7px;
        border-radius: 5px;
        background: var(--background-color);
        opacity: 0.2;
        transition: transform 300ms, padding 200ms ease 200ms;
      }

      &:hover {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        color: hsl(283, 93%, 80%);
        
        &::after {
          transform: translateX(-17px) translateY(-12px);
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