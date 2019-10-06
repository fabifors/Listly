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
          <router-link
            to="/lists"
            class="navigation__list__item"
          >
            Lists
          </router-link>
          <router-link
            to="/settings"
            class="navigation__list__item"
          >
            Settings
          </router-link>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Navbar',
  data: () => {
    return {};
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
        
      }
    }
  }
}
</style>