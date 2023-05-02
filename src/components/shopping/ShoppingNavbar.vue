<template>
  <v-app-bar app color="#2e3c52" dark>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-divider vertical class="ml-1 mr-3"></v-divider>
    <v-menu :close-on-content-click="false" open-on-hover bottom offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-group v-for="item in displayedMenus" :key="item.title" v-model="item.active"
          @click="goto(item.name, false)" no-action>
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item v-for="subItem in item.items" :key="subItem.title" @click="goto(subItem.name, subItem.isCategory)">
            <v-list-item-content>
              <v-list-item-title>{{ subItem.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-menu>
    <v-toolbar-title><span class="caption">Select</span> <br />{{ currentCategory }}</v-toolbar-title>

    <v-divider vertical class="ml-5"></v-divider>
    <div style='position: absolute;  margin-left: auto; margin-right: auto; left: 0; right: 0; text-align: center;'>
      <h4>JH-Y KITCHEN</h4>
    </div>

    <v-spacer></v-spacer>

    <v-divider vertical class=""></v-divider>


    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        {{ loginUserType }} {{ $store.state.user ? $store.state.user.email : "" }}
        <v-btn icon class="mx-1" v-bind="attrs" v-on="on">
          <v-icon>mdi-account-outline</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in displayedAcctMenus" :key="index" @click="goto(item.name, false)">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="this.$store.state.isUserLoggedIn" role="menuitem">
          <v-list-item-content>
            <v-list-item-title @click="logout">Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-divider vertical class=""></v-divider>
    <ShoppingCart />
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import ShoppingCart from './ShoppingCart'
export default {
  created() {
    this.$store.dispatch('syncCategories')
  },
  components: {
    ShoppingCart
  },
  data: () => ({
    // isUserLogin: this.$store.state.isUserLoggedIn,
    acctItems: [
      { title: 'Sign On', name: 'Register', login_required: false, anonymous_required: true, enabled: true },
      { title: 'Login', name: 'Login', login_required: false, anonymous_required: true, enabled: true },
      { title: 'My Credentials', name: 'MyCredentials', login_required: true, enabled: true },
      { title: 'My Information', name: 'MyInfo', login_required: true, enabled: true },
      { title: 'My Orders', name: 'MyOrders', login_required: true, enabled: true },
    ],
    items: [
      {
        action: 'PortalHome', title: 'Home', name: 'PortalHome', active: true, enabled: true, login_required: false,
        items: [
          { title: 'About', name: 'About', enabled: true },
          { title: 'Services', name: 'Services', enabled: true },
          { title: 'Blog', name: 'Blog', enabled: true },
          { title: 'Contact', name: 'Contact', enabled: true }
        ]
      }
      // ,
      // {
      //   action: 'category',
      //   title: 'Category',
      //   active: true,
      //   enabled: true,
      //   login_required: false,
      //   items: [
      //     { title: 'Kitchen Base Cabinet', name: 'Kitchen Base Cabinet', enabled: true },
      //     { title: 'Photos', name: 'albums', enabled: true },
      //     { title: 'Video', name: 'videos', enabled: true },
      //     { title: 'Coaches', name: 'coaches', enabled: true },
      //     { title: 'Hall of Fame', name: 'halloffame', enabled: true }
      //   ]
      // }
    ]
  }),
  computed: {
    ...mapState([
      'route', 'categories', 'inCart'
    ]),
    loginUserType: function () {
      if (this.$store.state.isUserLoggedIn && this.$store.state.user) {

        if (this.$store.state.user.userType === 'A') {
          return 'Admin'
        }
        if (this.$store.state.user.userType === 'R') {
          return 'User'
        }
      }
      return null
    },
    displayedMenus: function () {
      const isUserLogin = this.$store.state.isUserLoggedIn
      var r = this.items.filter(function (i) {
        return (i.enabled && (!i.login_required || isUserLogin))
      })
      r.forEach((obj) => {
        obj.items = _.pickBy(obj.items, function (i) {
          return (i.enabled && (!i.login_required || isUserLogin))
        })
      })
      return r
    },
    displayedAcctMenus: function () {
      const isUserLogin = this.$store.state.isUserLoggedIn
      var r = this.acctItems.filter(function (i) {
        return (i.enabled && (!i.login_required || isUserLogin) && (!i.anonymous_required || !isUserLogin))
      })
      console.log('displayedAcctMenus:' + JSON.stringify(r))
      return r
    },
    currentCategory: function () {
      // console.log( 'this.route:' + JSON.stringify(this.$route.params.category) )
      if (this.$route && this.$route.params && this.$route.params.category)
        return this.$route.params.category
      else
        return 'Category'
    }
  },
  mounted() {
    this.initCategoryMenu()
    // console.log('init category menu items done!' + JSON.stringify(categoryMenu))
    // console.log('init category menu items done!' + JSON.stringify(this.items))
  },
  methods: {
    initCategoryMenu() {
      let categoryMenuItems = [];
      this.categories.forEach(i => {
        let r = {}
        r.title = i.type;
        r.name = i.type;
        r.enabled = true;
        r.isCategory = true;
        categoryMenuItems.push(r)
      })
      let categoryMenu = {}
      categoryMenu.action = 'category'
      categoryMenu.title = 'Category'
      categoryMenu.active = true
      categoryMenu.enabled = true
      categoryMenu.login_required = false
      categoryMenu.name = 'ShoppingHome'
      categoryMenu.items = categoryMenuItems
      this.items.push(categoryMenu)
    },
    goto(routerName, isCategory) {
      if (isCategory && isCategory === true) {
        this.$router.push({
          name: 'Category',
          params: {
            category: routerName
          }
        })
      } else {
        if (this.$route.name !== routerName) {
          this.$router.push({
            name: routerName
          })
        }
      }

    },
    // gotoCategory(name) {
    //   // console.log('gotoCategory page:', name)

    // },
    logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      if (this.$route.name !== 'ShoppingHome') {
        this.$router.push({
          name: 'ShoppingHome'
        })
      }
    }
  }
}
</script>

<style>
.v-toolbar__title {
  font-size: 1rem !important;
}

.v-badge__badge {
  font-size: 10px !important;
  height: 18px !important;
  min-width: 18px !important;
}
</style>