<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <ShoppingNavbar class="index" />
    <v-container fluid>
      <v-row no-gutters>
        <v-spacer />
        <v-col sm="6" cols="12">
          <v-card>
            <v-toolbar flat>
              <v-toolbar-title>{{ title }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <template v-slot:extension>
                <v-tabs v-model="tabs">
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab href="#tr-tabs-5-1">
                    <v-icon>mdi-account-box</v-icon>
                    User and Billing Information
                  </v-tab>

                  <v-tab href="#tr-tabs-5-2">
                    <v-icon>mdi-calendar-multiple-check</v-icon>
                    Shipment information
                  </v-tab>

                  <v-tab href="#tr-tabs-5-3">
                    <v-icon>mdi-calendar-plus</v-icon>
                    Review order
                  </v-tab>
                </v-tabs>
              </template>
            </v-toolbar>

            <v-tabs-items v-model="tabs">
              <v-tab-item v-for="i in 3" :key="i" :value="'tr-tabs-5-' + i">
                <v-card v-if="i == 1" flat>
                  <GuestBillingInfo :userInfo="userInfo" @goToShipment="goToShipment"/>
                </v-card>
                <v-card v-if="i == 2" flat>
                  <ShipmentInfo :userInfo="userInfo" @goToOrderReview="goToOrderReview"/>
                </v-card>
                <v-card v-if="i == 3" flat>
                  <ReviewOrder :userInfo="userInfo" :deliveryInfo="deliveryInfo" />
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import ShoppingNavbar from '../shopping/ShoppingNavbar';
import Footer from '../shared/Footer'
import GuestBillingInfo from './GuestBillingInfo'
import ReviewOrder from './ReviewOrder'
import ShipmentInfo from './ShipmentInfo'


export default {
  data() {
    return {
      // default tab
      tabs: 'tr-tabs-5-1',
      userInfo: {},
      deliveryInfo: {},
      runnerId: null,
      runnerName: '',
      keyCurrentTrainingRecords: 0
    }
  },
  computed: {
    ...mapState([
      'route'
    ]),
    title: function () {
      if (this.$store.state.isUserLoggedIn) {
        return 'Checkout'
      }else{
        return 'Checkout as Guest'
      }
    }
  },
  methods: {
    goToShipment(userInfo) {
      console.log ('entering to shippment page:' + JSON.stringify(userInfo))
      this.userInfo = userInfo
      this.tabs = 'tr-tabs-5-2'
    },
    goToOrderReview(userInfo, deliveryInfo) {
      console.log ('entering to OrderReview page:' + JSON.stringify(deliveryInfo))
      console.log ('entering to OrderReview page:' + JSON.stringify(userInfo))
      this.deliveryInfo = deliveryInfo
      this.userInfo = userInfo
      this.tabs = 'tr-tabs-5-3'
    }
  },
  async mounted() {
    this.userInfo = Object.assign({}, this.$store.state.user)
    console.log('mounted:' + JSON.stringify(this.userInfo))
  },
  components: {
    GuestBillingInfo,
    ReviewOrder,
    ShoppingNavbar,
    Footer,
    ShipmentInfo
  }
}
</script>

<style scoped></style>
