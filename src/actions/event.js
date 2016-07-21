import { BASE_URL } from './../const.js'
export const changeTab = (store, tab) => {
  store.dispatch('CHANGE_TAB', tab)
}
// row setup
// contentType: "application/json; charset=utf-8",
// dataType: "json",
export const addMember = (store, data, route) => {
  console.log('CHECK DATA');
  console.log(JSON.stringify(data))
  $.ajax({
    type: 'POST',
    url: BASE_URL + '/members',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  }).done(function() {
    console.log('DONE!')
  })
  .fail(function(data, e, status) {
    console.log(e)
  })
  .always(function(data) {
    console.log( "complete" )
    console.log(data)
    console.log(route)
    route.router.go('/event/'+route.params.id)
  });
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

export const appendMatch = (store, data) => {
  store.dispatch('APPEND_MATCH', data)
}

export const resetMatch = (store) => {
  store.dispatch('RESET_MATCH')
}

export const matcingRunner = (store, id) => {
  var match_data = []
  if (store.state.match instanceof Array) {
    match_data = store.state.match.map(item => item.mem_id)
    console.log(match_data)
  } else {
    alert('Data is not array');
    return false
  }

  $.ajax({
    type: 'POST',
    url: BASE_URL + '/match',
    data: JSON.stringify({"mem_id": match_data, "event_id": id}),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
  }).done(function() {
    console.log('DONE!')
  })
  .fail(function(data, e, status) {
    console.log('fail')
  })
  .always(function(data) {
    console.log( "complete" )
    console.log(data)
    store.dispatch('RESET_MATCH')
    route.router.go('/event/'+route.params.id+'/match')
  });
}
