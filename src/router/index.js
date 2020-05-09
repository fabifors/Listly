import Vue from 'vue';
import Router from 'vue-router';
import TodosPage from '@/views/TodosPage';
import MyLists from '@/views/MyLists';
import SettingsPage from '@/views/SettingsPage';
import Login from '@/views/Login';
import store from '@/store/index.js';

import { Firebase } from '../firebase/index'; 

import Testing from '@/views/Testing';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'TodosPage',
      component: TodosPage,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/test',
      name: 'Testing',
      component: Testing,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/lists',
      name: 'MyLists',
      component: MyLists,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/settings',
      name: 'SettingsPage',
      component: SettingsPage,
      meta: {
        requiresAuth: true,
      }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isLoggedIn = await Firebase.getCurrentAuthStatus();
  if (requiresAuth && !isLoggedIn) {
    next({ path: '/login' });
  } else {
     next();
  }
});

export default router;