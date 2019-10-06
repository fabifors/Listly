<template>
  <li
    class="todos__item"
    :class="{ 'marked-done':todo.done }"
  >
  <div class="todos__item__actions">
    <i
      v-handle
      class="handle fas fa-grip-vertical"
    />
    <input
      v-model="todo.done" 
      type="checkbox" 
      :class="`todos__item__content__done ${dragging ? 'no-transition': null}`"
    >
  </div>
    <div
      class="todos__item__content"
      @click="markDone(todo)"
    >
      
      <form
        v-if="todo.editing"
        class="edit-form"
        @submit.prevent="saveTodo(todo, edit)"
      >
        <input
          ref="editing"
          v-model="edit"
          type="text"
          class="todos__item__content__edit"
          autocomplete="off" 
        >
      </form>
      <span
        v-else
        class="todos__item__content__text"
      >{{ todo.content }}</span>
    </div>

    <div class="todos__item__actions">
      <i
        v-if="todo.editing"
        class="fas fa-save"
        @click="saveTodo(todo, edit)"
      />
      <i
        v-else
        class="fas fa-edit"
        @click="editTodo(todo)"
      />

      <i
        class="fas fa-times"
        @click="remove(todo)"
      />
    </div>
  </li>
</template>

<script>
import { mapActions } from 'vuex';
import { setTimeout } from 'timers';
import { ElementMixin, HandleDirective } from 'vue-slicksort';

export default {
  name: 'Todo',

  directives: {
    handle: HandleDirective
  },

  mixins: [ ElementMixin ],

  props: {
    todo: {
      type: Object,
      default: () => {
        return {};
      },
      required: true
    },
    dragging: {
      type: Boolean,
      default: false
    },
    listId: {
      type: String,
      required: true
    }
  },

  data: () => {
    return {
      edit: ''
    };
  },

  methods: {
    remove(todo) {
      const listId = this.listId
      this.$store.dispatch('removeTodo', {todo, listId});
    },

    editTodo(todo) {
      const listId = this.listId
      this.$store.dispatch('editTodo', {todo, listId});
      this.edit = todo.content;
      setTimeout(() => {
        this.$refs.editing.focus();
      }, 25);
    },

    saveTodo(todo, edit) {
      const listId = this.listId
      const update = this.edit
      this.$store.dispatch('saveTodo', { todo, update, listId });
    },

    markDone(todo) {
      if (!todo.editing) {
        const listId = this.listId
        this.$store.dispatch('markDone', { todo, listId });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.no-transition::before {
  transition: none !important;
}

.handle {
  color: var(--text-color-medium);
  display: inline-block;
  padding: 0.15em 0.4em;
  margin-right: 0.4rem;
}

.todos__item {
  // clip-path: inset-rectangle(0%, 0%, 0%, 10%);
  font-family: "Proxima Nova", Helvetica, Arial, sans-serif;
  color: var(--text-color-dark);

  display: flex;
  flex-direction: row;
  align-items: flex-start;

  margin-bottom: 0.75rem;
  background: var(--background-color-light);
  border-radius: 5px;
  
  &__content {
    text-align: left;
    flex-grow: 1;
    padding: 0.70rem 0.25rem 0.7rem;

    &__text {
      line-height: 1.4em;
      font-weight: 600;
      flex-grow: 2;
    }

    .edit-form {
      display: inline-block;
      padding: 0;
      margin: 0;
      width: 100%;
    }

    &__edit {
      width: 100%;
      font-size: 1em;
      font-family: "Proxima Nova";
      font-weight: 600;
      line-height: 1.4em;
      border: none;
      padding: 0;
      background: none;
    }
  }

  /* Icons for actions */
  &__actions {
    display:flex;
    flex-direction: row;
    align-items: center;
    i {
      padding: 0.90rem 0.75rem;
      color: var(--text-color-medium);
    }
    .todos__item__content__done {
      position: relative;
      padding: 0.95rem 0.5rem;
      margin: 0 0.5rem 0 0;

      &::before {
        position: absolute;
        display: block;
        top: -4px;
        left: -4px;
        content: "";
        width: 15px;
        height: 15px;
        border: 2px solid var(--text-color-medium);
        border-radius: 5px;
        background: var(--background-color-light);
        transition: background 200ms ease-out, border 200ms ease-out;
      }
    }
  }

  /* If marked done */
  &.marked-done {
    .todos__item__content__text {
      color: var(--text-color-dark--muted);
      text-decoration: line-through;
    }

    .todos__item__content__done::before {
      background: var(--text-color-medium);
      border-color: var(--background-color-light);
    }
  }
}
</style>