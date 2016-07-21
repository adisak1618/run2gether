import Vue from 'vue'
import Vuex from 'vuex'
import * as Login from './login'
import * as event from './event'
import { eventData } from './mocdata/event'
// Make vue aware of Vuex
Vue.use(Vuex)

const state = {
  authen: false,
  token: '',
  count: 0,
  Regis:{
    step: 0,
    user_data: {
      "mem_id_num": "1730600113916",
      "mem_name": "xxxxxx",
      "mem_surname": "กิจสวัสดิ์",
      "mem_nickname": "อั้ม",
      "mem_gender": "m",
      "mem_age": "22",
      "mem_email": "thanakornaum@gmail.com",
      "mem_tel": "028110804",
      "mem_date": "0000-00-00",
      "mem_pic": "xxxxx",
      "mem_discription": "",
      "mem_department": "",
      "mem_type": "disabled",
      "mem_disabled_type": "blind",
      "event_id":19
    },
    other: []
  },
  CurentEvent: {
    event_name: 'Unknow',
    event_id: -1,
    event_price: -1,
    member: []
  },
  Event: [
    {
      'name': 'Run for your life',
      'number': 1500,
      'description': 'Let run together in 12/12/2016',
      'createDate': '12-12-2015'
    },
    {
      'name': 'Run for your life',
      'number': 1500,
      'description': 'Let run together in 12/12/2016',
      'createDate': '12-12-2015'
    },
    {
      'name': 'Run for your life',
      'number': 1500,
      'description': 'Let run together in 12/12/2016',
      'createDate': '12-12-2015'
    }
  ],
  match: [],
  activityData: {
    curentTab: 0,
    data: []
  }
}

const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  },
  LOGIN (state) {
    state.authen = true
  },
  LOGOUT (state) {
    state.authen = false
  }
}

export default new Vuex.Store({
  state: Object.assign({}, state, eventData),
  mutations: Object.assign({}, mutations, Login, event)
})
