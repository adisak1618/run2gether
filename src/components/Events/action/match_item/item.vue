<template lang="html">

  <!-- <div>
    {{data | json}}
  </div> -->
  <div class="content" v-bind:class="{ 'match_active': active}" @click="itemActive(data)">
    <div class="right floated meta">
      <h3>{{data.mem_age}}</h3>
    </div>
    <div class="header">{{data.mem_name + '' + data.mem_surname}}</div>
    <div class="description">
      <div class="ui two column relaxed grid">
        <div class="column">
          {{data.mem_disabled_type ? data.mem_disabled_type : 'ไม่มีรายละเอียด'}}<br/>
        </div>
        <div class="column">
          {{'ไซด์เสื้อ ' + data.detail_size }} {{resetifnull(Match_data)}}
        </div>
      </div>
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
    'age',
    'name',
    'surname',
    'disabled_type',
    'size',
    'data'
  ],
  vuex: {
    getters: {
      Match_data: state => state.match
    },
    actions: action
  },
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
  computed: {},
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
