<template>
  <article
    v-if="list"
    :class="`todo-list ${dragging ? 'no-transition': ''}`"
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
      <span
        class="todo-list__header__category"
      > 
        {{ listCategoryName }}
      </span>
    </header>
    
    <todo-list-summary :todos="getFirstFive" />

    <footer class="todo-list__footer">
      <div class="todo-list__footer__left">
        <span class="todo-list__footer__label">created</span>
        <span class="todo-list__footer__date">
          {{ list.created | fromToday }}
        </span>
      </div>
      <div class="todo-list__footer__right">
        <span class="todo-list__footer__label">edited</span>
        <span class="todo-list__footer__date">
          {{ list.updated | fromToday }}
        </span>
      </div>
    </footer>
  </article>
</template>

<script>
import { mapGetters } from 'vuex';
import { ElementMixin, HandleDirective } from 'vue-slicksort';
import TodoListSummary from './TodoListSummary';

export default {
  name: 'ListComponent',
  directives: {
    handle: HandleDirective
  },
  components: { 'todo-list-summary': TodoListSummary },
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
      categories: 'categories/getCategoryById'
    }),
    getFirstFive () {
      if (this.list.id){
        const _list_id = this.list.id;
        const list = this.$store.getters['todos/getListTodos'](_list_id);
        function sortByDone (a, b) {
          return a.done - b.done;
        }
        list.sort(sortByDone);
        if (list.length > 5) {
          list.length = 5;
          return list;
        }
        return list;
      }
      return [];
    },
    listCategoryName() {
      if (this.list.category) {
        return this.categories(this.list.category)
          ? this.categories(this.list.category).name
          : 'error';
      }
      return 'No category';
    }
  },
  methods: {
    openList(id) {
      this.$store.dispatch('lists/changeList', { list_id: id }, { root: true });
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
        font-weight: 800;
        font-size: 0.75em;
        color: var(--text-color-medium-lighter);
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