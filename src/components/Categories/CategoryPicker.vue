<template>
  <div class="category-picker">
    <label
      for="title"
      class="category-picker__label"
    >category</label>
    <div class="category-picker__input-wrapper">
      <i class="fad fa-tags input-icon" />
      <label
        class="sr-only"
        for="categoryInput"
      >Add list category</label>
      <input
        id="categoryInput"
        v-model="category.name"
        placeholder="Choose or enter new category name"
        autocomplete="off"
        class="category-picker__input category-picker__input--with-icon"
        @input="setNewCategory"
      >
    </div>
    <transition-group
      v-if="filteredCategories.length > 0"
      name="animation"
      tag="ul"
      class="category-picker__list"
      appear
    >
      <li 
        v-for="cat in filteredCategories"
        :key="cat.id"
        :class="`category-picker__list__item filter-tag
          ${category.id === cat.id ? 'active': ''}
        `"
        @click="chooseCategory({ name: cat.name, id: cat.id })"
      >
        {{ cat.name }}
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CategoryPicker',
  data: () => {
    return {
      open: false,
      category: {
        name: '',
        id: ''
      }
    };
  },
  computed: {
    ...mapGetters({
      categories: 'categories/getAllListCategories'
    }),
    filteredCategories () {
      return Object.keys(this.categories)
        .map(id => this.categories[id])
        .filter(category => {
          const source = category.name.toLowerCase();
          const newName = this.category.name.toLowerCase();
          if (source.includes(newName)) {
            return category;
          }
        });
    },
  },
  methods: {
    chooseCategory (payload) {
      this.category = {
        name: payload.name,
        id: payload.id
      };
      this.$emit('set-category', this.category);
    },
    setNewCategory () {
      this.category.id = '';
      const foundCategory = this.categories.find(category => {
        const existingCat = category.name.toLowerCase();
        const newCat = this.category.name.toLowerCase();
        if(newCat.length === existingCat.length) {
          if (newCat === existingCat) {
            return category;
          }
        }
      });
      if (foundCategory) {
        this.category = {
          id: foundCategory.id,
          name: foundCategory.name
        };
      }
      this.$emit('set-category', this.category);
    }
  }
};
</script>

<style lang="scss" scoped>

.category-picker__list {
  transition: all 0.3s ease-in;
  height: 0;
  position: relative;
}

.animation {
  transition: all 1s;
  &-enter {
  opacity: 0;
  transform: translateY(20px)
  }

  &-leave-to {
    opacity: 0;
    transform: translateY(20px)
  }

  &-enter-active {
    transition: 0.35s all;
    opacity: 1;
  }

  &-leave-active {
    transition: all 0.35s;
    position: absolute;
    width: 100%;
  }

  &-move {
    transition: transform 0.5s;
  }
}


.category-picker {
  margin-bottom: 1rem;
  &__list {
    display: flex;
    min-height: 50px;
    overflow: visible;
    padding: 0.5rem 0;
    list-style: none;

    .filter-tag {
      font-weight: 600;
      padding: 0.4rem 0.6rem;
      margin-right: 0.25rem;
      border-radius: 5px;
      transition: transform 0.35s,background 0.1s ease-in, color 0.1s ease-in;
      cursor: pointer;
      &:hover:not(.active) {
        background: var(--text-color-muted--light);
      }

      &.active {
        background: var(--text-color-muted--light);
        // color: var(--text-color-light);
        &:hover {
          background: var(--white-color);
        }
      }
    }
  }
  &__label {
    display: block;
    text-transform: uppercase;
    font-size: 0.8em;
    font-weight: 800;
    opacity: 0.5;
    margin-bottom: 0.25rem;
  }
  &__input-group {
    min-width: 250px;
    margin-bottom: 0.75rem;
  }
  &__input-wrapper {
    display: flex;
    flex-direction: row;
    position: relative;
  }
  &__input {
    width: 100%;
    font-family: 'Proxima Nova';
    font-size: 1em;
    border-radius: 5px;
    background: var(--white-color);
    border: none;
    color: var(--text-color-dark);
    font-weight: bold;
    padding: 0.65rem 0.9rem;

    &--with-icon {
      padding-left: 2.4rem;
    }
    &::placeholder{
      color: var(--text-color-medium-lighter);
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    &__button {
      padding: 0 1rem;
      font-weight: 600;
      background: var(--background-color);
      // color: var(--white-color);
      border-radius: 0 5px 5px 0;
      border: none;
    }
  }
  .input-icon {
    position: absolute;
    left: 0.75rem;
    top: 0.85rem;
    font-size: 0.9em;
  }
  .input-dropdown-icon {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0.75rem 0.75rem 0.6rem;
    font-size: 1.2em;
    transition: transform 0.2s ease;
    &--active {
      transform: rotate(180deg);
    }
  }
}
</style>