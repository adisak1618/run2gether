<template>
  <div>
    <br/><br/><br/><br/>
    <div class="ui middle aligned center aligned grid">
      <div class="five wide column">
        <h2 class="ui teal image header">
          <img src="./../../assets/logo.png" class="image">
          <div class="content">
            Log-in to your account
          </div>
        </h2>
        <form class="ui large form">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="email" placeholder="E-mail address">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Password">
              </div>
            </div>
            <div class="ui fluid large teal submit button" @click="login">Login</div>
          </div>

          <div class="ui error message"></div>

        </form>

        <div class="ui message">
          New to us? <a  @click="test">Sign Up</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from './../../actions/authen'
export default {
  vuex: {
    getters: { authen_status: state => state.authen },
    actions: { login }
  },
  methods: {
    test: () => {
      window.location = '/#!/'
    }
  },
  route: {
    data: function (transition) {
      console.log(transition)
    }
  }
}
</script>

</style>
