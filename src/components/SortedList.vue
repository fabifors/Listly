<template>
  <ul class="todos">
    <slot />
  </ul>
</template>

<script>
import { ContainerMixin } from 'vue-slicksort'
export default {
  name: 'SortedList',
  mixins: [ContainerMixin]
}
</script>