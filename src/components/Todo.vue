<template>
  <li
    class="todos__item"
    :class="{ 'marked-done':todo.done }"
  >
    <div
      class="todos__item__content"
      @click="markDone(todo)"
    >
      <i
        v-handle
        class="handle fas fa-grip-vertical"
      />
      <input 
        v-model="todo.done" 
        type="checkbox" 
        :class="`todos__item__content__done ${dragging ? 'no-transition': null}`"
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
      }
    },
    dragging: {
      type: Boolean,
      default: false
    }
  },

  data: () => {
    return {
      edit: ''
    };
  },

  methods: {

    ...mapActions({
      remove: 'removeTodo'
    }),

    editTodo(todo) {
      this.$store.dispatch('editTodo', todo);
      this.edit = todo.content;
      setTimeout(() => {
        this.$refs.editing.focus();
      }, 25);
    },

    saveTodo(todo, edit) {
      this.$store.dispatch('saveTodo', { todo, update: edit });
    },

    markDone(todo) {
      if (!todo.editing) {
        this.$store.dispatch('markDone', todo);
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
  color: slateblue;
  display: inline-block;
  padding: 0.15em 0.4em;
  margin-right: 0.4rem;
}

.todos__item {
  clip-path: inset-rectangle(0%, 0%, 0%, 10%);
  font-family: "Proxima Nova" Helvetica, Arial, sans-serif;
  color: hsl(248, 61%, 15%);

  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 0.75rem;
  background: hsl(226, 30%, 93%);
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
        display: block;
        top: -2px;
        left: -2px;
        content: "";
        width: 15px;
        height: 15px;
        border: 2px solid slateblue;
        border-radius: 5px;
        background: hsl(226, 30%, 90%);
        transition: background 200ms ease-out, border 200ms ease-out;
      }
    }

    &__text {
      line-height: 1.4em;
      font-weight: 600;
    }

    .edit-form {
      display: inline-block;
      padding: 0;
      margin: 0;
    }

    &__edit {
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
      border-color: hsl(228, 26%, 93%);
    }
  }
}
</style>