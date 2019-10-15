<template>
  <section class="sorted-list">
    <slot />
  </section>
</template>

<script>
import { ContainerMixin } from 'vue-slicksort';
export default {
  name: 'SortedList',
  mixins: [ ContainerMixin ]
};
</script>

<style lang="scss">
.sorted-list ul {
  padding: 0;
  list-style: none;
}
</style>