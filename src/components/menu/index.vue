<template>
  <div v-if="$route.admin_menu === true">
    <div class="ui large top  menu transition visible">
      <div class="ui container">
        <a class="item" v-link="{ path: '/events' }">Event</a>

        <div class="right menu">
          <div class="item">
            <div class="ui search">
              <div class="ui icon input">
                <input class="prompt" type="text" placeholder="Search countries...">
                <i class="search icon"></i>
              </div>
              <div class="results"></div>
            </div>
          </div>
          <div class="item">
            <a v-if="!authen_status" class="ui green button" v-link="{ path: '/login' }">Log in</a>
            <a v-if="authen_status" @click="logout" class="ui red button" v-link="{ path: '/login' }">Logout</a>
          </div>
          <div class="item">
            <a v-if="!authen_status" class="ui primary button">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { logout } from './../../actions/authen'
export default {
  vuex: {
    getters: { authen_status: state => state.authen },
    actions: { logout }
  }
}
</script>

</style>
