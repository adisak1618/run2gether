<template>
  <div class="ui container">
      <br/><br/>
      <div class="ui padded segment">
        <div class="header">
          <h1 style='text-align:center'>APPLY!!!!!!!!</h1>
        </div>
        <div class="ui form">
          <div class="field">
            <label>ชื่อกิจกรรม</label>
            <input v-model="topic" type="text">
          </div>
          <div class="field">
            <label>รายละเอียด</label>
            <textarea v-model="description" rows="2" style="margin-top: 0px; margin-bottom: 0px; height: 65px;"></textarea>
          </div>
          <div class="field">
            <label>ชื่อกิจกรรม</label>
            <input v-model="topic" type="text">
          </div>
          <div class="field">
            <label>สถานที่</label>
            <input v-model="topic" type="text">
          </div>
          <div class="field">
            <label>ชื่อกิจกรรม</label>
            <input v-model="topic" type="text">
          </div>
          <button @click="addEvent(topic, description, $route)" class="green ui button right big">เพิ่ม</button>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  vuex: {
    getters: {
    }
  }
}
</script>

</style>
