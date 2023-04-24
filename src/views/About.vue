<template>
  <v-app>
    <HomeNavbar />
    <div class="service">
      <v-container fluid>
        <v-col cols="12" id="page">
          <div class="pre">
            <v-row>
              <v-col cols="12" sm="12">
                <v-card class="mx-auto" max-width="900" height="">
                  <v-img :src="require('@/assets/gallery/Deepa_SW_79.jpg')" class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="400px" cover>
                    <v-card-title>About Us</v-card-title>
                  </v-img>

                  <v-card-title>History</v-card-title>

                  <v-card-subtitle></v-card-subtitle>
                  <v-card-text>
                    Since 2007 our family has been in the cabinet manufacture business; producing and selling quality
                    products to the public of Canada.
                    We are located at Markham, Ontario. Where all of our cabinets and doors are proudly made right here in
                    Ontario with state-of-the-art machinery.
                    JH-Y Kitchen offers timeless style at an affordable price.
                    All our cabinets go through rigorous quality control to ensure you are getting the best cabinet that
                    you want for your dream place!
                    Our pre-assembled cabinetry is especially great for contractors, builders and DIY projects. Our
                    showroom is located at 144 Bullock Drive,
                    Markham ON L3P 1W2. We welcome you to visit!
                  </v-card-text>
                  <v-card-title>Our Promise</v-card-title>
                  <v-card-subtitle></v-card-subtitle>
                  <v-card-text>
                    We depends on valued customers like you being so satisfied and happy with your kitchen or vanity etc
                    that you brag to your friends about the quality and the price.
                    We stand behind our products and would love to have an opportunity to earn your business.
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-container>
    </div>

    <Footer />
  </v-app>
</template>
<script>
import HomeNavbar from '../components/shared/HomeNavbar'
import Footer from '../components/shared/Footer'

export default {
  name: 'HomeView',
  data: () => ({
  }),
  components: {
    HomeNavbar,
    Footer

  },
}
</script>
<style scoped>
.egg {
  display: block;
  margin-left: 100px;
  margin-top: 50px;
  width: 356px;
  height: 300px;
  background-color: #9e8665;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
}</style>
