import Vue from 'vue';
import Router from 'vue-router';
import Todos from '../views/Todos';
import Lists from '../views/Lists';
import Settings from '../views/Settings';
import store from '@/store/index.js';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Todos',
      component: Todos,
      beforeEnter(to, from, next) {
        console.log(store.getters['lists/getAllLists']);
        if(!store.getters['lists/getCurrentList']) {
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