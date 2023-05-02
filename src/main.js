import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import vuetify from './plugins/vuetify'
import Panel from '@/components/globals/Panel'
import imageViewer from "vue-image-viewer";
import AOS from 'aos'
import 'aos/dist/aos.css'

Vue.config.productionTip = false
Vue.component('panel', Panel)
Vue.use(imageViewer);

new Vue({
  created () {
    AOS.init({ disable: 'mobile' })
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
