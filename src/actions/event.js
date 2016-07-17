import { BASE_URL } from './../const.js'
export const changeTab = (store, tab) => {
  store.dispatch('CHANGE_TAB', tab)
}
// row setup
// contentType: "application/json; charset=utf-8",
// dataType: "json",
export const addMember = (store, data) => {
  //alert('hi')
  $.ajax({
    type: 'POST',
    url: BASE_URL + '/members',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  }).success((data, e, status) => {
    if (status.status === 200) {
      console.log('Add MEMBER')
      alert('ADD MEMBER SUCCESS')
      console.log(data)
      //store.dispatch('SET_EVENTS', data)
      return true
    } else {
      return false
    }
  })
}

export const getEvent = (store) => {
  $.ajax({
    type: 'GET',
    url: BASE_URL + '/event'
  }).done((data, e, status) => {
    if (status.status === 200) {
      console.log('GET ALL EVENT')
      console.log(data)
      store.dispatch('SET_EVENTS', data)
      return true
    } else {
      return false
    }
  })
}

export const getCurrentEventDetail = (store, id) => {
  $.ajax({
    type: 'GET',
    url: BASE_URL + '/event/' + id
  }).done((data, e, status) => {
    if (status.status === 200) {
      console.log('GET SINGLE EVENT BY ID')
      console.log(data)
      setCurrentEventDetail(store, data[0].event_name, data[0].event_id, data[0].event_price)
      return true
    } else {
      return false
    }
  })
}

export const setCurrentEventDetail = (store, name, id, price) => {
  store.dispatch('SET_EVENT_DETAIL', name, id, price)
  getMemberInEvent(store, id)
}

export const getMemberInEvent = (store, id) => {
  $.ajax({
    type: 'GET',
    url: BASE_URL + '/detail_event/' + id
  }).done((data, e, status) => {
    if (status.status === 200) {
      console.log('GET ALL DETAIL EVENT')
      console.log(data)
      store.dispatch('SET_EVENT_MEMBER', data)
      return true
    } else {
      return false
    }
  })
}
