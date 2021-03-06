import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http'

import './style.css'

Vue.config.productionTip = false
Vue.prototype.$http = http /* 将http加载到vue的原型上面之后，在任意界面，都可以使用this.$http进行访问 */

Vue.mixin({
  computed: {
    uploadUrl () {
      return this.$http.defaults.baseUrl + '/upload'
    }
  },
  methods: {
    getAuthHeaders () {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  },
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
