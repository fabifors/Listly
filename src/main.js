import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router/index.js';
import * as moment from 'moment';

import { VueMasonryPlugin } from 'vue-masonry';

Vue.config.productionTip = false;
Vue.use(VueMasonryPlugin);
Vue.filter('fromToday', function (time) {
  if(!time) return '';
  time = moment(time).startOf('hour').fromNow();
  return time;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
