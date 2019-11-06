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
          class="meta__box__actions__delete" @click="removeList()"
        >Delete list</a>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'TodoListMeta',
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    listCategoryName () {
      const cat = this.$store.getters['categories/getCategoryById'](this.list.category);
      if (cat) {
        return cat.name;
      }
      return 'No category';
    }
  },
  methods: {
    removeList () {
      const confirmDelete = confirm(`Do you really want to delete "${this.list.title}"? This action is non reversable.`);
      if (!confirmDelete) {
        return;
      } else {
        alert('List removed');
        this.$router.replace('/lists');
        this.$store.dispatch('lists/removeList', this.list.id, { root: true });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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