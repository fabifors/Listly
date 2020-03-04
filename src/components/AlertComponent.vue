<template>
  <div
    class="alert-component"
  >
    <div class="alert-component__top">
      <div class="alert-component__top__icon">
        <i
          class="fad"
          :class="`${alert.icon.type} ${alert.icon.color}`"
        />
      </div>
      <div class="alert-component__top__content">
        <h3>{{ alert.title }}</h3>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-if="alert.information.first && alert.information.after">
          {{ alert.information.first }}<span class="item-name">{{ item.title }}</span>? {{ alert.information.after }}
        </p>
      </div>
    </div>
    <div class="alert-component__actions">
      <h4>Action required</h4>
      <a
        class="alert-component__actions__confirm"
        :class="alert.icon.color"
        @click="handleConfirm()"
      >
        {{ alert.actions.yes }}
      </a>
      <button
        class="alert-component__actions__cancel"
        @click="handleCancel()"
      >
        {{ alert.actions.no }}
      </button>
    </div>
    <div class="feedback" />
  </div>
</template>

<script>
export default {
  name: 'AlertComponent',
  props: {
    type: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    },
  },
  data: () => {
    return {};
  },

  computed: {
    alert: function () {
      const content = {
        information: {
          text: '',
          first: '',
          after: ''
        },
        icon: {
          type: 'fa-exclamation-circle',
          color: 'warning',
        },
        actions: {
          yes: 'Confirm',
          no: 'Cancel'
        }
      };
      switch (this.type) {
        case 'list': {
          if (this.action === 'delete') {
            content.title = 'Deleting list';
            content.information.first = 'Are you sure you would like to delete the list ';
            content.information.after = 'This action is nonreversable.';
            content.icon.color = 'danger';
            content.actions.yes = 'Delete it!';
            content.actions.no = 'Nope';
          }
          break;
        }
        case 'category': {
          if (this.action === 'delete') {
            content.title = 'Deleting Category';
            content.information.first = 'Are you sure you would like to delete the category';
            content.information.after = 'The lists that does are a part of this category will still be untouched, but will have their category reset.';
          }
          break;
        }
        default: {
          content.title = 'This is awkward';
          content.information.text = 'This is an unspecified error. I have no idea what happend. You sure you want to continue?';
          content.actions = {
            yes: "Whatever, let's go",
            no: 'What? Hell no!'
          };
        }
      }
      return content;
    }
  },

  methods: {
    handleConfirm: function () {
      this.$emit('action-confirm', this.item);
    },
    handleCancel: function () {
      this.$emit('action-cancel', this.item);
    },
  },
};
</script>

<style lang="scss" scoped>
.alert-component {
  background: var(--background-color-light);
  max-width: 700px;
  margin: 0 auto;
  border-radius: 5px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  @media screen and (min-width:700px) {
    bottom: initial;
    top: 300px;
  }

  .info {
    color: hsl(277, 55%, 45%);
  }

  .warning {
    color: hsl(40, 55%, 45%);
  }
  
  .danger {
    color: hsl(1, 55%, 45%);
  }
  
  .item-name {
    display: inline-block;
    padding: 0 0.5rem;
    background: var(--background-color--lighter);
    border-radius: 2px;
    font-weight: 600;
    font-size: 0.9rem;
    margin: 0 0.1rem;
  }

  &__top {
    padding: 1.8rem 1.8rem 1.25rem 0.3rem;

    @media screen and (min-width: 700px) {
      padding: 1.8rem 2rem 1.25rem 0.7rem;
    }
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    
    &__icon {
      margin-right: 0.5rem;
      flex-basis: 4rem;
      padding: 0 1rem;

      i {
        font-size: 2rem;
      }
    }

    &__content {
      h3 {
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
        line-height: 1.4;
      }

      p {
        line-height: 1.6;
        font-weight: 500;
      }
    }
  }

  &__actions {
    background: rgba(0,0,0,0.06);
    border-radius: 0 0 5px 5px;
    margin-top: 0.6rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem 1.25rem 1rem 1.5rem;

    h4 {
      margin-right: auto;
      color: var(--text-color-muted--light);
    }

    *:not(h4):not(:last-child) {
      margin-right: 1.4rem;
    }

    button {
      padding: 0.6rem 0.85rem;
      border: none;
      font-size: 0.95rem;
      border-radius: 5px;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 200ms ease-in-out;

      &:hover {
        opacity: 0.8;
      }
    }

    &__cancel {
      background: var(--text-color-medium);
      color: var(--text-color-light);
    }

    &__confirm {
      color: hsl(3, 74%, 53%);
      font-weight: 600;
      position: relative;
      cursor: pointer;
      padding: 0.6rem 0.75rem;

      &:hover {
        &:after {
          width: 70%;
          opacity: 0.5;
        }
      }

      &:after {
        content: '';
        display: block;
        position: absolute;
        bottom: 2px;
        left: 0px;
        right: 0;
        margin: 0 auto;
        width: 80%;
        height: 5px;
        border-radius: 10px;
        opacity: 0.35;
        background: hsl(3, 74%, 53%);
        transition: width 200ms ease-in-out, opacity 200ms ease-in-out;
      }
    }
  }
}
</style>