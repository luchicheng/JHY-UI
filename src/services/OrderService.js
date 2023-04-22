import Api from '@/services/Api'

export default {
  /**
   * 
   * @param {*} criteria :
   *  search: fuzzy query order Delivery Instruction, Pickup Instruction
   *  orderTsFrom, orderTsTo: order creation timestamp range
   *  last30days: true or false, order creation timestamp range
   *  orderFilter:  // orderFilter = 'ALL' with userId empty: query all
                      // orderFilter = 'ALL' with non-empty userId: query userId only
                      // orderFilter != ALL, query userId = orderFilter only
                      // non-ALL: query UserId = orderFilter only, ignore the value from userId
   * @param {*} orderFilter 
   * @returns 
   */
  index (criteria, orderFilter) {
    return Api().get('orders', {
      params: {
        search: criteria.search,
        userId: criteria.userId,
        orderTsFrom: criteria.orderTsFrom,
        orderTsTo: criteria.orderTsTo,
        last30days: criteria.last30days,
        orderFilter: orderFilter
      }
    })
  },
  post (order) {
    // console.log('updating:', payment)
    let orders = []
    orders.push(order)
    const ret = Api().post('orders', orders)
    return ret
  },
  updateOrderStatus (order) {
    // console.log('updating:', payment)
    let playload = {
      id: order.id,
      status: order.status,
    }

    
    const ret = Api().post('orders', playload)
    return ret
  },
  delete (orderId) {
    return Api().delete(`orders/${orderId}`)
  }
}
