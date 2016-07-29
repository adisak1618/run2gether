export const FilterData = (store, data, type, sort_type, invert, text, isMatch) => {
  var member_list = data
  var get_type = (type === 'disabled' ? 'disabled': 'normal')
  var sort_invert = invert === true ? -1 : 1
  member_list = member_list.filter( item => {
    switch (isMatch) {
      case 'notMatch':
        return (item.mem_type === 'all' || item.mem_type == get_type) && (item.detail_match == 'unactive')
        break;
      case 'Matched':
        return (item.mem_type === 'all' || item.mem_type == get_type) && (item.detail_match == 'active')
        break;
      default:
        return (item.mem_type === 'all' || item.mem_type == get_type)
    }
  })
  switch (Number(sort_type)) {
    case 0 :
      member_list =  member_list.sort(function(a, b){ return (Number(a.mem_age)-Number(b.mem_age))*sort_invert})
      break
    case 1 :
      member_list = member_list.sort(function(a, b){

        return ((new Date(a.mem_date)).getTime()-(new Date(b.mem_date)).getTime())*-sort_invert
      })
      break
    case 2 :
      member_list = member_list.sort(function(a, b){

        return (String(a.mem_gender).charCodeAt()-String(b.mem_gender).charCodeAt())*sort_invert
      })
      break
    case 3 :
      member_list = member_list.sort(function(a, b){

        return (String(a.mem_name).charCodeAt()-String(b.mem_name).charCodeAt())*sort_invert
      })
      break
    default:

  }
  text = String(text).toLowerCase()
  if (text.length > 2) {
    member_list = member_list.filter(item => {

      return String(item.mem_nickname).toLowerCase().search(text) !== -1 ||
      String(item.mem_name).toLowerCase().search(text) !== -1 ||
      String(item.mem_surname).toLowerCase().search(text) !== -1 ||
      String(item.mem_email).toLowerCase().search(text) !== -1 ||
      String(item.mem_id_num).search(text) !== -1 ||
      String(item.mem_tel).search(text) !== -1
    })
  }
  return member_list
}
