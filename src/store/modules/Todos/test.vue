<template>
  <div class="container">
    <ul>
      <li v-for="(todo, i) in todosByList" :key="todo.id">
        <input type="checkbox" :id="`todo-${i}`" @click="markTodo(todo.id)" v-model="todo.done" />
        <label v-if="!todo.editing" :for="`todo-${i}`">{{ todo.content }}</label>
        <input v-else type="text" v-model="edit" />
        <button @click="removeTodo(todo.id)">Remove</button>

        <button v-if="!todo.editing" @click="editTodo(todo.id)">Edit</button>
        <button v-else @click="saveTodo(todo.id)">Save</button>
      </li>
    </ul>

    <input type="text" v-model="text" />
    <button @click="addNewTodo">Add Todo</button>

    <p class="message" v-if="message.bool">{{ message.content }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TestingTodos',
  data:() => {
    return {
      text: '',
      edit: '',
      list_id: 'adwa-awd-a-2-2d-',
      message: {
        content: '',
        bool: false
      },
    }
  },
  computed: {
    ...mapGetters({
      todos: 'todos/getAllTodos'
    }),
    todosByList () {
      return this.$store.getters['todos/getListTodos'](this.list_id);
    }
  },
  methods: {
    addNewTodo () {
      const payload = {
        content: this.text,
        list_id: this.list_id
      }
      this.$store.dispatch('todos/addTodo', payload, { root: true }).then(() => {
        this.errorMsg('Added Todo', 500)
      });
    },

    markTodo (todo_id) {
      const todo = this.todosByList.find(todo => todo.id === todo_id);
      console.log(todo)
      if (todo) {
        if (!todo.done) this.$store.dispatch('todos/markDone', todo.id)
        if (todo.done) this.$store.dispatch('todos/unmarkDone', todo.id)
      } else {
        this.errorMsg('Something went wrong', 1000)
      }
    },

    removeTodo (todo_id) {
      this.$store.dispatch('todos/removeTodo', todo_id, { root: true })
        .then(() => {
          this.errorMsg('Removed todo', 500);
        })
    },

    editTodo (todo_id) {
      this.$store.dispatch('todos/editTodo', todo_id)
        .then(() => {
          this.errorMsg('Editing', 1000);
        })
    },

    saveTodo (todo_id) {
      const payload = {
        todo_id,
        content: this.edit
      }
      this.$store.dispatch('todos/saveTodo', payload)
        .then(() => {
          this.errorMsg('Editing', 1000);
        })
    },

    errorMsg(msg, delay) {
      this.message.content = msg;
      this.message.bool = true;
      setTimeout(() => {
        this.message.bool = false;
        this.message.content = ''
      }, delay)
    },
  }
}
</script>

<style lang="scss" scoped>
.message {
  padding: 0.5rem;
  background: lightyellow;
  border-radius: 5px;
}
ul {
  padding: 0rem;
  li {
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    label {
      margin-right: 0.5rem;
      margin-left: 0.5rem;
    }
    input[type="text"] {
      margin-right: 0.5rem;
      margin-left: 0.5rem;
    }
    button:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
}
</style>