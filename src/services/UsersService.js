import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('users', {
      params: {
        search: search
      }
    })
  },
  show (userId) {
    return Api().get(`users/${userId}`)
  },
  post (user) {
    const ret = Api().post('users', user)
    return ret
  },
  postGuest (user) {
    console.log ('postGuest:'+user)
    // const ret = Api().post('guestUsers', user)
    // return ret
    return {}
  },
  put (user) {
    return Api().put(`users/${user.id}`, user)
  },
  delete (userId) {
    return Api().delete(`users/${userId}`)
  },
  passwordReset (credentials) {
    return Api().post('passwordReset', credentials)
  }
}
