import Vue from 'vue'
import App from './App.vue'
import VerRouter from 'vue-router'
import router from './router/index.js'
// import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './plugins/iview.js'

Vue.use(VerRouter)
// Vue.use(iView)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
