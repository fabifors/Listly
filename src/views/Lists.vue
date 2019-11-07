<template>
  <section class="layout-section">
    <!-- {{window.width}} -->
    <header class="title-section">
      <h2 class="title-section__title">
        My lists
      </h2>
      <form
        v-if="window.width >= 500"
        class="search-form"
        @submit.prevent
      >
        <label
          for="search"
          class="sr-only"
        >Search</label>
        <input 
          id="search" 
          v-model="search"
          type="text"
          class="search-form__input" 
          placeholder="Search"
        >
        <i class="fad fa-search search-form__icon" />
      </form>
    </header>

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
    
    <main
      v-if="filteredList"
      class="list-section"
    >
      <aside class="list-section__info">
        <div class="list-section__info__left">
          <h4 class="active-filter-label">
            Showing
          </h4>
          <ul
            v-if="activeFilters.length > 0"
            class="active-filter-list"
          >
            <li
              
              v-for="(filter, index) in activeFilters" 
              :key="index" 
              class="active-filter-list__item"
            >
              {{ filter.name }}
            </li>
          </ul>
          <span
            v-else
            class="active-filter-showing-all"
          >All lists</span>
        </div>
        <div class="list-section__info__right">
          <h4 class="active-filter-label">
            <span class="desktop-only active-filter-label__inner-span">Number of</span> lists
          </h4>
          <span class="active-filter-total">
            {{ numberOfLists }}
          </span>
        </div>
      </aside>
      <sorted-list 
        v-if="lists"
        v-model="handleDrag.sortedTodos"
        class="list-section__lists-container"
        :class="{'dragging': handleDrag.bool}"
        :use-drag-handle="true"
        :axis="'xy'"
        @sort-start="dragStart($event, filteredList)"
        @sort-end="sortEnd()"
        @input="reorder($event, 'lists')"
      >
        <transition-group
          v-if="filteredList"
          tag="div"
          class="list-section__lists-container__inner"
          name="animation"
          mode="out-in"
          appear
        >
          <list
            v-for="(list, index) in filteredList"
            :key="list.id"
            :index="parseInt(index)"
            :list="list"
            :dragging="handleDrag.bool"
          />
        </transition-group>
      </sorted-list>
    </main>
    <new-list />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

// Mixins
import handleResize from '@/mixins/handleResize';
import handleDragging from '@/mixins/handleDragging';
import { ElementMixin } from 'vue-slicksort';

// Components
import SortedList from '@/components/SortedList';
import ListComponent from '@/components/Lists/List';
import NewList from '../components/Lists/NewList';

export default {
  name: 'Lists',
  components: {
    'sorted-list': SortedList,
    'list': ListComponent,
    'new-list': NewList
  },
  mixins: [handleResize, handleDragging],
  data: () => {
    return {
      search: '',
      activeFilters: []
    };
  },
  computed: {
    ...mapGetters({
      lists: 'lists/getAllLists',
      categories: 'categories/getAllListCategories'
    }),

    filteredList () {
      if(this.lists) {
        const listArray = Object.keys(this.lists).map(id => this.lists[id]);
        return this.$options.filters.listCategory(listArray, this.activeFilters);
      }
      return [];
    },

    numberOfLists () {
      return Object.keys(this.lists).length;
    }
  },
  methods: {
    activate(cat) {
      const index = this.activeFilters.indexOf(cat);
      if (index != -1) {
        this.activeFilters.splice(index, 1);
        return;
      }

      this.activeFilters.push(cat);
    },

    clearActiveFilters () {
      this.activeFilters = [];
    },

    filterListOnSearch () {
      // Write search algoritm
    }
  }
};
</script>

<style lang="scss" scoped>

.title-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  
  &__title {
    font-size: 4em;
    margin-right: auto;
    color: var(--text-color-dark);
    margin: 0.5rem 0 0.75rem;
  }

  .search-form {
    position: relative;
    
    &__input {
      width: 100%;
      font-family: 'Proxima Nova', sans-serif;
      padding: 0.6rem 0.8rem;
      color: var(--text-color-dark);
      line-height: 1.2;
      border-radius: 5px;
      background: var(--background-color-light);
      border: none;
      font-size: 13px;
      font-weight: 800;
      align-items: center;
      text-transform: uppercase;
    
      &::placeholder {
        color: var(--text-color-dark--muted);
      }
    }

    &__icon {
      position: absolute;
      right: 0.75rem;
      top: 0.6rem;
      pointer-events: none;
      color: var(--text-color-dark);
    }
  }

  @media screen and (min-width: 500px) {
    flex-direction: row;
    align-items: center;
    margin-bottom: 1.5rem;
    &__title {
      margin: 0;
      flex-grow: 2;
    }
  } 
}

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
    flex-direction: row;
    justify-content: flex-start;
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

.list-section {
  &__info {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.5rem;
    padding: 0.25rem;
    border-bottom: 1px dashed var(--background-color-light);

    .active-filter-label {
      text-transform: uppercase;
      color: var(--text-color-muted--light);
      font-size: 0.75em;
      font-weight: 800;
      letter-spacing: 0.5px;
      margin-right: 0.5rem;

      &__inner-span {
        display: inline;
      }

      @media screen and (min-width: 500px) {
        margin-right: 1rem;
        font-size: 0.85em;
        
      }
    }

    &__left {
      flex-grow: 2;
      display: flex;
      flex-direction: row;
      align-items: baseline;
      .active-filter-list {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        &__item {
          font-weight: 800;
          font-size: 0.85em;
          color: var(--text-color-medium-lighter);
          &:not(:last-child) {
            margin-right: 0.75rem;
          }
          @media screen and (min-width: 500px) {
            font-size: initial;
          }
        }
      }
      .active-filter-showing-all {
        font-weight: 800;
        color: var(--text-color-medium-lighter);
        font-size: 0.85em;
         @media screen and (min-width: 500px) {
            font-size: initial;
          }
      }
    }

    &__right {
      display: flex;
      flex-direction: row;
      align-items: center;


      .active-filter-total {
        padding: 0.2rem 0.4rem;
        font-weight: 900;
        font-size: 0.75em;
        color: var(--text-color-medium);
        background: var(--text-color-light);
        border-radius: 2px;

        @media screen and (min-width: 500px) {
          padding: 0.2rem 0.5rem;
          font-size: 0.8em;
        }
      }
    }

  }
  &__lists-container {
    min-height: 50vh;
    width: 100%;
    &__inner {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      grid-gap: 0.75rem 0.75rem;
      position: relative;
    }
    .animation {
      &-enter{
        opacity: 0;
        transform: scale(0.4);
      }

      &-enter-active{
        transition: transform 0.35s ease, opacity 0.35s ease;
      }

      &-leave-active {
        position: absolute;
        opacity: 0;
      }

      &-move {
        transition: transform 0.35s ease;
      }

      &-move .dragging {
        transition: none;
      }
    }
  }
}
</style>