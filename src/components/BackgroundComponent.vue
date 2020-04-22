<template>
  <div class="background-component">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BackgroundComponent',
};
</script>

<style>
.background-component {
  background: rgba(0,0,0,0.6);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 99;
  overflow: hidden;
}
</style>