<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <ShoppingNavbar class="index" />
    <v-container fluid>
      <v-card tile class="mx-16 my-10" color="white" outlined elevation="11">
        <v-row>
          <v-col cols="12" sm="6">
            <v-card color="#f1f1f1" class="align-center rounded-lg mx-4 my-6" height="500" flat>
              <v-row align="center">
                <v-col cols="12" sm="12" align="center">
                  <h3>Checkout as Guest</h3>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" sm="12" align="center">
                  <h5>No account? No Problem.</h5>
                </v-col>
              </v-row>
              <v-card-title>

              </v-card-title>
              <v-card-text>

              </v-card-text>
              <v-row align="center">
                <v-col cols="12" sm="12" align="center">
                  <v-btn dark color="#444C5C" @click="goto('checkout')">
                    Checkout as Guest
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card class="align-center rounded-lg mx-4 my-6" height="500" flat>
              <v-row align="center">
                <v-col cols="12" sm="12" align="center">
                  <panel title="Sign In">
                    <v-text-field label="User Name" outlined dense v-model="userid"></v-text-field>
                    <br>
                    <v-text-field outlined dense v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      required :rules="[v => !!v || 'Password is required']" :type="show ? 'text' : 'password'"
                      name="password" label="Enter Password" hint="At least 8 characters" counter
                      @click:append="show = !show"></v-text-field>
                    <br>
                    <div class="danger-alert" v-html="error" />
                    <br>
                    forgot password?
                    <br>
                    <v-btn dark class="primary" @click="signInAndCheckout">
                      Sign In And Checkout
                    </v-btn>
                  </panel>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import AuthenticationService from '@/services/AuthenticationService'
import ShoppingNavbar from '../shopping/ShoppingNavbar';
import Footer from '../shared/Footer'
export default {
  data() {
    return {
      show: false,
      userid: '',
      password: '',
      error: null,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      }
    }
  },
  components: {
    ShoppingNavbar,
    Footer
  },
  computed: {
    ...mapState([
      'route'
    ]),
  },
  methods: {
    goto(routerName) {
      if (this.$route.name !== routerName) {
        this.$router.push({
          name: routerName
        })
      }
    },
    async signInAndCheckout() {
      try {
        const response = await AuthenticationService.login({
          userid: this.userid,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'checkout'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  async mounted() {
  },
}
</script>

<style></style>