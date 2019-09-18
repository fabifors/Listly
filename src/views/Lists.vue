<template>
  <section class="layout-section">
    <header class="my-lists">
      <h2>My lists</h2>
    </header>
    <main>
      <ul class="list-overview"> 
        <li
          v-for="list in lists"
          :key="list.id" class="list-overview__item"
        >
          <h4>{{ list.title }}</h4>
        </li>          
      </ul>
    </main>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Lists',
  data: () => {
    return {};
  },
  computed: {
    ...mapGetters({lists: 'getAllLists'})
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
  .my-lists {
    padding: 1rem;
  }

  h2 {
    font-size: 3em;
  }

  .list-overview {
    padding: 0;
    list-style: none;

    &__item {
      padding: 0.5rem;
      border: 1px solid lightgray;
    }
  }
</style>