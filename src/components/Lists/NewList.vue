<template>
  <div class="new-list">
    <transition name="fade">
      <div
        v-if="popup"
        class="new-list__overlay" @click="popup = !popup"
      />
    </transition>
    <transition name="slide-up">
      <div
        v-if="popup"
        class="popup-wrapper"
      >
        <form class="popup">
          <h2 class="popup__title">
            Create new list
          </h2>
          <div class="popup__input-group">
            <label
              for="newListTitle"
              class="popup__label"
            >title</label>
            <input
              v-model="title"
              id="newListTitle"
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
              <label class="sr-only" for="categoryInput">Add list category</label>
              <input
                id="categoryInput"
                v-model="categoryPicker.category.name"
                @change="handleOpenCategories()"
                placeholder="Choose or create"
                class="popup__input popup__input--with-icon"
              >
              <i 
                :class="`fad fa-caret-down input-dropdown-icon ${categoryPicker.open ? 'input-dropdown-icon--active' : ''}`"
                @click="!categoryPicker.open ? handleOpenCategories() : handleCloseCategories()"
              />
            </div>
            <transition-group
              v-if="categoryPicker.open"
              name="expand-group"
              tag="ul"
              class="category-picker"
              appear
            >
              <li 
                v-for="category in filteredCategories"
                :key="category.id"
                class="category-picker__item"
                @click="chooseCategory({ name: category.name, id: category.id })"
              >
                {{ category.name }}
              </li>
            </transition-group>
          </div>
          <button
            class="popup__button"
            @click="createNewList()"
          >
            Create List
          </button>
        </form>
      </div>
    </transition>
    <button
      :class="`new-list__btn ${popup ? 'new-list__btn--active' : ''}`"
      @click.prevent="handleOpenPopup"
    >
      <span class="sr-only">Create new list</span>
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
      categories: 'categories/getAllListCategories'
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

      const payload = {
        title: this.title,
        category_id: this.categoryPicker.category.id
      }
      this.$store.dispatch('lists/addList', payload, { root: true }).then(() => {
        this.title = '';
        this.categoryPicker.category = { name: '', id: '' };
        this.popup = false;
      });
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
    },
    handleCloseCategories () {
      if (this.categoryPicker.open) {
        this.categoryPicker.open = false;
        return;
      }
    },
    chooseCategory ({name, id}) {
      this.categoryPicker.category = { name, id };
      this.categoryPicker.open = false;
    }
  }
};
</script>

<style lang="scss" scoped>

.expand-group {
  transition: all 0.5s ease;
  position: relative;
  &-enter-active, &-leave-active {
    transition: transform 500ms ease, opacity 200ms ease;
  }

  &-leave-active, &-leave ,&-move{
    position: absolute;
  }

  &-enter, &-leave-to {
    opacity: 0;
    transform: translateX(10px) scaleY(0);
  }

  &-move {
    transition: all 500ms ease;
  }
}

.fade {
  &-enter-active, &-leave-active {
    transition: opacity 200ms ease-in;
  }
  &-enter, &-leave-to {
    opacity: 0;
  }
}

.slide-up {
  &-enter-active, &-leave-active{
    transition: transform 0.3s ease-in, opacity 0.3s ease-in;
  }

  &-enter, &-leave-to {
    opacity: 0;
    transform: translateY(50%) scale(1);
  }
}

.new-list {
  &__overlay {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
  }
  &__btn {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    border: none;
    background: var(--background-color);
    border-radius: 50%;
    font-size: 1.5em;
    padding: 0.5rem 0.75rem 0.4rem 0.7rem;
    box-shadow: 0 10px 15px var(--box-shadow);
    color: var(--text-color);
    transition: transform 0.1s ease, box-shadow 0.2s ease;

    @media screen and (min-width: 500px) {
      bottom: 5%;
      right:13%;
    }

    &:focus {
      outline: none;
    }
    &--active {
      transform: rotate(45deg) scale(0.8);
      box-shadow: none;
    }
  }
  .popup-wrapper {
    width: calc(100% - 2rem);
    height: calc(100vh - 6.75rem);
    top: 3.5rem;
    right: 1rem;    
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 5px;

    @media screen and (min-width: 500px) {
      width: 750px;
      bottom: 10%;
      right: 0;
      left: 0;
      margin: 0 auto;
    }

    .popup{
      width: 100%;
      margin: 0 auto;
      padding: 0.9rem 0.8rem;
      background: var(--background-color-light);
      border-radius: 5px;
      border-left: 1px solid var(--white-color);
      border-top: 1px solid var(--white-color);
      box-shadow: 6px 8px 10px var(--box-shadow);
      
      &__title {
        font-size: 1.2em;
        color: var(--text-color-dark);
        text-transform: uppercase;
        font-weight: 800;
        margin-bottom: 0.75rem;
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
        font-size: 1em;

        &:hover {
          opacity: 0.8;
        }
      }
      @media screen and (min-width: 500px) {
        &__title {
          font-size: 1.5em;
          margin-bottom: 1rem;
        }
        &__input-group {
          margin-bottom: 1rem;
        }
      }
    }
  }
}

</style>