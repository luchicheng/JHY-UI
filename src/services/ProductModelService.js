import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('productModel', {
      params: {
        search: search
      }
    })
  },
  getProductModelDetail (productModelId) {
    return Api().get(`productModel/${productModelId}`)
  }
}
