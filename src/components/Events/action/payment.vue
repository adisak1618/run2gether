<template lang="html">
  <div id="context" class="ui equal width grid">
    <div class="column center">
      <div class="ui stacked segment">
        <div class="ui yellow message">
          <i class="star icon"></i>
          To make the entire content of an item link, check out the link variation below
        </div>
        <div id="slip_list" class="ui relaxed items">
          <div class="item active">
            <div class="middle aligned content">
              <a class="header">Veronika Ossi</a>
              <div class="description">
                <p> kittens, music, and partying.</p>
              </div>
            </div>
          </div>
          <div v-for="item in [1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18]" class="item">
            <div class="middle aligned content">
              <a class="header">Veronika Ossi</a>
              <div class="description">
                <p> kittens, music, and partying.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="slip_image" class="sixteen wide mobile ten wide tablet ten wide computer column">
      <div class="ui stacked segment">
        <div id="ChatArea" class="ui chat segment">
          <img class="ui fluid image" src="/static/img/slip.jpg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  computed: {},
  ready: function () {},
  attached: function () {},
  methods: {},
  components: {}
}
</script>

<style lang="css">
</style>
