<template>
  <div class="todos-container">
    <aside class="todos-section__info">
      <h4 class="todos-section__info__label">
        <span class="todos-section__info__label__badge">
          {{ getListTodos.filter(todo => todo.done).length }}
        </span>out of
        <span class="todos-section__info__label__badge">
          {{ getListTodos.length }}
        </span>todos marked as done
      </h4>
    </aside>
    <sorted-list
      v-if="currentList"
      v-model="handleDrag.sortedTodos"
      :class="{'dragging': handleDrag.bool}"
      :use-drag-handle="true"
      @sort-start="dragStart($event, getListTodos)"
      @sort-end="sortEnd()"
      @input="reorder($event, 'todos', currentList.id)"
    >
      <transition-group 
        name="animation" 
        tag="ul"
        class="animatedList"
      >
        <to-do
          v-for="(todo, index) in getListTodos"
          :key="todo.id"
          :index="parseInt(index)"
          :todo="todo"
          :list-id="currentList.id"
          :dragging="handleDrag.bool"
        />
      </transition-group>
    </sorted-list>
  </div>
</template>

<script>
// From libraries
import { mapGetters, mapState } from 'vuex';

// Components
import Todo from '@/components/Todos/Todo';
import SortedList from '@/components/SortedList';

//Mixins
import handleDragging from'@/mixins/handleDragging';

export default {
  name: 'TodoList',
  components: {
    'sorted-list': SortedList,
    'to-do': Todo
  },
  mixins: [handleDragging],
  computed: {
    ...mapGetters(
      { currentList: 'lists/getCurrentList' }
    ),
    getListTodos () {
      return this.$store.getters['todos/getListTodosFromObj'](this.currentList.todos);
    }
  }
};
</script>

<style scoped lang="scss">

.todos-section__info {
  margin-bottom: 1rem;
  &__label {
    &__badge {
      text-align: center;
      padding: 0.2rem 0.15rem 0.2rem 0.3rem;
      font-weight: 800;
      font-size: 0.8em;
      color: var(--text-color-medium);
      border: 1px solid var(--background-color);
      border-radius: 5px;
      margin-right: 0.2rem;
    }
  }
}

.dragging .animation-move {
  transition: none;
}

.animatedList {
  position: relative;
}

.animation-enter {
  opacity: 0;
  transform: scale(0.4, 0.4);
}

.animation-leave-to {
  opacity: 0;
  transform: scale(0.4, 0.4);
}

.animation-enter-active {
  transition: 0.35s all;
  opacity: 1;
}

.animation-leave-active {
  transition: all 0.35s;
  position: absolute;
  width: 100%;
}

.animation-move {
  transition: transform 0.5s;
}

</style>
