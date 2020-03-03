export default {
  data: () => {
    return {
      window: {
        width: ''
      }
    };
  },
  created () {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize () {
      this.window.width = window.innerWidth;
    }
  }
};