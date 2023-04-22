<template>
  <v-app>
    <HomeNavbar />
    <div class="about">
      <v-container fluid>
        
      <v-col cols="12" id="page">
        <div class="pre">
          <v-row>
            <v-col cols="12" sm="4">
              <v-card class="mx-auto" max-width="344" height="">
                <v-img src="i10.jpg" height="200px" cover></v-img>

                <v-card-title> We provide you the best </v-card-title>

                <v-card-subtitle>
                  By JH-Y KITCHEN | 06 Sep 2022
                </v-card-subtitle>
                <v-card-text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                  rem saepe sapiente deleniti, odio non laborum fuga.
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="mx-auto" max-width="344" height="">
                <v-img src="i11.jpg" height="200px" cover></v-img>

                <v-card-title> We provide you the best </v-card-title>

                <v-card-subtitle>
                  By JH-Y KITCHEN | 06 Sep 2022
                </v-card-subtitle>
                <v-card-text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                  rem saepe sapiente deleniti, odio non laborum fuga.
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card class="mx-auto" max-width="344" height="">
                <v-img src="i12.jpg" height="200px" cover></v-img>

                <v-card-title> We provide you the best </v-card-title>

                <v-card-subtitle>
                  By JH-Y KITCHEN | 06 Sep 2022
                </v-card-subtitle>
                <v-card-text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                  rem saepe sapiente deleniti, odio non laborum fuga.
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" id="biog">
        <div class="hire">
          <v-row>
            <v-col cols="12" sm="8">
              <h1 class="mt-9">Work with us for your awesome project</h1>
              <p class="text-grey">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                itaque, eaque molestiae deleniti, earum voluptate eos id dicta
                at, blanditiis
              </p>
            </v-col>
            <v-col cols="12" sm="4">
              <v-btn color="#FBDF7E" class="mt-15">Let us know</v-btn>
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