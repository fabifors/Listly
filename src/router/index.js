import Vue from 'vue';
import Router from 'vue-router';
import Todos from '../views/Todos';
import Lists from '../views/Lists';
import Settings from '../views/Settings';
import store from '@/store.js';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Todos',
      component: Todos,
      beforeEnter(to, from, next) {
        if(!store.state.currentList) {
          next('/lists');
        } else {
          next();
        }
      }
    },
    {
      path: '/lists',
      name: 'Lists',
      component: Lists
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
});