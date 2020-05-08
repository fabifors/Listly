<template>
  <div class="navbar">
    <div class="navbar__left">
      <router-link to="/">
        <h2 class="logo">
          LISTLY
        </h2>
      </router-link>
    </div>
    <div class="navbar__right">
      <nav class="navigation">
        <ul class="navigation__list">
          <li
            v-for="link in navLinks"
            :key="link.path"
          >
            <router-link
              :to="link.path"
              :class="link.type === 'link' ? 'navigation__list__item' : 'navigation__list__button'"
            >
              {{ link.label }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Navbar',
  data: () => {
    return {
      navLinks: [
        {
          label: 'Lists',
          path: '/lists',
          type: 'link',
        },
        {
          label: 'Settings',
          path: '/settings',
          type: 'link'
        },
        {
          label: 'Login',
          path: '/login',
          type: 'button',
        },
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  // display: none;
  padding: 0.75rem;
  align-items: center;
  display: flex;

  &__left {
    a {
      text-decoration: none;
    }
    .logo {
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--text-color-dark--muted)
    }
  }
  &__right {
    width: 100%;
    flex-grow: 2;

    .navigation {
      &__list {
        width: 100%;
        padding: 0;

        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;

        list-style: none;

        &__item {
          padding: 0.5rem 0.75rem;
          color: var(--text-color-medium);
          text-decoration: none;
          font-family: 'Proxima Nova', Helvetica, Arial, sans-serif;
          font-weight: 600;

          &:not(:first-child) {
            margin-left: 1rem;
          }
        }

        &__button {
          border-radius: 3px;
          padding: 0.5rem 0.75rem;
          color: var(--text-color-dark--muted);
          background-color: var(--text-color-light);
          text-decoration: none;
          font-family: 'Proxima Nova', Helvetica, Arial, sans-serif;
          font-weight: 600;
          transition: color 200ms ease-in, background 200ms ease-in;

          &:hover {
            color: var(--text-color-light);
            background-color: var(--text-color-dark--muted);
          }
        }
        
      }
    }
  }
}
</style>