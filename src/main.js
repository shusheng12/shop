import Vue from 'vue'
import App from './App.vue'

//导入路由vuex
import router from './router'
import store from './store'

//导入element-ui
import '@/assets/element.js'

//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

//引入$Bus
Vue.prototype.$bus = new Vue()

//全局过滤器
import Filters from '@/utils//Filters';
for (let k in Filters) {
  Vue.filter(k, Filters[k]);
}
//时间过滤器
Vue.filter('dateFormat', (originVal) => {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
