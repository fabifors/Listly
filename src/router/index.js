import Vue from 'vue';
import Router from 'vue-router';
import TodosPage from '../views/TodosPage';
import MyLists from '../views/MyLists';
import SettingsPage from '../views/SettingsPage';
import store from '@/store/index.js';

import Testing from '@/views/Testing';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodosPage',
      component: TodosPage,
      beforeEnter(to, from, next) {
        if(!store.getters['lists/getCurrentList']) {
          console.log(store.getters['lists/getCurrentList']);
          next('/lists');
        } else {
          console.log('Should have current list');
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
      name: 'MyLists',
      component: MyLists
    },
    {
      path: '/settings',
      name: 'SettingsPage',
      component: SettingsPage
    }
  ]
});