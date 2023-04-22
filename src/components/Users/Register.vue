<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <ShoppingNavbar class="index" />
    <v-container fluid>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            Membership Agreement and Benefits
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">
            Membership Waiver
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">
            Member Information
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <MembershipAgreement />
            <MembershipBenefit />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="e1 = 1">Back</v-btn>
              <v-btn color="blue darken-1" text @click="e1 = 2">I Agree and Continue</v-btn>
            </v-card-actions>
          </v-stepper-content>

          <v-stepper-content step="2">
            <MemberWaiver />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="e1 = 1">Back</v-btn>
              <v-btn color="blue darken-1" text @click="e1 = 3">I Agree and Continue</v-btn>
            </v-card-actions>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-form ref="form" autocomplete="off">
              <v-card>
                <v-card-title>
                  <span class="headline">Member basic information</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <panel title="User information">
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="User Name" outlined v-model="userInfo.userid" dense
                                :rules="[v => !!v || 'User ID is required']"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field outlined dense v-model="userInfo.password"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                                :type="show ? 'text' : 'password'" name="password" label="Enter Password"
                                hint="At least 8 characters" counter @click:append="show = !show"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field outlined dense v-model="userInfo.rePassword"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min, passwordConfirmationRule]"
                                :type="show1 ? 'text' : 'password'" name="input-10-1" label="Re-enter Password"
                                hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field label="Email" outlined v-model="userInfo.email" dense
                                :rules="[v => !!v || 'Email is required']"></v-text-field>
                            </v-col>                            
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Phone" v-model="userInfo.phone" outlined dense
                                  :rules="[v => !!v || 'Contact Phone # is required']"></v-text-field>
                              </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-checkbox v-model="skipBillingInfo" label="Skip Billing information"></v-checkbox>
                            </v-col>
                          </v-row>
                        </panel>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <div v-if="!skipBillingInfo === true">
                          <panel title="Billing information">
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field label="First Name" v-model="userInfo.fname" outlined dense
                                  :rules="[v => !!v || 'First Name is required']"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Last Name" v-model="userInfo.lname" outlined dense
                                  :rules="[v => !!v || 'Last Name is required']"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Address" v-model="userInfo.address" outlined dense
                                  :rules="[v => !!v || 'Address is required']"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Apt#" v-model="userInfo.address2" outlined dense></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field label="City" v-model="userInfo.city" outlined dense
                                  :rules="[v => !!v || 'City is required']"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Province" v-model="userInfo.province" outlined dense
                                  :rules="[v => !!v || 'Province is required']"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Post Code" v-model="userInfo.postcode" outlined dense
                                  :rules="[v => !!v || 'Post Code is required']"></v-text-field>
                              </v-col>
                            </v-row>

                          </panel>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <div class="danger-alert" v-html="error" />
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="register">Register</v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import MembershipAgreement from './MembershipAgreement'
import MembershipBenefit from './MembershipBenefit'
import MemberWaiver from './MemberWaiver'
import ShoppingNavbar from '../shopping/ShoppingNavbar';
import Footer from '../shared/Footer'

export default {
  components: {
    MembershipAgreement,
    MembershipBenefit,
    MemberWaiver,
    ShoppingNavbar,
    Footer
  },
  data() {
    return {
      skipBillingInfo: true,
      skipDeliveryInfo: true,
      e1: 1,
      show: false,
      show1: false,
      userInfo: {
        userid: '',
        rePassword: '',
        password: '',
        email: '',
        address: ''
      },
      error: null,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      }
    }
  },
  methods: {
    async register() {
      this.error = null
      if (!this.$refs.form.validate()) {
        return
      }
      try {
        console.log ('AuthenticationService.register:' + JSON.stringify(this.userInfo))
        
        const response = await AuthenticationService.register({
          userInfo: this.userInfo
        })
        if (response.data.user) {
          alert('User [' + response.data.user.userid + '] has been registered succussfully. You are login now, Thank you.')
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
        }
        
        this.$router.push({
          name: 'ShoppingHome'
        })
      } catch (error) {
        alert(error.response.data.error)
        this.error = error.response.data.error
      }
    },
    close() {
      this.$router.push({
        name: 'home'
      })
    },
    save_date(date) {
      this.$refs.date_menu.save(date)
    }
  },
  watch: {
    date_menu(val) {
      val && setTimeout(() => (this.$refs.date_picker.activePicker = 'YEAR'))
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () => (this.userInfo.password === this.userInfo.rePassword) || 'Password must match'
    }
  }
}
</script>

<style scoped></style>
