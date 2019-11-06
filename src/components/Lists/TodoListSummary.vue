<template>
  <ul class="todo-list__summary">
    <li 
      v-for="(todo, i) in todos"
      :key="todo.id"
      :class="`todo-list__summary__item ${todo.done ? 'marked-done' : ''}`" 
    >
      <label
        :for="`summary-item-${i}`"
        class="sr-only"
      >Mark as done</label>
      <input
        :id="`summary-item-${i}`"
        class="todo-list__summary__item__checkbox"
        type="checkbox"
        @click="markAsDone(todo)"
      >
      <span class="todo-list__summary__item__content">{{ todo.content }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TodoListSummary',
  props: {
    todos: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },

  methods: {
    markAsDone (todo) {
      if (!todo.done) {
        this.$store.dispatch('todos/markDone', todo.id, { root: true });
      } else {
        this.$store.dispatch('todos/unmarkDone', todo.id, { root: true });
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.todo-list {
  &__summary {
    flex-grow: 2;
    list-style: none;
    padding: 0;
    margin-bottom: 1.25rem;
    &__item {
      padding: 0.1rem;

      &__checkbox {
        position: relative;
        margin-right: 0.75rem;
        outline: none;
        &::before {
          content: '';
          display: block;
          position: absolute;
          border-radius: 5px;
          left: 0;
          right: 0;
          height: 100%;
          width: 100%;
          background: var(--background-color-light);
          border: 2px solid var(--text-color-medium);
          transition: background 100ms ease-in;
        }
      }
      &.marked-done {
        .todo-list__summary__item {
          &__content {
            text-decoration: line-through;
            color: var(--text-color-dark--muted);
          }
          &__checkbox {
            &::before {
              background: var(--text-color-medium);
            }
          }
        }
        
      }
      &__content {
        font-weight: 600;
      }
      &:not(:last-child) {
      margin-bottom: 1rem;
      }
    }
  }
}
</style>