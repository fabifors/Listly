<template>
  <div class="layout-section">
    <new-todo />
    <todo-list />
    <repo-information />
  </div>
</template>

<script>
import RepoInformation from '../components/RepoInformation';
import TodoList from '../components/TodoList';
import NewTodo from '../components/NewTodo';

import { mapGetters } from 'vuex';

export default {
  name: 'Todos',
  components: {
  'repo-information': RepoInformation,
  'todo-list': TodoList,
  'new-todo': NewTodo
  }
};
</script>