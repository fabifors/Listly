<template>
  <div class="category-picker">
    <label
      for="title"
      class="category-picker__label"
    >category</label>
    <div class="category-picker__input-wrapper">
      <i class="fad fa-tags input-icon" />
      <label class="sr-only" for="categoryInput">Add list category</label>
      <input
        id="categoryInput"
        v-model="category.name"
        @change="handleOpenCategories()"
        placeholder="Choose or create"
        class="category-picker__input category-picker__input--with-icon"
      >
      <i 
        :class="`fad fa-caret-down input-dropdown-icon ${open ? 'input-dropdown-icon--active' : ''}`"
        @click="!open ? handleOpenCategories() : handleCloseCategories()"
      />
    </div>
    <transition-group
      v-if="open"
      name="animation"
      tag="ul"
      class="category-picker__list"
      appear
    >
      <li 
        v-for="category in filteredCategories"
        :key="category.id"
        class="category-picker__list__item"
        @click="chooseCategory({ name: category.name, id: category.id })"
      >
        {{ category.name }}
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
      category: {
        name: '',
        id: ''
      },
      open: false
    }
  },
  computed: {
    ...mapGetters({
      categories: 'categories/getAllListCategories'
    }),
    filteredCategories () {
      return Object.keys(this.categories)
        .map(el => this.categories[el])
        .filter(cat => cat.name.toLowerCase().includes(this.category.name.toLowerCase()));
    }
  },
  methods: {
    handleOpenCategories () {
      if (!this.open) {
        this.open = true;
        return;
      }
    },
    handleCloseCategories () {
      if (this.open) {
        this.open = false;
        return;
      }
    },
    chooseCategory ({name, id}) {
      this.category = {
        name,
        id
      }
      this.$emit('picked-category', this.category);
      this.open = false;
    },
    createNewCategory () {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.category-picker__list {
  position: relative;
  min-height: 48px;
}

.animation {
  transition: all 1s;
  &-enter {
  opacity: 0;
  transform: scale(0.4, 0.4);
  }

  &-leave-to {
    opacity: 0;
    transform: scale(0.4, 0.4);
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
    min-height: 50px;
    overflow: visible;
    padding: 0.5rem 0;
    list-style: none;
    &__item {
      padding: 0.25rem 0.75rem;
      &:not(:last-child) {
        margin-bottom: 0.25rem;
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