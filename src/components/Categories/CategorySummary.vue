<template>
  <div class="category-summary">
    <h2 class="category-summary__title">
      All Categories
    </h2>
    <ul
      v-if="categories"
      class="category-list"
    >
      <li
        v-for="category in categories"
        :key="category.id" class="category-list__item"
      >
        <span class="category-list__item__name">{{ category.name }}</span>
        <div class="category-list__item__actions">
          <button
            class="category-list__item__actions__delete"
            @click="deleteCategory(category)"
          >
            <i class="fad fa-times" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CategorySummary',
  computed: {
    ...mapGetters({
      categories: 'categories/getAllListCategories'
    }),
  },
  methods: {
    deleteCategory (category) {
      const isDeleting = confirm(`Are you sure you want to delete "${category.name}" from all your lists and remove it?`);
      if(isDeleting) {
        alert('Deleting...');
        const payload = { category_id: category.id };
        this.$store.dispatch('categories/deleteCategory', payload);
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.category-summary {
  margin: 100px 0;

  &__title {
    margin-bottom: 1rem;
  }

  .category-list {
    list-style: none;
    &__item {
      margin-bottom: 0.5rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0.25rem;
      border-bottom: 1px solid var(--primary-color);

      &__name {
        font-weight: 600;
      }

      &__actions {
        * {
          background: none;
          border: none;
          font-size: 100%;
        }

        &__delete {
          padding: 0.25rem;
        }
      }
    }
  }
}
</style>