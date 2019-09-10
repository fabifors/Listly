<template>
  <li class="todos__item" v-bind:class="{ 'marked-done':todo.done }">
    <div class="todos__item__content" @click="markDone(todo)">
      <input type="checkbox" class="todos__item__content__done" />
      <input
        v-if="todo.editing"
        ref="editing"
        type="text"
        class="todos__item__content__edit"
        v-model="edit"
      />
      <span v-else class="todos__item__content__text">{{ todo.content }}</span>
    </div>

    <div class="todos__item__actions">
      <i v-if="todo.editing" class="fas fa-save" @click="saveTodo(todo, edit)"></i>
      <i v-else class="fas fa-edit" @click="editTodo(todo)"></i>

      <i class="fas fa-times" @click="remove(todo)"></i>
    </div>
  </li>
</template>

<script>
import { mapActions } from 'vuex'
import { setTimeout } from 'timers'

export default {
  name: 'Todo',
  props: {
    todo: Object
  },
  data: () => {
    return {
      edit: ''
    }
  },
  methods: {
    ...mapActions({
      remove: 'removeTodo'
    }),
    editTodo(todo) {
      this.$store.dispatch('editTodo', todo)
      this.edit = todo.content
      setTimeout(() => {
        this.$refs.editing.focus()
      }, 25)
    },
    saveTodo(todo, edit) {
      this.$store.dispatch('saveTodo', { todo, update: edit })
    },
    markDone(todo) {
      if (!todo.editing) {
        this.$store.dispatch('markDone', todo)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.todos__item {
  color: hsl(248, 61%, 15%);

  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 0.5rem;
  background: hsl(226, 30%, 90%);
  border-radius: 5px;
  &__content {
    text-align: left;
    flex-grow: 1;
    padding: 0.75rem;
    &__done {
      position: relative;
      padding: 0.5rem;
      margin-right: 1rem;
      &::before {
        position: absolute;
        top: -5px;
        left: -5px;
        display: block;
        content: '';
        width: 22px;
        height: 22px;
        border: 2px solid slateblue;
        border-radius: 5px;
        background: hsl(226, 30%, 90%);
      }
    }

    &__text {
      line-height: 1.4em;
      font-weight: 600;
    }

    &__edit {
      font-size: 1em;
      font-family: 'Proxima Nova';
      font-weight: 600;
      line-height: 1.4em;
      border: none;
      padding: 0;
      background: none;
    }
  }

  /* Icons for actions */
  &__actions {
    i {
      padding: 0.75rem;
      color: slateblue;
    }
  }

  /* If marked done */
  &.marked-done {
    .todos__item__content__text {
      color: rgb(107, 100, 153);
      text-decoration: line-through;
    }
    .todos__item__content__done::before {
      background: slateblue;
    }
  }
}
</style>