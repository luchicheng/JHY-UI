<template>
  <panel title="Review Order">
    <v-row>
      <v-col cols="6" style="min-width: 100px;" class="flex-grow-0 flex-shrink-1">
        <panel title="User information">
          <v-text-field label="Email" outlined disabled v-model="userInfo.email" dense
            :rules="[v => !!v || 'Email is required']"></v-text-field>
          <v-text-field label="First Name" disabled v-model="userInfo.fname" outlined dense
            :rules="[v => !!v || 'First Name is required']"></v-text-field>
          <v-text-field label="Last Name" disabled v-model="userInfo.lname" outlined dense
            :rules="[v => !!v || 'Last Name is required']"></v-text-field>
          <v-text-field label="Address" disabled v-model="userInfo.address" outlined dense
            :rules="[v => !!v || 'Address is required']"></v-text-field>
          <v-text-field label="Apt#" disabled v-model="userInfo.address2" outlined dense></v-text-field>
          <v-text-field label="City" disabled v-model="userInfo.city" outlined dense
            :rules="[v => !!v || 'City is required']"></v-text-field>
          <v-text-field label="Province" disabled v-model="userInfo.province" outlined dense
            :rules="[v => !!v || 'Province is required']"></v-text-field>
          <v-text-field label="Post Code" disabled v-model="userInfo.postcode" outlined dense
            :rules="[v => !!v || 'Post Code is required']"></v-text-field>
          <v-text-field label="Phone" disabled v-model="userInfo.phone" outlined dense
            :rules="[v => !!v || 'Contact Phone # is required']"></v-text-field>
        </panel>
      </v-col>
      <v-col cols="6" style="min-width: 100px;" class="flex-grow-0 flex-shrink-1">
        <panel title="Delivery information">

          <v-radio-group v-model="userInfo.deliveryPreference" disabled row>
            <v-radio label="Pick up In-store - FREE" value="P">b</v-radio>
            <v-radio label="Standard Shipping - Fee to be determined." value="S">a</v-radio>
          </v-radio-group>
          <div v-if="userInfo.deliveryPreference === 'S'">
            <panel title="Standard Shippment information">
              <v-checkbox v-model="userInfo.deliveryInfoOption" disabled label="Same as Billing information"></v-checkbox>
              <div v-if="!userInfo.deliveryInfoOption === true">
                <v-text-field label="First Name" v-model="userInfo.deliveryFname" disabled outlined dense></v-text-field>
                <v-text-field label="Last Name" v-model="userInfo.deliveryLname" disabled outlined dense></v-text-field>
                <v-text-field label="Address" v-model="userInfo.deliveryAddress" disabled outlined dense></v-text-field>
                <v-text-field label="Unit# Apt#" v-model="userInfo.deliveryAddress2" disabled outlined
                  dense></v-text-field>
                <v-text-field label="City" v-model="userInfo.deliveryCity" disabled
                  :rules="[v => !!v || 'City is required']" outlined dense></v-text-field>
                <v-text-field label="Province" v-model="userInfo.deliveryProvince" disabled
                  :rules="[v => !!v || 'Province is required']" outlined dense></v-text-field>
                <v-text-field label="Post code" v-model="userInfo.deliveryPostcode" disabled
                  :rules="[v => !!v || 'Post Code is required']" outlined dense></v-text-field>
                <v-text-field label="Contact Phone#" v-model="userInfo.deliveryPhone" disabled
                  :rules="[v => !!v || 'Contact Phone # is required']" outlined dense></v-text-field>
              </div>
              <v-text-field v-model="deliveryInfo.deliDate" required label="Delivery Date" outlined dense
                readonly></v-text-field>
              <v-textarea label="Special Instructions" disabled v-model="deliveryInfo.deliInstruction" outlined
                dense></v-textarea>
            </panel>
          </div>
          <div v-if="userInfo.deliveryPreference === 'P'">
            <panel title="Pick up In-store information">
              <v-text-field v-model="deliveryInfo.pickupDate" required label="Pickup Date" outlined dense
                readonly></v-text-field>
              <v-textarea label="Special Instructions" disabled v-model="deliveryInfo.pickInstruction" outlined
                dense></v-textarea>
            </panel>
          </div>
        </panel>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="12" class="d-flex justify-center align-center">
        <panel title="Order information">
          <v-list two-line>
            <v-list-item v-for="(product, index) in inCart" :key="'item' + index">
              <v-list-item-avatar>
                <v-img :src="getImgUrl(product.image)" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ product.name }}</v-list-item-title>
                <v-list-item-subtitle v-html="product.description"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item>
                {{ product.productType }} {{ product.productName }} {{ product.name }}
                {{ product.width }}*{{ product.deep }}*{{ product.height }} &#8243; {{ product.price }}$/each
              </v-list-item>
              <v-list-item>
                <v-text-field label="Color" reverse :value="product.color.name" disabled></v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field label="FrontDoor" reverse :value="product.fd.code" disabled></v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field label="Quantity" reverse :value="product.qty" disabled></v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field label="Comment" reverse :value="product.comment" disabled></v-text-field>
              </v-list-item>
              <v-list-item>
                {{ product.price * product.qty }}$
              </v-list-item>
              <v-divider></v-divider>
            </v-list-item>

            <h3 class="display-1 text-right font-weight-light blue--text mb-2">TOTAL: {{ total }}$</h3>
          </v-list>
        </panel>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="12" class="d-flex justify-center align-center">
        <v-btn dark class="primary" @click="gotoPayment">
          Go to Payment
        </v-btn>
      </v-col>
    </v-row>


    <br>

  </panel>
