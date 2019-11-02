<template>
  <div class="new-todo">
    <header v-if="listTitle">
      <h2
        v-if="!title.editing"
        class="new-todo__heading" 
        @click="editTitle()"
      >
        {{ listTitle }}
      </h2>
      <form 
        v-else
        class="new-title" 
        @submit.prevent="changeTitle()"
      >
        <input 
          ref="newTitle" 
          v-model="title.content" 
          class="new-title__input"  
          autocomplete="off"
        >
      </form>
    </header>
    <form
      class="new-todo__form"
      @submit.prevent="addTodo(content)"
    >
      <label
        class="new-todo__form__label"
        for="todo"
      >Add a todo</label>
      <div class="input-container">
        <input
          id="todo"
          v-model="content"
          class="new-todo__form__input"
          type="text"
          placeholder="Add todo"
          autocomplete="off" 
        >
        <button
          class="new-todo__form__button"
          type="submit"
        >
          <i class="fas fa-paper-plane" />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'NewTodo',
  data: () => {
    return {
      content: '',
      title: {
        content: '',
        editing: false
      }
    };
  },
  computed: {
    ...mapGetters({
      listTitle: 'lists/getListTitle',
      listId: 'lists/getCurrentListId'
    })
  },
  methods: {
    addTodo(todo) {
      if(!this.content) {
        return;
      }
      this.$store.dispatch('addTodo', { todo, listId: this.listId });
      this.content = '';
    },

    editTitle() {
      this.title.editing = true;
      this.title.content = this.listTitle;
      setTimeout(() => {
        this.$refs.newTitle.focus();
      }, 25);
    },

    changeTitle() {
      const title = this.title.content;
      this.$store.dispatch('lists/changeListTitle', { title, listId: this.listId}, { root: true });
      this.title.content = '';
      this.title.editing = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.new-todo {
  color: var(--text-color-dark);
  margin: 1rem 0 1.25rem;
  
  @media screen and (min-width: 500px) {
    margin-bottom: 2rem;
  }
  .new-title {
    padding: 0;

    &__input {
      width: 100%;
      font-family: 'Proxima Nova';
      font-size: 3em;
      border: 2px dashed var(--background-color);
      border-radius: 5px;
      background: none;
      color: var(--text-color-dark);
      font-weight: bold;
      padding: 0;
      margin-bottom: 1.5rem;
    }
  }

  &__heading {
    font-size: 3em;
    margin-bottom: 1.5rem;
    color: var(--text-color-dark);
  }

  &__form {
    display: flex;
    flex-direction: row;

    &__label {
      display: none;
    }

    .input-container {
      position: relative;
      width: 100%;
    }

    &__input {
      display: block;
      width: 100%;
      padding: 0.5rem 0.5rem 0.5rem 0.75rem;
      line-height: 1.4em;
      font-size: 1em;
      border: 2px solid;
      color: var(--text-color-dark);
      font-weight: 400;
      border-color: var(--text-color-medium);
      border-radius: 5px;
    }

    &__button {
      position: absolute;
      right: 0.5rem;
      top: 0.15rem;
      padding: 0.5rem;
      line-height: 1.4em;
      font-size: 1em;
      border: none;
      border-radius: 5px;
      background: none;
      color: var(--text-color-medium);
    }
  }
}
</style>