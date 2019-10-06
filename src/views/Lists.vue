<template>
  <section class="layout-section">
    <header class="title-section">
      <h2 class="title-section__title">
        My lists
      </h2>
      <form
        class="search-form"
        @submit.prevent=""
      >
        <input 
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
          v-for="(cat, index) in dummy.categories"
          :key="index" 
          :class="`filter-tag ${cat.active ? 'active': null}`"
          @click="activate(cat)"
        >
          {{ cat.name }}
        </li>
      </ul>
    </section>
    
    <main class="list-section">
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
              {{ filter }}
            </li>
          </ul>
          <span
            v-else
            class="active-filter-showing-all"
          >All lists</span>
        </div>
        <div class="list-section__info__right">
          <h4 class="active-filter-label">
            Number of lists
          </h4>
          <span class="active-filter-total">
            {{ numberOfLists }}
          </span>
        </div>
      </aside>
      <section class="list-section__lists-container">
        <article
          v-for="list in lists"
          :key="list.id" 
          class="todo-list"
        >
          <header
            class="todo-list__header"
            @click="openList(list.id)"
          >
            <h4 class="todo-list__header__title">
              {{ list.title }}
            </h4>
            <span class="todo-list__header__category"> 
              {{ list.category ? list.category : 'No category' }}
            </span>
          </header>
          <ul class="todo-list__summary">
            <li 
              v-for="todo in getFirstFiveTodos(list.id)"
              :key="todo.id"
              :class="`todo-list__summary__item ${todo.done ? 'marked-done' : null}`" 
            >
              <input
                class="todo-list__summary__item__checkbox"
                type="checkbox"
                @click="markAsDone(todo, list.id)"
              >
              <span class="todo-list__summary__item__content">{{ todo.content }}</span>
            </li>
          </ul>
          <footer class="todo-list__footer">
            <div class="todo-list__footer__left">
              <span class="todo-list__footer__label">created</span>
              <span class="todo-list__footer__date">yesterday</span>
            </div>
            <div class="todo-list__footer__right">
              <span class="todo-list__footer__label">edited</span>
              <span class="todo-list__footer__date">1 hour ago</span>
            </div>
          </footer>
        </article>
      </section>
    </main>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Lists',
  data: () => {
    return {
      search: '',
      activeFilters: ["Daily todo's"],
      dummy: {
        categories: [ 
          {
            name: "Daily todo's",
            active: true
          },
          {
            name: 'Shopping',
            active: false
          },
          {
            name: 'Food',
            active: false
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters({lists: 'getAllLists'}),

    filteredList () {
      return [];
    },

    numberOfLists () {
      return Object.keys(this.lists).length;
    }
  },
  methods: {
    openList(id) {
      this.$store.dispatch('changeList', id);
      this.$router.replace('/');
    },

    addNewList() {
      this.$store.dispatch('addList', newList.title);
      this.$router.replace('/');
    },

    activate(cat) {
      const category = this.dummy.categories.find(c => c === cat);
      if(category.active) {
        category.active = !category.active;
        const i = this.activeFilters.indexOf(category.name);
        this.activeFilters.splice(i, 1);
        return;
      }
      category.active = !category.active;
      this.activeFilters.push(category.name);
    },

    clearActiveFilters () {
      this.activeFilters = [];
      this.dummy.categories.map(c => c.active = false);
    },

    filterListOnSearch () {
      // Write search algoritm
    },

    getFirstFiveTodos (listId) {
      if (this.lists) {
        const list = this.lists[listId];
        const todos = [...list.todos].sort((a, b) => a.done - b.done);
        console.log(todos.map(el => el.done))
        if (todos.length > 5) {
          todos.length = 5
        }
        return todos;
      }
    },
    markAsDone (todo, listId) {
      this.$store.dispatch('markDone', { todo, listId});
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
    margin: 1rem 0;
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
    &__title {
      margin: 0;
      flex-grow: 2;
    }
  } 
}

.filter-section {
  margin-bottom: 1.5rem;
  &__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0rem;
    &__icon {
      height: 12px;
      font-size: 14px;
      margin-right: 0.5rem;
      color: var(--text-color-dark);
    }

    &__title {
      color: var(--text-color-dark--muted);
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
    padding: 0;
    .filter-tag {
      list-style: none;
      margin-right: 0.75rem;
      font-weight: 600;
      padding: 0.4rem 0.6rem;
      border-radius: 5px;
      transition: background 0.1s ease-in, color 0.1s ease-in;
      cursor: pointer;
      &:hover:not(.active) {
        background: var(--background-color-light);
      }

      &.active {
        background: var(--text-color-medium);
        color: var(--text-color-light);
        &:hover {
          background: hsl(251, 26%, 55%);
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

    .active-filter-label {
      text-transform: uppercase;
      color: var(--text-color-medium-lighter);
      font-size: 0.8em;
      font-weight: 800;
      letter-spacing: 0.5px;
      margin-right: 1rem;
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
        flex-direction: row;
        &__item {
          font-weight: 800;
          color: var(--text-color-medium-lighter);
          &:not(:last-child) {
            margin-right: 0.75rem;
          }
        }
      }
      .active-filter-showing-all {
        font-weight: 800;
        color: var(--text-color-medium-lighter);
      }
    }

    &__right {
      display: flex;
      flex-direction: row;
      align-items: center;
      .active-filter-total {
        padding: 0.2rem 0.5rem;
        font-weight: 800;
        font-size: 0.8em;
        color: var(--text-color-medium);
        background: var(--text-color-light);
        border-radius: 2px;
      }
    }

  }
  &__lists-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 0.75rem 0.75rem;
    
    .todo-list {
      padding: 0.75rem 1.2rem;
      background: var(--background-color-light);
      border-radius: 5px;
      display: flex;
      flex-direction: column;

      &__header {
        display: flex;
        flex-direction: row;
        align-items: center;
        &__title {
          margin-top: 0.5em;
          margin-bottom: 0.5em;
          flex-grow: 2;
          text-transform: uppercase;
          font-weight: 800;
        }
        &__category {
          text-transform: uppercase;
          font-weight: 800;
          font-size: 0.75em;
          color: var(--text-color-medium-lighter);
        }
      }

      &__summary {
        flex-grow: 2;
        list-style: none;
        padding: 0;
        &__item {
          padding: 0.1rem;

          &__checkbox {
            position: relative;
            margin-right: 0.75rem;
            &::before {
              content: '';
              display: block;
              position: absolute;
              border-radius: 5px;
              left: 0;
              right: 0;
              height: 100%;
              width: 100%;
              background: var(--background-color-light);
              border: 2px solid var(--text-color-medium);
              transition: background 100ms ease-in;
            }
          }
          &.marked-done {
            .todo-list__summary__item {
              &__content {
                text-decoration: line-through;
              }
              &__checkbox {
                &::before {
                  background: var(--text-color-medium);
                }
              }
            }
            
          }
          &__content {
            
            font-weight: 600;
          }
          &:not(:last-child) {
          margin-bottom: 1rem;
          }
        }
      }
      &__footer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        &__left,
        &__right {
          display: flex;
          flex-direction: column;
          font-size: 0.75em;
        }
        &__left {
          align-items: flex-start;
        }
        &__right {
          align-items: flex-end;
        }
        &__date {
          font-weight: 600;
        }
      }
    }
  }

}

</style>