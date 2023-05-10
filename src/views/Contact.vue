<template>
  <v-app>
    <HomeNavbar />
    <div class="about">
      <v-form ref="form" v-model="valid">
        <v-container fluid>
          <v-col cols="12" sm="12" class="px-16" id="contact">
            <v-row>
              <v-col cols="12" sm="4">
                <div class="child">
                  <h1>Contact info.</h1>
                  <v-btn class="mt-10" variant="outlined">
                    <v-icon left>fas fa-map-marker-alt</v-icon>
                  </v-btn><br />
                  <span class="text-caption">144 Bullock Drive, Markham ON L3P 1W2</span><br />
                  <v-btn class="mt-10" variant="outlined">
                    <v-icon left>fas fa-phone-alt</v-icon>
                  </v-btn><br />
                  <span class="text-caption">905-209-3588</span> <br />
                  <span class="text-caption">905-209-3288</span> <br />
                  <v-btn class="mt-10" variant="outlined">
                    <v-icon left>fas fa-envelope</v-icon>
                  </v-btn><br />
                  <span class="text-caption">info@jhykitchen.ca</span> <br />
                  <span class="text-caption"></span> <br />
                </div>
              </v-col>
              <v-col cols="12" sm="8">
                <h1 class="mt-8">Send your message</h1>
                <v-divider></v-divider>
                <span class="text-caption">Please leave a message and we will get back to you as soon as possible.</span>
                <v-row class="mt-10">
                  <v-col cols="12" sm="6">
                    <v-text-field label="Name" :rules="[v => !!v || 'Name is required']" persistent-hint outlined
                      color="#444C5C" v-model="msgInfo.name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field label="Phone No" :rules="[v => !!v || 'Phone number is required']" persistent-hint
                      outlined color="#444C5C" v-model="msgInfo.phone"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-text-field label="Email" :rules="emailRules" persistent-hint outlined color="#444C5C"
                      v-model="msgInfo.email"></v-text-field>
                  </v-col>

                </v-row>
                <v-textarea label="Message"
                  :rules="[v => (v && v.length <= 200) || 'Message is required and 200 characters or less']"
                  persistent-hint outlined color="#444C5C" v-model="msgInfo.message"></v-textarea>
                
                <div class="danger-alert" v-html="error" />
                <br>
                <v-btn color="#FBDF7E" class="mt-2" @click="submitMsg">Submit Now</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-container>
      </v-form>

    </div>
    <Footer />
  </v-app>
</template>
<script>
import MessageService from '@/services/MessageService'
import HomeNavbar from '../components/shared/HomeNavbar'
import Footer from '../components/shared/Footer'
// import { VueReCaptcha } from 'vue-recaptcha-v3'

export default {
  name: 'ContactUs',
  data: () => ({
    // token: null,
    valid: false,
    checkCaptch: false,
    msgInfo: {},
    emailRules: [
      v => !!v || 'Email is required',
      v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Email must be valid'
    ],
    error: ''
  }),
  methods: {
    async submitMsg() {
      this.valid = this.$refs.form.validate()
      if (!this.valid) {
        return
      }

      try {
        const response = await MessageService.post(this.msgInfo)
        if (response) {
          alert('you message has been submited successfuly!')
          this.msgInfo = {}
          this.$refs.form.resetValidation()
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    HomeNavbar,
    Footer
    // VueReCaptcha
  },
}
</script>