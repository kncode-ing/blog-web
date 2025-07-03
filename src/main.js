import './assets/base.css'
// import $ from 'jquery' 
import 'semantic-ui-css/semantic.min.css';
import './assets/elem.css'
import './assets/icon.css'
// import 'semantic-ui-css/semantic.min.js' 
// window.$ = $ 
// window.jQuery = $ 

import Vue from 'vue'
import App from './App.vue'
import router from './router';
import VueRouter from 'vue-router';
import SuiVue from 'semantic-ui-vue';
// import {Upload ,Checkbox,CheckboxGroup, Dialog,Button} from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './vuex/store';

// npm install mavon-editor --save
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css'; // 核心样式

Vue.use(mavonEditor);


Vue.config.productionTip = false


Vue.use(VueRouter)
Vue.use(SuiVue)

// Vue.use(Upload)
// Vue.use(Checkbox)
// Vue.use(CheckboxGroup)
// Vue.use(Dialog)
// Vue.use(Button)
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  router:router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