</template>

<script>
import PaymentService from '@/services/PaymentService'
import AuthenticationService from '@/services/AuthenticationService'
let stripe = window.Stripe(process.env.NODE_ENV === 'production' ? 'pk_live_BAv4X0q2SplDJB89oSVG2pRc' : 'pk_test_6fMfJdRQBuh8xIbqmNIySq5r')

export default {
  props: [
    'userInfo', 'deliveryInfo'
  ],
  name: 'shoppingCart',
  data() {
    return {
      test: 1,
      baseURL: process.env.NODE_ENV === 'production' ? 'https://****.ca/#' : 'http://localhost:8080/',
      dialog: false,
      numberRule: v => {
        if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) return true
        return 'Quantity must be a number.'
      }
    }
  },
  computed: {
    inCart() {
      // console.log('returned inCart:' + JSON.stringify(this.$store.getters.inCart))
      return this.$store.getters.inCart
    },
    numInCart() { return this.inCart.length },
    total() { return this.$store.getters.inCartTotal },
    frontdoors() {
      return this.$store.getters.frontdoors
    },
    colors() {
      return this.$store.getters.colors
    }
  },
  methods: {
    getImgUrl(pic) {
      return pic && require('@/assets/products/' + pic)
    },
    async gotoPayment() {

      const isUserLogin = this.$store.state.isUserLoggedIn
      if (isUserLogin ) {
        //update user Info??

      }else{
        this.registerGuest()
      }
      // 'http://localhost:8080/#' + path
      let currentLocation = this.baseURL + this.$route.path
      let successLocation = this.baseURL + 'paymentSuccess' + '?session_id={CHECKOUT_SESSION_ID}'

      try {
        const newSession = await PaymentService.createCheckoutSession({
          inCart: this.inCart,
          userInfo: this.userInfo,
          deliveryInfo: this.deliveryInfo,
          currentLocation: currentLocation,
          successLocation: successLocation
        })
        stripe.redirectToCheckout({ sessionId: newSession.data.id })
          .then(function (result) {
            if (result.error) {
              alert(result.error.message)
            }
          })
          .catch(function (error) {
            console.error('Error:', error)
          })
      } catch (err) {
        // console.log(err)
        alert(err.response.data.error)
      }
    },
    async registerGuest() {
      this.error = null
      if(!this.validateUserInfo(this.userInfo)){
        alert('validate failed')
        return
      }else{
        alert('validate passed')
      }
        
      try {
        console.log ('AuthenticationService.registerGuest:' + JSON.stringify(this.userInfo))
        
        const response = await AuthenticationService.registerGuest({
          userInfo: this.userInfo
        })
        if (response.data.user) {
          alert('Guest User [' + response.data.user.userid + '] has been registered succussfully. You are login now, Thank you.')
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          console.log ('AuthenticationService setToken:' + response.data.token)
        }else{
          alert('Guest User registration failed.')
        }
      } catch (error) {
        alert(error.response.data.error)
        this.error = error.response.data.error
      }
    },
    validateUserInfo(userInfo) {
      if(!userInfo){
        alert('User Infomation is missing!')
        return false
      }
      if(!userInfo.email){
        alert('User Email is missing!')
        return false
      }
      return true
    }
  },
  mounted() {
  }
}
</script>

