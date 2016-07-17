/*global localStorage: false, console: false*/
export const login = (data) => { data.dispatch('LOGIN'); window.location = '/#!/' }
export const logout = (data) => { data.dispatch('LOGOUT'); window.location = '/#!/' }
export const LoginSuccess = (store) => {
  console.log('login success')
  console.log(store)
  store.dispatch('LOGIN_SUCCESS')
}
export const LoginFail = (store) => {
  console.log('login fail')
  console.log(store)
  localStorage.setItem('token', '')
  store.dispatch('LOGOUT')
  window.location = '/#!/login'
}
