<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <ShoppingNavbar class="index" />
    <v-container fluid>
      <v-row no-gutters>
        <v-spacer />
        <v-col sm="6" cols="12">
          <v-card>
            <v-card-title>
              <span class="headline">My information</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="form" autocomplete="off">
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <panel title="User basic information">
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field label="User Name" v-model="userInfo.userid" dense disabled></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Email" outlined v-model="userInfo.email" dense
                              :rules="emailRules"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Phone" v-model="userInfo.phone" outlined dense
                              :rules="[v => !!v || 'Contact Phone # is required']"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-checkbox v-model="skipBillingInfo" label="Skip Billing information"></v-checkbox>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-checkbox v-model="skipDeliveryPreference" label="Skip Shipping Preference"></v-checkbox>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col cols="12" sm="12" md="12">
                            <v-text-field label="Register Date" disabled :value="registerDate"></v-text-field>
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
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <div v-if="!skipDeliveryPreference === true">
                        <panel title="Delivery Preference">
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-radio-group v-model="userInfo.deliveryPreference" row>
                                <v-radio label="Pick up In-store - FREE" value="P">ss</v-radio>
                                <v-radio label="Standard Shipping - Fee to be determined." value="S">ss</v-radio>
                              </v-radio-group>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <div v-if="userInfo.deliveryPreference === 'S'">
                                <panel title="Standard Shippment information">
                                  <v-checkbox v-model="userInfo.deliveryInfoOption"
                                    label="Same as Billing information"></v-checkbox>
                                  <div v-if="!userInfo.deliveryInfoOption === true">
                                    <v-text-field label="First Name" v-model="userInfo.deliveryFname" outlined dense
                                      :rules="[v => !!v || 'First Name is required']"></v-text-field>
                                    <v-text-field label="Last Name" v-model="userInfo.deliveryLname" outlined dense
                                      :rules="[v => !!v || 'Last Name is required']"></v-text-field>
                                    <v-text-field label="Address" v-model="userInfo.deliveryAddress"
                                      :rules="[v => !!v || 'Address is required']" outlined dense></v-text-field>
                                    <v-text-field label="Unit# Apt#" v-model="userInfo.deliveryAddress2" outlined
                                      dense></v-text-field>
                                    <v-text-field label="City" v-model="userInfo.deliveryCity"
                                      :rules="[v => !!v || 'City is required']" outlined dense></v-text-field>
                                    <v-text-field label="Province" v-model="userInfo.deliveryProvince"
                                      :rules="[v => !!v || 'Province is required']" outlined dense></v-text-field>
                                    <v-text-field label="Post code" v-model="userInfo.deliveryPostcode"
                                      :rules="[v => !!v || 'Post Code is required']" outlined dense></v-text-field>
                                    <v-text-field label="Contact Phone#" v-model="userInfo.deliveryPhone"
                                      :rules="[v => !!v || 'Contact Phone # is required']" outlined dense></v-text-field>
                                  </div>
                                </panel>
                              </div>
                            </v-col>
                          </v-row>

                        </panel>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12" class="d-flex justify-center align-center">
                      <v-btn dark class="primary" @click="updateUserInfo">
                        Update User information
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
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
    })
  },
  data() {
    return {
      skipBillingInfo: false,
      skipDeliveryPreference: false,
      error: null,
      userInfo: {},
      userId: this.$store.state.user.id,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      },
      emailRules: [
        v => !!v || 'Email is required',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Email must be valid'
      ],
    }
  },
  methods: {
    async updateUserInfo() {
      this.error = null
      if (!this.$refs.form.validate()) {
        return
      }
      if (!this.$store.state.user || !this.$store.state.user.id) {
        alert('User session lost, please login again.')
        return
      }
      try {
        this.userInfo.id = this.$store.state.user.id
        console.log('submitting:' + JSON.stringify(this.userInfo))
        const response = await UsersService.post(this.userInfo)
        this.error = 'User information updated successfully.'
        let currentUser = {}
        Object.assign(currentUser, this.$store.state.user)
        Object.assign(currentUser, response.data)
        this.$store.dispatch('setUser', currentUser)
        alert('User information updated successfully.')

      } catch (error) {
        alert(error.response.data.error)
        this.error = error.response.data.error
      }
    }
  },
  created() {

    console.log('created:' + JSON.stringify(this.userInfo))
  },
  async mounted() {
    this.userInfo = Object.assign({}, this.$store.state.user)
    console.log('mounted:' + JSON.stringify(this.userInfo))
  }
}
</script>

<style scoped></style>
