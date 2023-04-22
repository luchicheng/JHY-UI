<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <ShoppingNavbar class="index" />
    <v-container fluid>
      <v-row no-gutters>
        <v-spacer />
        <v-col sm="12" cols="12">
          <v-card>
            <v-layout>
            <v-flex xs12>
              <payments-search-panel />
              <payments-panel class="mt-2" />
            </v-flex>
          </v-layout>
          </v-card>
          
        </v-col>
      </v-row>
    </v-container>
    <Footer/>
  </v-app>
</template>

<script>
import PaymentsPanel from './PaymentsPanel'
import PaymentsSearchPanel from './PaymentsSearchPanel'
import { mapState } from 'vuex'
import ShoppingNavbar from '../shopping/ShoppingNavbar';
import Footer from '../shared/Footer'

export default {
  components: {
    ShoppingNavbar,
    Footer,
    PaymentsPanel,
    PaymentsSearchPanel    
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data() {
    return {
      // payments: null
    }
  },
  async mounted() {
    // this.payments = (await PaymentsService.index()).data
  }
}
</script>

<style scoped></style>
