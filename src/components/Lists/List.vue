<template>
  <article 
    v-if="list"
    :class="`todo-list ${dragging ? 'no-transition': null}`"
  >
    <header
      class="todo-list__header"
      @click="openList(list.id)"
    >
      <h4 class="todo-list__header__title">
        <i
          v-handle
          class="handle fas fa-grip-vertical"
        />{{ list.title }}
      </h4>
      <span class="todo-list__header__category"> 
        {{ list.category ? categories[list.category].name: 'No category' }}
      </span>
    </header>
    <ul class="todo-list__summary">
      <li 
        v-for="todo in getFirstFiveTodos(list)"
        :key="todo.id"
        :class="`todo-list__summary__item ${todo.done ? 'marked-done' : null}`" 
      >
        <input
          class="todo-list__summary__item__checkbox"
          type="checkbox"
          @click="markAsDone(todo, list.id)"
        >
        <span class="todo-list__summary__item__content">{{ todo.content }}</span>
      </li>
    </ul>
    <footer class="todo-list__footer">
      <div class="todo-list__footer__left">
        <span class="todo-list__footer__label">created</span>
        <span class="todo-list__footer__date">{{ list.created | fromToday }}</span>
      </div>
      <div class="todo-list__footer__right">
        <span class="todo-list__footer__label">edited</span>
        <span class="todo-list__footer__date">{{ list.updated | fromToday }}</span>
      </div>
    </footer>
  </article>
</template>

<script>
import { mapGetters } from 'vuex';
import { ElementMixin, HandleDirective } from 'vue-slicksort';

export default {
  name: 'ListComponent',
  directives: {
    handle: HandleDirective
  },
  mixins: [ ElementMixin ],
  props: {
    list: {
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
  },
  computed: {
    ...mapGetters({
      lists: 'getAllLists',
      categories: 'getAllListCategories'
    }),
  },
  methods: {
    markAsDone (todo, listId) {
      this.$store.dispatch('markDone', { todo, listId});
    },
    getFirstFiveTodos (list) {
      if (this.lists) {
        const todos = [...list.todos].sort((a, b) => a.done - b.done);
        if (todos.length > 5) {
          todos.length = 5;
        }
        return list.todos;
      }
    },
    openList(id) {
      this.$store.dispatch('changeList', id);
      this.$router.replace('/');
    },
  }
};
</script>

<style lang="scss" scoped>
  .no-transition {
    transition: none !important;
  }
  .todo-list {
    font-family: 'Proxima Nova', Helvetica, sans-serif;
    padding: 0.75rem 1.2rem;
    background: var(--background-color-light);
    border-radius: 5px;
    display: flex;
    flex-direction: column;

    .handle {
      color: var(--text-color-medium);
      display: inline-block;
      padding: 0.15em 0.4em;
      margin-right: 0.4rem;
      margin-left: -0.4em;
      pointer-events: all;
    }

    &__header {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 0.4rem;
      &__title {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        flex-grow: 2;
        text-transform: uppercase;
        font-weight: 800;
      }
      &__category {
        text-transform: uppercase;
        font-weight: 800;
        font-size: 0.75em;
        color: var(--text-color-medium-lighter);
      }
    }

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
    &__footer {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      &__left,
      &__right {
        display: flex;
        flex-direction: column;
        font-size: 0.75em;
      }
      &__left {
        align-items: flex-start;
      }
      &__right {
        align-items: flex-end;
      }
      &__date {
        font-weight: 600;
      }
    }
  }
</style>