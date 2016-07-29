import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/home/index'
import Login from './components/login/index'
import Event from './components/Events/index'
import applyEvent from './components/apply/index'
import applyEventFrom from './components/apply/apply'
import Add from './components/Add/index'
import EventDetail from './components/Events/detail'
import addMember from './components/Events/add/index'
// import { sync } from 'vuex-router-sync'
import store from './store/index'
import '../node_modules/semantic-ui/dist/semantic.min.css'
import semantic from 'semantic'
// Sub Route Event
import Export_Event from './components/Events/action/export'
import Member_Event from './components/Events/action/member'
import Match_Event from './components/Events/action/matching'
import Payment_Event from './components/Events/action/payment'
import Success_Event from './components/Events/action/success'

// TEST
import S3 from './components/Add/s3'
/* eslint-disable no-new */
console.log('semantic')
console.log(semantic)
Vue.use(VueRouter)
// define some components

var router = new VueRouter()
// sync(store, router)

// define some routes.
// each route should map to a component.
// we'll talk about nested routes later.
router.map({
  '/': {
    component: Home,
    auth: false,
    admin_menu: true
  },
  '/s3': {
    component: S3,
    auth: false,
    admin_menu: true
  },
  '/login': {
    component: Login,
    auth: false,
    admin_menu: true
  },
  '/add': {
    component: Add,
    auth: true,
    admin_menu: true
  },
  '/events': {
    component: Event,
    auth: true,
    admin_menu: true
  },
  '/event/:id': {
    component: EventDetail,
    auth: true,
    admin_menu: true,
    subRoutes: {
      '/': {
        component: Member_Event,
        auth: true,
        admin_menu: true
      },
      '/member': {
        component: Member_Event,
        auth: true,
        admin_menu: true
      },
      '/match': {
        component: Match_Event,
        auth: true,
        admin_menu: true
      },
      '/payment': {
        component: Payment_Event,
        auth: true,
        admin_menu: true
      },
      '/success': {
        component: Success_Event,
        auth: true,
        admin_menu: true
      },
      '/export': {
        component: Export_Event,
        auth: true,
        admin_menu: true
      }
    }
  },
  '/event/:id/add': {
    component: addMember,
    auth: true,
    admin_menu: true
  },
  '/apply': {
    component: applyEvent,
    auth: false,
    admin_menu: false
  },
  '/apply/:id': {
    component: applyEventFrom,
    auth: false,
    admin_menu: false
  }
})

router.beforeEach(function (transition, next) {
  if (transition.to.auth) {
    // console.log(transition)
    if (router.app.authen === true) {
      transition.next()
    } else {
      router.go('/login')
    }
  } else {
    transition.next()
  }
})
// now we can start the app!
// router will create an instance of App and mount to
// the element matching the selector #app.
router.start(App, '#app')
