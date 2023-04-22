import Api from '@/services/Api'

export default {
  register (registerInfo) {
    return Api().post('register', registerInfo)
  },
  registerGuest (registerInfo) {
    return Api().post('registerGuest', registerInfo)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  passwordResetByAdmin (credentials) {
    return Api().post('passwordResetByAdmin', credentials)
  }
}
