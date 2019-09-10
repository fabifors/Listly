<template>
  <div id="app">
    <div class="input">
      <form @submit.prevent="addTodo(newTodo)">
        <label for="todo">Add a todo</label>
        <input type="text" id="todo" v-model="newTodo.content" />
        <button type="submit">Add todo</button>
      </form>
    </div>
    <div class="todo-holder">
      <to-dos />
    </div>
  </div>
</template>

<script>
import Todos from './components/Todos.vue'

export default {
  name: 'app',
  components: {
    'to-dos': Todos
  },
  data: () => {
    return {
      newTodo: {
        content: ''
      }
    }
  },
  methods: {
    addTodo(todo) {
      this.$store.dispatch('addTodo', todo)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Proxima Nova', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  * {
    box-sizing: border-box;
  }
}

.todo-holder {
  max-width: 700px;
  padding: 1.5rem;
  margin-right: auto;
  margin-left: auto;
}
</style>
