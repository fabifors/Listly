<template>
  <div class="todos">
    <slot />
  </div>
</template>

<script>
import { ContainerMixin } from 'vue-slicksort';
export default {
  name: 'SortedList',
  mixins: [ContainerMixin]
};
</script>

<style lang="scss">
.todos ul {
  padding: 0;
  list-style: none;
}
</style>