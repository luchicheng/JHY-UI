import Api from '@/services/Api'

export default {
  post (msgInfo) {
    return Api().post('messages', msgInfo)
  },
  index (search) {
    return Api().get('messages', {
      params: {
        search: search
      }
    })
  },
  put (msgInfo) {
    return Api().put('messages', msgInfo)
  },
  delete (msgId) {
    return Api().delete(`messages/${msgId}`)
  }
}
