<template>
  <v-dialog v-model="dialog" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-toolbar-items>
        <v-btn v-bind="attrs" v-on="on" icon class="mx-1">
          <v-badge color="#94D0EF" :content=numInCart v-if="numInCart">
            <v-icon>mdi-cart-outline</v-icon>
          </v-badge>
          <v-icon v-if="!numInCart">mdi-cart-outline</v-icon>
        </v-btn>
      </v-toolbar-items>
    </template>
    <v-form ref="form" autocomplete="off">
      <v-card>
        <v-card-title class="headline">
          Shopping Cart
        </v-card-title>
        <v-card-text>
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
                <v-text-field label="Quantity" reverse :value="product.qty" :rules="[numberRule]"
                  @change="updateToCartQty(product.modelId, $event)"></v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field label="Comment" reverse :value="product.comment"
                  @change="updateToCartCmt(product.modelId, $event)"></v-text-field>
              </v-list-item>
              <v-list-item>
                {{ product.price * product.qty }}$
              </v-list-item>
              <v-list-item-action>
                <v-btn icon ripple @click="removeFromCart(index)">
                  <v-icon color="red lighten-1">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-divider></v-divider>
            </v-list-item>

            <h3 class="display-1 text-right font-weight-light blue--text mb-2">TOTAL: {{ total }}$</h3>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$refs.form.validate() ? dialog = false : dialog = true">
            Keep shopping
          </v-btn>
          <v-btn color="blue darken-1" text @click="checkout()">
            Check out
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
// import PaymentService from '@/services/PaymentService'
// let stripe = window.Stripe(process.env.NODE_ENV === 'production' ? 'pk_live_BAv4X0q2SplDJB89oSVG2pRc' : 'pk_test_6fMfJdRQBuh8xIbqmNIySq5r')
// let stripe = null
export default {
  name: 'shoppingCart',
  data() {
    return {
      baseURL: process.env.NODE_ENV === 'production' ? 'https://****.ca/#' : 'http://localhost:8080/#',
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
    removeFromCart(index) { this.$store.dispatch('removeFromCart', index) },
    updateToCartQty(modelId, qty) {
      if (!isNaN(parseFloat(qty)) && qty >= 0 && qty <= 999) {
        this.$store.dispatch('updateToCart', { modelId: modelId, qty: qty })
        alert('Quantity update successfully!')
      }
    },
    updateToCartCmt(modelId, comment) {
      if (comment) {
        this.$store.dispatch('updateToCart', { modelId: modelId, comment: comment })
        alert('Comment update successfully!')
      }
    },
    async checkout() {
      if (!this.$refs.form.validate()) {
        return
      }
      const isUserLogin = this.$store.state.isUserLoggedIn
      if (!isUserLogin) {
        this.dialog = false
        // alert('Please login first.')
        this.$router.push({
          name: 'precheckout'
        })
        return
      } else {
        if (!this.$store.state.user.email) {
          alert('Please update your profile with email adress.')
          this.dialog = false
          this.$router.push({
            name: 'MyInfo'
          })
          return
        }
      }
      this.dialog = false
      this.$router.push({
        name: 'checkout'
      })
      // 'http://localhost:8080/#' + path
      // let currentLocation = this.baseURL + this.$route.path
      // let successLocation = this.baseURL + 'paymentSuccess' + '?session_id={CHECKOUT_SESSION_ID}'

      // try {
      //   const newSession = await PaymentService.createCheckoutSession({
      //     inCart: this.inCart,
      //     currentLocation: currentLocation,
      //     successLocation: successLocation
      //   })
      //   stripe.redirectToCheckout({ sessionId: newSession.data.id })
      //     .then(function (result) {
      //       if (result.error) {
      //         alert(result.error.message)
      //       }
      //     })
      //     .catch(function (error) {
      //       console.error('Error:', error)
      //     })
      // } catch (err) {
      //   // console.log(err)
      //   alert(err.response.data.error)
      // }
    }
  },
  mounted() {
  }
}
</script>
