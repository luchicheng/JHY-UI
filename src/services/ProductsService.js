import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('products', {
      params: {
        search: search
      }
    })
  },
  getProductDetail (productId) {
    return Api().get(`products/${productId}`)
  },
  getProductTypeList () {
    return Api().get('productTypeList')
  },
  getProductListByFilter (typeFilter,nameFilter,priceFilter,sizeFilter) {
    return Api().get('queryProductByFilter', {
      params: {
        nameFilter: nameFilter,
        typeFilter: typeFilter,
        priceFilter: priceFilter,
        sizeFilter: sizeFilter
      }
    })
  }
}
