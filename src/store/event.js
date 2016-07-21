export const CHANGE_TAB = (state, tab) => {
  state.activityData.curentTab = tab
}
export const SET_EVENTS = (state, data) => {
  state.Event = data
}

export const SET_EVENT_DETAIL = (state, name, id, price) => {
  state.CurentEvent.event_name = name
  state.CurentEvent.event_id = id
  state.CurentEvent.event_price = price
}

export const SET_EVENT_MEMBER = (state, member) => {
  if (member instanceof Array) {
    state.CurentEvent.member = member
  } else {
    alert('Respone went wrong');
  }
}

export const APPEND_MATCH = (state, data) => {
  state.match.push(data)
}

export const RESET_MATCH = (state) => {
  state.match = []
}
