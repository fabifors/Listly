<template>
  <aside class="meta">
    <h2 class="meta__title">
      list info
    </h2>
    <div class="meta__box">
      <div class="meta__box__group">
        <span class="meta__box__label">Category</span>
        <span class="meta__box__data">{{ listCategoryName }}</span>
      </div>
      <div class="meta__box__group">
        <span class="meta__box__label">Created</span>
        <span class="meta__box__data">{{ list.created | fromToday }}</span>
      </div>
      <div class="meta__box__group">
        <span class="meta__box__label">Updated</span>
        <span class="meta__box__data">{{ list.updated | fromToday }}</span>
      </div>
      <div class="meta__box__actions">
        <a
          href="#"
          class="meta__box__actions__delete" @click="handleOpenModal()"
        >Delete list</a>
      </div>
    </div>
    <transition
      name="backdrop"
      :duration="transitionDuration"
    >
      <background-component v-if="deleteModal">
        <alert-component
          class="modal"
          type="list"
          action="delete"
          :item="list"
          @action-confirm="removeList()"
          @action-cancel="handleCloseModal()"
        />
      </background-component>
    </transition>
  </aside>
</template>

<script>
import AlertComponent from '@/components/AlertComponent';
import BackgroundComponent from '@/components/BackgroundComponent';
export default {
  name: 'TodoListMeta',
  components: {
    AlertComponent,
    BackgroundComponent
  },
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      deleteModal: false,
      transitionDuration: 500
    };
  },
  computed: {
    listCategoryName () {
      const categories = this.$store.getters['categories/getCategoryById'];
      if (this.list.category) {
        return categories(this.list.category)
          ? categories(this.list.category).name
          : 'error';
      }
      return 'No category';
    }
  },
  methods: {
    handleOpenModal: function () {
      this.deleteModal = true;
    },
    handleCloseModal: function () {
      this.deleteModal = false;
    },
    removeList () {
      this.$store.dispatch('lists/removeList', this.list.id, { root: true })
        .then(res => {
          this.handleCloseModal();
        }).catch(error => console.error(error))
        .finally(res => {
          setTimeout(() => {
            this.$router.replace('/lists');
          }, this.transitionDuration);
        });
    }
  },
};

</script>

<style lang="scss" scoped>

.backdrop-enter-active {
  transition: all 0.3s ease;
  .modal {
    transition: all 0.2s 0.2s ease-out;
  }
}

.backdrop-leave-active {
  transition: all 0.3s 0.2s ease;
  .modal {
    transition: all 0.2s ease-out;
  }
}

.backdrop-enter {
  opacity: 0;
  .modal {
    opacity: 0;
    transform: translateY(110%);
  }
}

.backdrop-leave-to {
  opacity: 0;
  .modal {
    opacity: 0;
    transform: translateY(25%);
  }
}

.meta {
  // padding: 1rem;
  &__title {
    font-size: 1em;
    text-transform: uppercase;
    color: var(--text-color-dark--muted);
    margin-bottom: 0.5rem;
    margin-left: 0.5rem;
  }
  &__box {
    background: var(--white-color);
    border-radius: 5px;
    padding: 0.75rem;

    &__group {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      &:not(:last-child) {
        margin-bottom: 0.3rem;
        padding-bottom: 0.3rem;
        border-bottom: 1px solid var(--background-color-light);
      }
    }

    &__label {
      font-size: 0.8em;
      font-weight: 600;
      color: var(--text-color-muted--medium);
      text-transform: uppercase;
    }
    &__data {
      font-size: 0.8em;
      margin-left: auto;
    }
  }
}
</style>