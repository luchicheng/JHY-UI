<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <ShoppingNavbar class="index" />
    <v-card>
      <v-card-title>
        <span class="headline"></span>
      </v-card-title>
      <v-card-text>

        <v-container fluid>
          <v-row no-gutters>
            <v-spacer />
            <v-col sm="6" cols="12">
              <panel title="Login Info11">
                <v-text-field label="User Name" outlined dense v-model="userid"></v-text-field>
                <br>
                <v-text-field outlined dense v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" required
                  :rules="[v => !!v || 'Password is required']" :type="show ? 'text' : 'password'" name="password"
                  label="Enter Password" hint="At least 8 characters" counter @click:append="show = !show"
                  @keyup.enter = "login"></v-text-field>
                <br>
                <div class="danger-alert" v-html="error" />
                <br>
                <v-btn dark class="primary" @click="login" type="submit">
                  Login
                </v-btn>
              </panel>
            </v-col>
            <v-spacer />
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <Footer />
  </v-app>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import ShoppingNavbar from './shopping/ShoppingNavbar';
import Footer from './shared/Footer'
export default {
  components: {
    ShoppingNavbar,
    Footer
  },
  data() {
    return {
      show: false,
      userid: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          userid: this.userid,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'ShoppingHome'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped></style>
