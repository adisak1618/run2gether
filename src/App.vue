/*global localStorage*/
/*eslint no-undef: "error"*/
<template>
  <div id="app">
      <Menu></Menu>
      <router-view></router-view>

  </div>
</template>

<script>
import store from './store/index'
import { login, LoginSuccess, LoginFail } from './actions/authen'
import Hello from './components/Hello'
import Menu from './components/menu/index'

export default {
  components: {
    Menu,
    Hello
  },
  store,
  vuex: {
    getters: {
      authen: state => state.authen
    },
    actions: { login, LoginSuccess, LoginFail }
  },
  ready () {
    console.log(this)
    let token = 'sadfjl'
    if (token !== null && token !== '') {
      LoginSuccess(this.$store)
    } else {
      LoginFail(this.$store)
    }
  }
}
</script>

<style>

</style>
