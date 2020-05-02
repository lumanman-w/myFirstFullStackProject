import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http'

Vue.config.productionTip = false
Vue.prototype.$http = http /* 将http加载到vue的原型上面之后，在任意界面，都可以使用this.$http进行访问 */

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
