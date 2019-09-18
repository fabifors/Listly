import Vue from 'vue';
import Router from 'vue-router';
import Todos from '../views/Todos';
import Lists from '../views/Lists';
import Settings from '../views/Settings';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Todos',
      component: Todos
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