import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import ProductModelService from '@/services/ProductModelService'
import ProductsService from '@/services/ProductsService'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    frontdoors: [
      { img: 'products/doors/door_CHICAGO.png', code: 'CHICAGO' },
      { img: 'products/doors/door_DOUBLE_SHAKER.png', code: 'DOUBLE_SHAKER' },
      { img: 'products/doors/door_S100.png', code: 'S100' },
      { img: 'products/doors/door_SHAKER.png', code: 'SHAKER' }
    ],
    colors: [
      { name: '浅灰', code: '1111' },
      { name: '深灰', code: '2222' },
      { name: '白色', code: '3333' },
      { name: '象牙白', code: '4444' }
    ],
    inCart: [],
    categories: []
    // forSaleModels: [{"id":67,"name":"MC2430","price":400,"productId":9,"productType":"Kitchen Wall Cabinet","productName":"Microwave","image":"wall_cabinet9.png","width":24,"height":30,"deep":12,}]
  },
  getters: {
    frontdoors: state => state.frontdoors,
    colors: state => state.colors,
    inCart: state => state.inCart,
    categories: state => state.categories,
    inCartTotal: state => {
      // console.log('doing total:', state.inCart)
      return state.inCart.reduce(function (acc, obj) {
        return acc + (obj.price * obj.qty)
      }, 0)
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser(state, user) {
      state.user = user
    },
    ADD_TO_CART(state, payload) {
      // console.log('begining of ADD_TO_CART:', JSON.stringify(state.inCart))
      let find = state.inCart.find(o => o.id === payload.id &&
        o.fd.code === payload.fd.code &&
        o.color.code === payload.color.code)

      if (find) {
        // console.log('found!!!!!!!!!!!!!')
        var index = state.inCart.indexOf(find)
        let newObj = Object.assign({}, find)
        newObj.qty = Number(find.qty) + payload.qty
        state.inCart[index] = newObj
        state.inCart.push({})
        state.inCart.pop()
      } else {
        // console.log('not found@@@@@@@')
        state.inCart.push(payload)
        state.inCart.push({})
        state.inCart.pop()
      }
      // state.inCart.push(modelId)
      // console.log('end of ADD_TO_CART:', JSON.stringify(state.inCart))
    },
    UPDATE_TO_CART(state, payload) {
      let find = state.inCart.find(o => o.id === payload.id &&
        o.fd.code === payload.fd &&
        o.color.code === payload.color)
      if (find) {
        if (payload.qty) { find.qty = payload.qty }
        if (payload.comment) { find.comment = payload.comment }
        state.inCart.push({})
        state.inCart.pop()
      }
    },
    SYNC_CATEGORY(state, productTypeList) {
        state.categories= productTypeList
    },
    REMOVE_FROM_CART(state, index) { state.inCart.splice(index, 1) },
    CLEAR_CART(state) { state.inCart = [] }
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    async addToCart(context, payload) {
      let find = (await ProductModelService.getProductModelDetail(payload.id)).data;
      if (find) {
        let findFd = this.state.frontdoors.find(o => o.code === payload.fd)
        let findColor = this.state.colors.find(o => o.code === payload.color)
        find.fd = findFd
        find.color = findColor
        find.qty = payload.qty
        context.commit('ADD_TO_CART', find)
      } else {
        alert('Model not found, Add to Cart failed.')
      }
    },
    async syncCategories(context) {
      const productTypeList = (await ProductsService.getProductTypeList()).data;
      context.commit('SYNC_CATEGORY', productTypeList)
    },
    updateToCart(context, newObj) { context.commit('UPDATE_TO_CART', newObj) },
    removeFromCart(context, index) { context.commit('REMOVE_FROM_CART', index) },
    clearCart(context) { context.commit('CLEAR_CART') }
  }
})
