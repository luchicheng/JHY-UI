<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table :headers="headers" :items="orders" sort-by="name" group-name="aaaaa" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Orders</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog2" max-width="700px">
              <v-form ref="form2" autocomplete="off">
                <v-card>
                  <v-card-title>
                    <span class="headline">Update Order Status</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <p class="text-h6 text-left">Status flow: New -> Processed -> fulfilled.</p>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="User ID" outlined disabled v-model="editedItem.userName"
                            dense></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Order ID" outlined disabled v-model="editedItem.id" dense></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete ref="fulfillSuccessful" dense v-model="editedItem.status"
                            :items="orderStatusList" outlined placeholder="Select..."
                            :rules="[v => !!v || 'This field is required']" label="Order Status"></v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-dialog>
            <v-dialog v-model="dialog" max-width="700px">
              <v-form ref="form" autocomplete="off">
                <v-card>
                  <v-card-title>
                    <span class="headline">View Order</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="User ID" outlined disabled v-model="viewedItem.userName"
                            dense></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Order ID" outlined disabled v-model="viewedItem.id" dense></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Amount ($)" outlined disabled v-model="viewedItem.totalAmount"
                            dense></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Order Created Time" outlined disabled v-model="viewedItem.tsOfOrder"
                            dense></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Order Item #" outlined disabled v-model="viewedItem.itemNumber"
                            dense></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Order Status" outlined disabled v-model="viewedItem.status"
                            dense></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Payment Successful" outlined disabled
                            v-model="viewOrderPayment.chargeSuccessful" dense></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Payment ID" outlined disabled v-model="viewOrderPayment.stripePi"
                            dense></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-text>
                    <v-container>
                      <panel title="Order Detail">
                        <v-row>
                          <v-col cols="6" style="min-width: 100px;" class="flex-grow-0 flex-shrink-1">
                            <panel title="User information">
                              <v-text-field label="Email" outlined disabled v-model="viewedItem.email" dense
                                :rules="[v => !!v || 'Email is required']"></v-text-field>
                              <v-text-field label="First Name" disabled v-model="viewedItem.fname" outlined dense
                                :rules="[v => !!v || 'First Name is required']"></v-text-field>
                              <v-text-field label="Last Name" disabled v-model="viewedItem.lname" outlined dense
                                :rules="[v => !!v || 'Last Name is required']"></v-text-field>
                              <v-text-field label="Address" disabled v-model="viewedItem.address" outlined dense
                                :rules="[v => !!v || 'Address is required']"></v-text-field>
                              <v-text-field label="Apt#" disabled v-model="viewedItem.address2" outlined
                                dense></v-text-field>
                              <v-text-field label="City" disabled v-model="viewedItem.city" outlined dense
                                :rules="[v => !!v || 'City is required']"></v-text-field>
                              <v-text-field label="Province" disabled v-model="viewedItem.province" outlined dense
                                :rules="[v => !!v || 'Province is required']"></v-text-field>
                              <v-text-field label="Post Code" disabled v-model="viewedItem.postcode" outlined dense
                                :rules="[v => !!v || 'Post Code is required']"></v-text-field>
                              <v-text-field label="Phone" disabled v-model="viewedItem.phone" outlined dense
                                :rules="[v => !!v || 'Contact Phone # is required']"></v-text-field>
                            </panel>
                          </v-col>
                          <v-col cols="6" style="min-width: 100px;" class="flex-grow-0 flex-shrink-1">
                            <panel title="Delivery information">

                              <v-radio-group v-model="viewedItem.deliveryPreference" disabled row>
                                <v-radio label="Pick up In-store - FREE" value="P">b</v-radio>
                                <v-radio label="Standard Shipping - Fee to be determined." value="S">a</v-radio>
                              </v-radio-group>
                              <div v-if="viewedItem.deliveryPreference === 'S'">
                                <panel title="Standard Shippment information">
                                  <v-checkbox v-model="viewedItem.deliveryInfoOption" disabled
                                    label="Same as Billing information"></v-checkbox>
                                  <div v-if="!viewedItem.deliveryInfoOption === true">
                                    <v-text-field label="First Name" v-model="viewedItem.deliveryFname" disabled outlined
                                      dense></v-text-field>
                                    <v-text-field label="Last Name" v-model="viewedItem.deliveryLname" disabled outlined
                                      dense></v-text-field>
                                    <v-text-field label="Address" v-model="viewedItem.deliveryAddress" disabled outlined
                                      dense></v-text-field>
                                    <v-text-field label="Unit# Apt#" v-model="viewedItem.deliveryAddress2" disabled
                                      outlined dense></v-text-field>
                                    <v-text-field label="City" v-model="viewedItem.deliveryCity" disabled
                                      :rules="[v => !!v || 'City is required']" outlined dense></v-text-field>
                                    <v-text-field label="Province" v-model="viewedItem.deliveryProvince" disabled
                                      :rules="[v => !!v || 'Province is required']" outlined dense></v-text-field>
                                    <v-text-field label="Post code" v-model="viewedItem.deliveryPostcode" disabled
                                      :rules="[v => !!v || 'Post Code is required']" outlined dense></v-text-field>
                                    <v-text-field label="Contact Phone#" v-model="viewedItem.deliveryPhone" disabled
                                      :rules="[v => !!v || 'Contact Phone # is required']" outlined dense></v-text-field>
                                  </div>
                                  <v-text-field v-model="viewedItem.deliDate" required label="Delivery Date" outlined
                                    dense readonly></v-text-field>
                                  <v-textarea label="Special Instructions" disabled v-model="viewedItem.deliInstruction"
                                    outlined dense></v-textarea>
                                </panel>
                              </div>
                              <div v-if="viewedItem.deliveryPreference === 'P'">
                                <panel title="Pick up In-store information">
                                  <v-text-field v-model="viewedItem.pickupDate" required label="Pickup Date" outlined
                                    dense readonly></v-text-field>
                                  <v-textarea label="Special Instructions" disabled v-model="viewedItem.pickInstruction"
                                    outlined dense></v-textarea>
                                </panel>
                              </div>
                            </panel>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="12" md="12" class="d-flex justify-center align-center">
                            <panel title="Order information">
                              <v-list two-line>
                                <v-list-item v-for="(product, index) in viewOrderItems" :key="'item' + index">
                                  <v-list-item-avatar>
                                    <v-img :src="getImgUrl(product.image)" />
                                  </v-list-item-avatar>
                                  <v-list-item-content>
                                    <v-list-item-title>{{ product.name }}</v-list-item-title>
                                    <v-list-item-subtitle v-html="product.description"></v-list-item-subtitle>
                                  </v-list-item-content>
                                  <v-list-item>
                                    {{ product.productType }} {{ product.productName }} {{ product.name }}
                                    {{ product.width }}*{{ product.deep }}*{{ product.height }} &#8243; {{
                                      product.unitPrice / 100
                                    }}$/each
                                  </v-list-item>
                                  <v-list-item>
                                    <v-text-field label="Color" reverse :value="product.colorCode"
                                      disabled></v-text-field>
                                  </v-list-item>
                                  <v-list-item>
                                    <v-text-field label="FrontDoor" reverse :value="product.fdCode"
                                      disabled></v-text-field>
                                  </v-list-item>
                                  <v-list-item>
                                    <v-text-field label="Quantity" reverse :value="product.itemQty"
                                      disabled></v-text-field>
                                  </v-list-item>
                                  <v-list-item>
                                    <v-text-field label="Comment" reverse :value="product.comment"
                                      disabled></v-text-field>
                                  </v-list-item>
                                  <v-list-item>
                                    {{ product.totalPrice / 100 }}$
                                  </v-list-item>
                                  <v-divider></v-divider>
                                </v-list-item>

                              </v-list>
                            </panel>
                          </v-col>
                        </v-row>
                      </panel>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" v-if="$store.state.user && ($store.state.user.userType == 'A')" small
                color="blue" class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            </template>
            <span>Update Order Status</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" v-if="$store.state.user && ($store.state.user.userType == 'A')" small
                class="mr-2" color="red" @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <span>Delete Order</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.detail`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" small color="blue" class="mr-2"
                @click="viewItem(item)">mdi-magnify</v-icon>
            </template>
            <span>View Order Detail</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.tsOfOrder.zzzzzzzz`]="{ item }">
          <span>{{ new Date(item.tsOfOrder).toLocaleString() }}</span>
        </template>
        <template v-slot:[`item.totalAmount`]="{ item }">
          <span>{{ item.totalAmount / 100 }}$</span>
        </template>
        <template v-slot:[`group.header`]="{ items, isOpen, toggle }">
          <th colspan="9">
            <v-icon @click="toggle">{{ isOpen ? 'mdi-minus' : 'mdi-plus' }}
            </v-icon>
            Paymnent ID: {{ items[0].stripePi }}, Paymnent Successful: {{ items[0].chargeSuccessful }}
          </th>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>

