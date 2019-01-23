import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import Pipeline from './pipeline'
const pipeline1 = new Pipeline(1000, 0)
const pipeline2 = new Pipeline(300, 0.2)
pipeline1.run()
pipeline2.run()

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    getPipeline: function (index) {
      if (index == 1) {
        return pipeline1
      } else if (index == 2) {
        return pipeline2
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
