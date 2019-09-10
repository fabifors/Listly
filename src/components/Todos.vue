<template>
  <div class="wrapper">
    <ul class="todos">
      <li class="todos__item" v-for="(todo, index) in data" :key="index">
        <span class="todos__item__content">{{ todo.content }}</span>
        <div class="todos__item__actions">
          <i class="fas fa-edit"></i>
          <i class="fas fa-times"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Todos',
  props: {
    data: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrapper {
  padding: 1rem;
  .todos {
    padding: 0;
    list-style: none;
    &__item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      margin-bottom: 0.5rem;
      padding: 0.75rem;
      background: hsl(226, 30%, 90%);
      border-radius: 5px;
    }
  }
}
</style>
