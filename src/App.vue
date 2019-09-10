<template>
  <div id="app">
    <div class="input">
      <form @submit.prevent="addTodo()">
        <label for="todo">Add a todo</label>
        <input type="text" id="todo" v-model="newTodo.content" />
        <button type="submit">Add todo</button>
      </form>
    </div>
    <Todos :data="todos" />
  </div>
</template>

<script>
import Todos from './components/Todos.vue'

export default {
  name: 'app',
  components: {
    Todos
  },
  data: () => {
    return {
      newTodo: {
        content: '',
        checked: false
      },
      todos: [
        {
          content: '1st todo',
          checked: false
        }
      ]
    }
  },
  methods: {
    addTodo() {
      this.todos.push({ ...this.newTodo })
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
