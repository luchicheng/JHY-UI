<template>
  <v-footer dark padless style="z-index: 9999">
    <v-card flat tile color="#2e3c52" class="white--text py-12 px-5" width="100%">
      <v-row>
        <v-col cols="12" sm="3">
          <v-img 
            :src="require('@/assets/transparent_logo.png')" contain max-height="200"></v-img>
        </v-col>
        <v-col cols="12" sm="3">
          <v-card-text class="white--text pt-0">
            <h3>Get Help</h3>
          </v-card-text>
          <v-card-text class="grey--text"> Order Status </v-card-text>
          <v-card-text class="grey--text mt-n4">
            Shipping and Delivery
          </v-card-text>
          <v-card-text class="grey--text mt-n4"> Payment Options </v-card-text>
          <v-card-text class="grey--text mt-n4"> Contact US </v-card-text>
          <v-card-text class="grey--text mt-n4"> Guides </v-card-text>
          
          
        </v-col>
        <v-col cols="12" sm="3">
          <v-card-text class="white--text pt-0">
            <h3>About US</h3>
          </v-card-text>
          <v-card-text class="grey--text"> Careers </v-card-text>
          <v-card-text class="grey--text mt-n4"> Sustainability </v-card-text>
          <v-card-text class="grey--text mt-n4"> Service </v-card-text>
          <v-card-text class="grey--text mt-n4">
            CA Supply Chains Act
          </v-card-text>
          <v-card-text class="grey--text mt-n4"> Privacy Policy </v-card-text>
          <v-card-text class="grey--text mt-n4"> Terms of Use </v-card-text>
        </v-col>
        <v-col cols="12" sm="3">
          <v-card-text class="pt-0">
            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-1 white--text"
              icon
            >
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
          <v-card-text class="grey--text mt-14"> Payment Methods: </v-card-text>
          <v-toolbar flat color="transparent">
            <v-icon large>fab fa-cc-visa</v-icon>
            <v-icon class="mx-2" large>fab fa-cc-paypal</v-icon>
          </v-toolbar>
          
          <v-card-text class="grey--text"> JH-Y Kitchen &#169; 2023 </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>

<style>
</style>