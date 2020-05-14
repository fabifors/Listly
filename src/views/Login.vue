<template>
  <div class="login-page">
    <h1>Welcome to listly</h1>
    <button
      v-if="user == null"
      @click="loginUser()"
    >
      Login
    </button>
    <button
      v-else
      @click="signOutUser()"
    >
      Sign out {{ user.email }}
    </button>
    <transition name="fade-in">
      <p v-if="message">
        {{ message.text }}
      </p>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'LoginView',
  data: () => {
    return {
      message: null,
    };
  },
  computed: {
    ...mapGetters({
      user: 'auth/getCurrentUser'
    })
  },
  methods: {
    loginUser() {
      this.$store.dispatch('auth/loginUserWithGoogle')
        .then(res => {
          if (this.$router.history.pending) {
            this.$router.push(this.$router.history.pending.path);
          } else {
            this.$router.push('/lists');
          }
        }).catch(error => console.error(error));
    },
    signOutUser() {
      this.$store.dispatch('auth/logoutUser', { root: true })
        .then(res => {
          this.message = {
            type: 'success',
            text: 'You have successfully logged out!',
          };
          setTimeout(() => {
            this.message = null;
          }, 1000);
        }).catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style lang="scss">
.login-page {
  margin-top: 3rem;
  text-align: center;
  * {
    margin-bottom: 1.5rem;
  }
}
button {
  background: var(--background-color-light);
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

.fade-in-enter, .fade-in-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}

.fade-in-enter-active, .fade-in-leave-active {
  transition: opacity 200ms, transform 200ms;
}
</style>