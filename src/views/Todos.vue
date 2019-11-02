<template>
  <div class="layout-section">
    <new-todo />
    <div class="container">
      <todo-list class="flex-item-1" />
      <todo-meta-information
        :list="list"
        class="flex-item-2"
      />
    </div>
    <repo-information />
  </div>
</template>

<script>
import RepoInformation from '../components/RepoInformation';
import TodoList from '@/components/Todos/TodoList';
import NewTodo from '@/components/Todos/NewTodo';
import TodoListMeta from '@/components/Todos/TodoListMeta';

import { mapGetters } from 'vuex';

export default {
  name: 'Todos',
  components: {
  'repo-information': RepoInformation,
  'todo-list': TodoList,
  'new-todo': NewTodo,
  'todo-meta-information': TodoListMeta
  },
  computed: {...mapGetters({ list: 'lists/getCurrentList' })}
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 800px) {  
    display: flex;
    flex-direction: row;
    
  }
  .flex-item-1 {
    flex-grow: 3;
    margin-right: 1rem;
  }

  .flex-item-2 {
    flex-grow: 1;
    height: 300px;
  }
}
</style>