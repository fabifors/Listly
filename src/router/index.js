import Vue from 'vue';
import Router from 'vue-router';
import Todos from '../views/Todos';
import Lists from '../views/Lists';
import Settings from '../views/Settings';
import store from '@/store/index.js';

import Testing from '@/views/Testing';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Todos',
      component: Todos,
      beforeEnter(to, from, next) {
        if(!store.getters['lists/getCurrentList']) {
          console.log(store.getters['lists/getCurrentList']);
          next('/lists');
        } else {
          next();
        }
      }
    },
    {
      path: '/test',
      name: 'Testing',
      component: Testing
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