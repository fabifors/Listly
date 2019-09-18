<template>
  <div class="container">
    <div class="layout-section">
      <new-todo />
    </div>
    <div class="layout-section">
      <todo-list />
    </div>
    <repo-information />
  </div>
</template>

<script>
import RepoInformation from '../components/RepoInformation';
import TodoList from '../components/TodoList';
import NewTodo from '../components/NewTodo';

export default {
  name: 'Todos',
  components: {
  'repo-information': RepoInformation,
  'todo-list': TodoList,
  'new-todo': NewTodo
  },
};
</script>