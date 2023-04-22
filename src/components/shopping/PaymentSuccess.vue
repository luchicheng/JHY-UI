<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <ShoppingNavbar class="index" />
    <v-container height="600px" class="my-10" >
      <v-card class="mx-auto" mx-10>
        <v-img class="white--text align-end" height="600px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
          <v-card-title>
            <h1>Thanks for your order!</h1>
            <div>We appreciate your business!
            If you have any questions, please
            <router-link :to="{ name: 'Contact', hash: '#contact-us' }"> CONTRACT US</router-link>
            or email <a href="mailto:info@jhykitchen.com">info@jhykitchen.com</a>.
          </div>
          </v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">
        </v-card-subtitle>

        <v-card-text class="text--primary">
          
        </v-card-text>

        <v-card-actions>

          
        </v-card-actions>
      </v-card>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import PaymentService from '@/services/PaymentService'
import ShoppingNavbar from '../shopping/ShoppingNavbar';
import Footer from '../shared/Footer'
// var util = require('util')
export default {
  data: () => ({
  }),
  async mounted() {
    this.$store.dispatch('clearCart')
    if (this.$route.query.session_id) {
      console.log('update success payment with id', this.$route.query.session_id)
      await PaymentService.markPaymentSuccess(this.$route.query.session_id)
    }
  },
  components: {
    ShoppingNavbar,
    Footer
  }
}
</script>
