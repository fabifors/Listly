<template>
  <section class="filter-section">
    <header class="filter-section__header">
      <i class="fad fa-filter filter-section__header__icon" />
      <h4 class="filter-section__header__title">
        Filter
      </h4>
    </header>
    <ul class="filter-section__list">
      <li 
        :class="
          `filter-tag ${activeFilters.length < 1 ? 'active' : null}`
        "
        @click="clearActiveFilters()"
      >
        All lists
      </li>
      <li
        v-for="(cat, index) in categories"
        :key="index" 
        :class="`filter-tag ${activeFilters.indexOf(cat) != -1 ? 'active': null}`"
        @click="activate(cat)"
      >
        {{ cat.name }}
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'CategoryFilter',
  data: () => {
    return {
      activeFilters: []
    };
  },
  computed: {
    ...mapGetters({
      categories: 'categories/getAllListCategories'
    })
  },
  methods: {
    activate(cat) {
      const index = this.activeFilters.indexOf(cat);
      if (index != -1) {
        this.activeFilters.splice(index, 1);
      } else {
        this.activeFilters.push(cat);
      }

      this.$emit('update-active-filter', this.activeFilters);
    },
    
    clearActiveFilters () {
      this.activeFilters = [];
      this.$emit('update-active-filter', this.activeFilters);
    },
  }
};
</script>

<style lang="scss" scoped>
.filter-section {
  margin-bottom: 1.0rem;
  @media screen and (min-width:500px) {
    margin-bottom: 1.5rem;
  }
  &__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.75rem;
    &__icon {
      height: 12px;
      font-size: 14px;
      margin-right: 0.5rem;
      color: var(--text-color-muted--medium);
    }

    &__title {
      color: var(--text-color-muted--light);
      text-transform: uppercase;
      font-size: 1.1em;
      font-weight: 800;
      margin: 0;
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    .filter-tag {
      list-style: none;
      margin-right: 0.75rem;
      margin-bottom: 0.5rem;
      font-weight: 600;
      padding: 0.4rem 0.6rem;
      border-radius: 5px;
      transition: background 0.1s ease-in, color 0.1s ease-in;
      cursor: pointer;
      &:hover:not(.active) {
        background: var(--background-color-light);
      }

      &.active {
        background: var(--background-color-light);
        // color: var(--text-color-light);
        &:hover {
          background: var(--text-color-muted--light);
        }
      }
    }
  }
}
</style>