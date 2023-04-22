<template>
  <v-app>
    <HomeNavbar />
    <v-container fluid>
      <div class="text-center">
        <div style="position: relative; z-index: 9998">
          <v-img :aspect-ratio="16/8" :src="require('@/assets/demo/Anya_SW_13.jpg')">
          </v-img>
        </div>
      </div>
     
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
  import HomeNavbar from '../components/shared/HomeNavbar'
  import Footer from '../components/shared/Footer'

  export default {
    name: 'PortalHome',
    data: () => ({
    items: [
        {
          img: "i3.jpg",
        },
        {
          img: "i4.jpg",
        },
        {
          img: "i5.jpg",
        },
        {
          img: "i6.jpeg",
        },
        {
          img: "i9.jpg",
        },
        {
          img: "i8.jpg",
        },
      ],
  }),
    components: {
      HomeNavbar,
      Footer

    },
  }
</script>
<style scoped>
</style>
