<template>
  <div class="wrapper">
    <sorted-list
      v-if="currentList"
      v-model="sortedTodos"
      :use-drag-handle="true"
      :class="{'dragging': dragging}"
      @sort-start="dragStart()"
      @sort-end="sortEnd()"
      @input="reorder($event)"
    >
      <transition-group 
        name="animation" 
        tag="ul"
      >
        <to-do
          v-for="(todo, index) in currentList.todos"
          :key="todo.id"
          :index="parseInt(index)"
          :todo="todo"
          :dragging="dragging"
        />
      </transition-group>
    </sorted-list>
  </div>
</template>

<script>
import Todo from './Todo';
import { mapGetters, mapState } from 'vuex';
import SortedList from './SortedList';
import { setTimeout } from 'timers';

export default {
  name: 'TodoList',
  components: {
    'sorted-list': SortedList,
    'to-do': Todo
  },
  data: () => {
    return {
      sortedTodos: [],
      dragging: false
    };
  },
  computed: {
    ...mapGetters({ currentList: 'getCurrentList' })
  },
  methods: {
    dragStart() {
      this.sortedTodos = Array.from(this.currentList.todos);
    },
    sortEnd() {
      this.dragging = true;
    },
    reorder(list) {
      this.$store.dispatch('reorderTodos', list);
      setTimeout(() => {
        this.dragging = false;
      }, 10);
    }
  }
};
</script>

<style scoped lang="scss">

.wrapper {
  padding: 1rem;
}

.dragging .animation-move {
  transition: none;
}

.animation {
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
