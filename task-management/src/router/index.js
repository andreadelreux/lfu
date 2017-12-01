import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Event from '@/pages/event'
import Eventbis from '@/pages/eventbis'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/event',
      name: 'Event',
      component: Event
    },
    {
      path: '/eventbis',
      name: 'Eventbis',
      component: Eventbis
    }
  ]
})