<script>
import OrderService from '@/services/OrderService'

export default {
  data() {
    return {
      headers: [
        { text: 'User ID', value: 'userName' },
        { text: 'Order ID', value: 'id' },
        { text: 'Amount ($)', value: 'totalAmount' },
        { text: 'Order Created Time', value: 'tsOfOrder' },
        { text: 'Order Item #', value: 'OrderItems.length' },
        // { text: 'itemQty', value: 'itemQty' },
        // { text: 'itemPrice', value: 'itemPrice' },
        // { text: 'Charge Successful', value: 'chargeSuccessful', sortable: false },
        { text: 'Payment Successful', value: 'Payment.chargeSuccessful' },
        { text: 'Order Status', value: 'status' },
        { text: 'Payment ID', value: 'Payment.stripePi' },
        { text: 'Order detail', value: 'detail', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      orders: [],
      orderStatusList: ['New', 'Processed', 'Fulfilled', 'Canceled', 'Archived'],
      dialog: false,
      dialog2: false,
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      viewedItem: {},
      viewOrderItems: [],
      viewOrderPayment: {}
    }
  },
  computed: {
    orderFilter: function () {
      if (this.$store.state.isUserLoggedIn) {
        if (this.$store.state.user.userType === 'A') {
          return 'ALL'
        } else {
          return this.$store.state.user.id
        }
      }
      return null
    }
  },
  watch: {
    date_menu(val) {
      val && setTimeout(() => (this.$refs.date_picker.activePicker = 'YEAR'))
    },
    dialog(val) {
      val || this.close()
    },
    '$route.query': {
      immediate: true,
      async handler(value) {
        // console.log('quqerying:', value)
        // console.log('orderFilter:', this.orderFilter)
        this.orders = (await OrderService.index(value, this.orderFilter)).data
      }
    }
  },
  methods: {
    getImgUrl(pic) {
      return pic && require('@/assets/products/' + pic)
    },
    editItem(item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      // console.log('editing:', this.editedItem.userName)
      this.dialog2 = true
    },
    viewItem(item) {
      console.log('view:', JSON.stringify(item))
      this.viewIndex = this.orders.indexOf(item)
      this.viewedItem = Object.assign({}, item)
      this.viewOrderItems = Object.assign({}, item.OrderItems)
      this.viewedItem.itemNumber = item.OrderItems.length
      this.viewedItem.totalAmount = item.totalAmount / 100
      this.viewOrderPayment = Object.assign({}, item.Payment)
      // console.log('editing:', this.editedItem.userName)
      this.dialog = true
    },
    async deleteItem(item) {
      const index = this.orders.indexOf(item)
      if (confirm('Are you sure you want to delete this item?')) {
        try {
          await OrderService.delete(item.id)
          this.orders.splice(index, 1)
        } catch (err) {
          // console.log(err)
          alert(err.response.data.error)
        }

      }
    },

    close() {
      this.dialog = false
      this.dialog2 = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    async save() {
      if (!this.$refs.form2.validate()) {
        return
      }
      try {
        await OrderService.updateOrderStatus(this.editedItem)
      } catch (err) {
        console.log(err)
        alert(err)
        return
      }

      if (this.editedIndex > -1) {
        Object.assign(this.orders[this.editedIndex], this.editedItem)
      } else {
        this.orders.push(this.editedItem)
      }
      alert('Order status is updated successfully.')
      this.close()
    }
  },
  async mounted() {
  }
}
</script>
