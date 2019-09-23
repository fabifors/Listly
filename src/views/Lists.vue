<template>
  <section class="layout-section">
    <header class="my-lists">
      <h2>My lists</h2>
    </header>
    <main>
      <ul class="list-overview"> 
        <li
          v-for="list in lists"
          :key="list.id" 
          class="todo-list"
          @click="openList(list.id)"
        >
          <h4 class="todo-list__title">
            {{ list.title }}
          </h4>
          <ul class="todo-list__summary">
            <li 
              v-for="todo in list.todos" 
              :key="todo.id"
              class="todo-list__summary__item" 
            >
              {{ todo.content }}
            </li>
          </ul>
        </li>
      </ul>
    </main>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Lists',
  data: () => {
    return {};
  },
  computed: {
    ...mapGetters({lists: 'getAllLists'})
  },
  methods: {
    openList(id) {
      this.$store.dispatch('changeList', id);
    }
  }
};
</script>

<style lang="scss" scoped>
  .my-lists {
    padding: 1rem;
  }

  h2 {
    font-size: 3em;
  }

  .list-overview {
    padding: 0;
    list-style: none;
  }

  .todo-list {
    padding: 0.5rem 0.75rem;
    border: 1px solid lightgray;

  }
</style>