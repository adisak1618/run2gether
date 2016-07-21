<template lang="html">
  <div class="content" v-bind:class="{ 'match_active': active}" @click="itemActive()">
    <div class="right floated meta">
      <h3>{{data.mem_age}}</h3>
    </div>
    <div class="header">{{data.mem_name + '' + data.mem_surname}}</div>
    <div class="description">
      {{'ไซด์เสื้อ ' + data.detail_size }} {{resetifnull(Match_data)}}
    </div>
  </div>
</template>
<script>
import * as action from './../../../../actions/event'
export default {
  data: function () {
    return {
      active: false
    }
  },
  props: [
    'data'
  ],
  computed: {},
  methods: {
    itemActive (data) {
      this.active = this.active ? false : true
    },
    resetifnull (data) {
      if (data.length === 0) {
        this.active = false
      }
    }
  },
  vuex: {
    getters: {
      Match_data: state => state.match
    },
    actions: action
  },
  ready: function () {
    console.log('PARENT')
    console.log(this.$parent)
  },
  attached: function () {},
  components: {}
}
</script>

<style lang="css">
  .match_active{
    background: #999 !important
  }
</style>
