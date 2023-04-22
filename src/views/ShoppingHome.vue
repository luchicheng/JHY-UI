<template>
  <v-app>
    <ShoppingNavbar class="index" />
    <Dashboard />
    <Footer />
  </v-app>
</template>

<script>
  import ShoppingNavbar from '../components/shopping/ShoppingNavbar'
  import Dashboard from '../components/shopping/Dashboard'
  import Footer from '../components/shared/Footer'

  export default {
    name: 'Home',

    components: {
      ShoppingNavbar,
      Dashboard,
      Footer

    },
  }
</script>
<style scoped>
.index{
  z-index: 9999;
}
</style>
