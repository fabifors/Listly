<template>
  <div class="new-list">
    <div class="popup-wrapper">
      <section class="popup">
        <h2 class="popup__title">
          Add new list
        </h2>
        <input
          v-model="title"
          class="popup__input" required
        >
      </section>
    </div>

    <button
      class="new-list__btn"
      @click="addNewList"
    >
      <i class="fad fa-plus" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'NewList',
  data() {
    return {
      title: 'New list'
    };
  },
  methods: {
    addNewList() {
      this.dispatch('addList', this.title);
    }
  }
};
</script>

<style lang="scss" scoped>
.new-list {
  
  &__btn {
    position: fixed;
    bottom: 5%;
    right: 10%;
    border: none;
    background: var(--background-color);
    border-radius: 50%;
    font-size: 2em;
    padding: 0.5rem 0.75rem;
    box-shadow: 0 10px 15px var(--box-shadow);
  }
  .popup-wrapper {
    background: rgba(0,0,0,0.1);
    bottom: 10%;
    right: 15%;
    position: fixed;
    

    .popup{
      width: 100%;
      margin: 0 auto;
      padding: 1rem 1.5rem;
      background: var(--white-color);
      border-radius: 5px;
      box-shadow: 0 10px 30px var(--box-shadow);

      &__title {
        font-size: 1.25em;
        color: var(--text-color-dark--muted);
        text-transform: uppercase;
        margin-bottom: 0.5rem
      }

      &__input {
        width: 100%;
        font-family: 'Proxima Nova';
        font-size: 1.5em;
        border: 2px dashed var(--background-color);
        border-radius: 5px;
        background: none;
        color: var(--text-color-dark);
        font-weight: bold;
        padding: 0.5rem 0.75rem;
        margin-bottom: 1.5rem;
      }
    }
  }
}

</style>