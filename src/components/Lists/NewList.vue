<template>
  <div class="new-list">
    <div :class="`popup-wrapper ${popup ? 'popup-wrapper--open': ''}`">
      <form class="popup">
        <h2 class="popup__title">
          Create new list
        </h2>
        <div class="popup__input-group">
          <label
            for="title"
            class="popup__label"
          >title</label>
          <input
            v-model="title"
            placeholder="My list"
            class="popup__input"
          >
        </div>
        <div class="popup__input-group">
          <label
            for="title"
            class="popup__label"
          >category</label>
          <div class="popup__input-wrapper">
            <i class="fad fa-tags input-icon" />
            <input
              v-model="categoryPicker.category.name"
              placeholder="Choose or create"
              class="popup__input popup__input--with-icon"
            >
            <i 
              :class="`fad fa-caret-down input-dropdown-icon ${categoryPicker.open ? 'input-dropdown-icon--active' : ''}`"
              @click="handleOpenCategories"
            />
          </div>
          <ul
            v-if="categoryPicker.open"
            class="category-picker"
          >
            <li 
              v-for="category in filteredCategories"
              :key="category.id"
              class="category-picker__item"
              @click="chooseCategory({cat: {name: category.name, id: category.id}})"
            >
              {{ category.name }}
            </li>
          </ul>
        </div>
        <button
          class="popup__button"
          @click="createNewList()"
        >
          Create List
        </button>
      </form>
    </div>

    <button
      :class="`new-list__btn ${popup ? 'new-list__btn--active' : ''}`"
      @click.prevent="handleOpenPopup"
    >
      <i class="fad fa-plus" />
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NewList',
  data() {
    return {
      popup: false,
      title: '',
      
      categoryPicker:{ 
        category: {
          name: '',
          id: ''
        },
        open: false
      }
    };
  },
  computed: {
    ...mapGetters({
      categories: 'getAllListCategories'
    }),
    filteredCategories () {
      return Object.keys(this.categories)
        .map(el => this.categories[el])
        .filter(cat => cat.name.toLowerCase().includes(this.categoryPicker.category.name.toLowerCase()));
    }
  },
  methods: {
    createNewList() {
      if (!this.title) {
        this.title = 'My list';
      }
      if (!this.categories[this.categoryPicker.category.id]) {
        this.categoryPicker.category.id = '';
      }
      this.$store.dispatch('addList', { title: this.title, cat: this.categoryPicker.category });
      this.title = '';
      this.categoryPicker.category = { name: '', id: '' };
      this.popup = false;
    },

    handleOpenPopup () {
      if (!this.popup) {
        this.popup = true;
        return;
      }
      this.title = '';
      this.popup = false;
    },
    handleOpenCategories () {
      if (!this.categoryPicker.open) {
        this.categoryPicker.open = true;
        return;
      }
      this.categoryPicker.open = false;
    },
    chooseCategory ({cat}) {
      this.categoryPicker.category = { ...cat };
      this.categoryPicker.open = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.new-list {
  
  &__btn {
    position: fixed;
    bottom: 5%;
    right: 10%;
    border: none;
    background: var(--background-color);
    border-radius: 50%;
    font-size: 1.5em;
    padding: 0.5rem 0.75rem 0.4rem 0.7rem;
    box-shadow: 0 10px 15px var(--box-shadow);
    color: var(--text-color);
    transition: transform 0.1s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
    }
    &--active {
      transform: rotate(45deg) scale(0.8);
      box-shadow: none;
    }
  }
  .popup-wrapper {
    bottom: 10%;
    right: 13%;
    position: fixed;
    
    opacity: 0;
    transform: translateY(200%) translateZ(0) scale(0);
    transition: transform 0.3s ease-in, opacity 0.2s ease, box-shadow 0.1s ease-in 0.1s;
    box-shadow: 0px 0px 0px var(--box-shadow);
    border-radius: 5px;

    &--open {
      opacity: 1;
      transform: translateY(0%) scale(1);
      box-shadow: 6px 8px 10px var(--box-shadow);
    }

    .popup{
      width: 100%;
      margin: 0 auto;
      padding: 0.9rem 0.8rem;
      background: var(--background-color-light);
      border-radius: 5px;
      border-left: 1px solid var(--white-color);
      border-top: 1px solid var(--white-color);

      &__title {
        font-size: 1.1em;
        color: var(--text-color-dark);
        text-transform: uppercase;
        font-weight: 800;
        margin-bottom: 0.5rem
      }
      &__input-group {
        min-width: 250px;
        margin-bottom: 0.75rem;
      }
      &__label {
        display: block;
        text-transform: uppercase;
        font-size: 0.8em;
        font-weight: 800;
        opacity: 0.5;
        margin-bottom: 0.25rem;
      }
      &__input-wrapper {
        display: flex;
        flex-direction: row;
        position: relative;
      }
      .input-icon {
        position: absolute;
        left: 0.75rem;
        top: 0.7rem;
        font-size: 0.75em;
      }
      .input-dropdown-icon {
        position: absolute;
        right: 0;
        top: 0;
        padding: 0.65rem 0.65rem 0.5rem;
        font-size: 1em;
        transition: transform 0.2s ease;
        &--active {
          transform: rotate(180deg);
        }
      }
      
      &__input {
        width: 100%;
        font-family: 'Proxima Nova';
        font-size: 0.9em;
        border-radius: 5px;
        background: var(--white-color);
        border: none;
        color: var(--text-color-dark);
        font-weight: bold;
        padding: 0.5rem 0.75rem;

        &--with-icon {
          padding-left: 2.2rem;
        }
        &::placeholder{
          color: var(--text-color-medium-lighter);
          font-weight: 600;
          letter-spacing: 0.5px;
        }
      }
      .category-picker {
        padding: 0.5rem 0;
        list-style: none;
        &__item {
          padding: 0.25rem 0.75rem;
          &:not(:last-child) {
            margin-bottom: 0.25rem;
          }
        }
      }
      &__button {
        cursor: pointer;
        background: var(--background-color);
        border: none;
        border-radius: 3px;
        padding: 0.5rem 0.7rem;
        font-weight: 600;
        color: var(--text-color-dark);

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}

</style>