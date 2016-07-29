export const CHANGE_TAB = (state, tab) => {
  state.activityData.curentTab = tab
}
export const SET_EVENTS = (state, data) => {
  state.Event = data
}

export const SET_EVENT_DETAIL = (state, name, id, price, data) => {
  state.CurentEvent.event_name = name
  state.CurentEvent.event_id = id
  state.CurentEvent.event_price = price
  state.CurentEvent.data = data
}

export const SET_EVENT_MEMBER = (state, member) => {
  if (member instanceof Array) {
    state.CurentEvent.member = member
  } else {
    alert('Respone went wrong');
  }
}
export const REMOVE_MATCH = (state, id) => {
  state.match = state.match.filter(function (item) {
    if (item.mem_id === id) {
      return false
    } else {
      return true
    }
  })
}

export const APPEND_MATCH = (state, data) => {
  state.match.push(data)
}

export const RESET_MATCH = (state) => {
  state.match = []
}
