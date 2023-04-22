<template>
  <v-app-bar app color="#2e3c52" dark flat class="px-1" style="z-index: 9999" height="50px">
    <v-img contain height="50px" width="250px" :src="require('@/assets/flat_transparent_logo.png')"></v-img>
    <v-spacer></v-spacer>
    <v-btn text color="#d0e3ff" class="hidden-sm-and-down" to="/">Home</v-btn>
    <v-btn text color="#d0e3ff" class="hidden-sm-and-down" to="/about">About</v-btn>
    <v-btn text color="#d0e3ff" class="hidden-sm-and-down" to="/services">Services</v-btn>
    <v-btn text color="#d0e3ff" class="hidden-sm-and-down" to="/blog">Blog</v-btn>
    <v-btn text color="#d0e3ff" class="hidden-sm-and-down" to="/contact">Contact</v-btn>
    <v-btn text color="#d0e3ff" class="hidden-sm-and-down" to="/shopping">SHOP NOW</v-btn>
    <div class="mr-1 hidden-md-and-up">
      <v-menu open-on-hover bottom offset-y >
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list class="mr-1 hidden-md-and-up">
        <v-list-item v-for="item in items" :key="item.title" @click="goto(item.name)">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    </div>
    
  </v-app-bar>
</template>
  
<script>
export default {
  data: () => ({
    items: [
      {
        title: 'HOME',
        name: 'PortalHome'
      },
      {
        title: 'About',
        name: 'About'
      },
      {
        title: 'Services',
        name: 'Services'
      },
      {
        title: 'Blog',
        name: 'Blog'
      },
      {
        title: 'Contact',
        name: 'Contact'
      },
      {
        title: 'SHOP NOW',
        name: 'Category'
      }
    ]
  }),
  computed: {
  },
  methods: {
    goto(routerName) {
      if (this.$route.name !== routerName) {
        this.$router.push({
          name: routerName
        })
      }
    }
  }
}
</script>
  
<style></style>