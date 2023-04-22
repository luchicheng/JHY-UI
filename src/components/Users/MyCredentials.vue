<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <ShoppingNavbar class="index" />
    <v-container fluid>
      <v-row no-gutters>
        <v-spacer />
        <v-col sm="6" cols="12">

          <v-card>
            <v-card-title>
              <span class="headline">Update My Credentials</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-form ref="form" autocomplete="off">
                      <panel title="Credential Information">
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field label="User Name" v-model="userId" dense disabled></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field outlined dense v-model="userInfo.curPassword"
                              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                              :type="show ? 'text' : 'password'" name="password" label="Current Password"
                              hint="At least 8 characters" counter @click:append="show = !show"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field outlined dense v-model="userInfo.newPassword"
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                              :type="show1 ? 'text' : 'password'" name="password2" label="New Password"
                              hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field outlined dense v-model="userInfo.reNewPassword"
                              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[rules.required, rules.min, passwordConfirmationRule]"
                              :type="show2 ? 'text' : 'password'" name="input-10-1" label="Re-enter New Password"
                              hint="At least 8 characters" counter @click:append="show2 = !show2"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="12" md="12" class="d-flex justify-center align-center">
                            <v-btn dark class="primary" @click="updateCredentialInfo">
                              Update Credential information
                            </v-btn>
                          </v-col>
                        </v-row>
                      </panel>
                    </v-form>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
            </v-card-actions>
          </v-card>

          <br>
          <div class="danger-alert" v-html="error" />
        </v-col>
        <v-spacer />
      </v-row>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import UsersService from '@/services/UsersService'
import { mapState } from 'vuex'
import ShoppingNavbar from '../shopping/ShoppingNavbar';
import Footer from '../shared/Footer'
// import { userInfo } from 'os';

export default {
  components: {
    ShoppingNavbar,
    Footer
  },
  computed: {
    ...mapState({
      registerDate: state => state.user.registerDate
    }),
    passwordConfirmationRule() {
      return () => (this.userInfo.newPassword === this.userInfo.reNewPassword) || 'Password must match'
    }
  },
  data() {
    return {
      show: false,
      show1: false,
      show2: false,
      skipBillingInfo: false,
      error: null,
      userInfo: {},
      userId: this.$store.state.user.userid,
      rules: {
        required: value => !!value || 'Required.',
        min: vvv => ( vvv && vvv.length >= 8 ) || 'Min 8 characters'
      },
      emailRules: [
        v => !!v || 'Email is required',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Email must be valid'
      ],
    }
  },
  methods: {
    async updateCredentialInfo() {
      this.error = null
      if (!this.$refs.form.validate()) {
        return
      }
      if (!this.$store.state.user || !this.$store.state.user.id) {
        alert('User session lost, please login again.')
        return
      }
      let credentials = {}
      credentials.id = this.$store.state.user.id
      credentials.p1 = this.userInfo.curPassword
      credentials.p2 = this.userInfo.newPassword
      credentials.p3 = this.userInfo.reNewPassword
      try {
        await UsersService.passwordReset(credentials).then(response => {
          this.userInfo.curPassword = null
          this.userInfo.newPassword = null
          this.userInfo.reNewPassword = null
          this.error = 'User Credentials updated successfully.'
          alert('User Credentials updated successfully.')
          console.log(response)
        })

      } catch (error) {
        alert(error.response.data.error)
        this.error = error.response.data.error
      }
    }
  },
  async mounted() {
  }
}
</script>

<style scoped></style>
