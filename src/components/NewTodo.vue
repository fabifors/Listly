<template>
  <div class="new-todo">
    <h2 class="new-todo__heading">What should I do?</h2>
    <form class="new-todo__form" @submit.prevent="addTodo(content)">
      <label class="new-todo__form__label" for="todo">Add a todo</label>
      <div class="input-container">
        <input
          class="new-todo__form__input"
          type="text"
          id="todo"
          placeholder="Add todo"
          v-model="content"
        />
        <button class="new-todo__form__button" type="submit">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'New Todo',
  data: () => {
    return {
      content: ''
    }
  },
  methods: {
    addTodo(todo) {
      this.$store.dispatch('addTodo', todo)
      this.content = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.new-todo {
  color: hsl(248, 61%, 15%);
  padding: 1rem;
  &__heading {
    font-size: 3em;
    color: hsl(248, 61%, 25%);
  }
  &__form {
    display: flex;
    flex-direction: row;
    &__label {
      display: none;
    }
    .input-container {
      position: relative;
      width: 100%;
    }
    &__input {
      display: block;
      width: 100%;
      padding: 0.5rem 0.5rem 0.5rem 0.75rem;
      line-height: 1.4em;
      font-size: 1em;
      border: 2px solid;
      border-color: hsl(226, 30%, 85%);
      border-radius: 5px;
    }
    &__button {
      position: absolute;
      right: 0.5rem;
      top: 0.15rem;
      padding: 0.5rem;
      line-height: 1.4em;
      font-size: 1em;
      border: none;
      border-radius: 5px;
      background: none;
      color: hsl(226, 30%, 75%);
    }
  }
}
</style>