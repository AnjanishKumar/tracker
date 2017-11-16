// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//

/**
 * Module dependency
 * @private
 */
import router from './router';
import store from './store';

/**
 * Module dependency
 * @public
 */
import Vue from 'vue';
import App from './App';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'mdi/css/materialdesignicons.css';
import {sync} from 'vuex-router-sync';


Vue.config.productionTip = true;

Vue.use(Vuetify);

sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
});
