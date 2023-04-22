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
                <v-btn icon="fas fa-map-marker-alt" color="" class="mt-10" variant="outlined"></v-btn><br />
                <span class="text-caption">55 West Beaver Creek Rd, Richmond Hill, ON L4B 1K5</span><br />
                <v-btn icon="fas fa-phone-alt" color="" class="mt-10" variant="outlined"></v-btn><br />
                <span class="text-caption"></span> <br />
                <span class="text-caption">905-597-1666</span> <br />
                <v-btn icon="fas fa-envelope" color="" class="mt-10" variant="outlined"></v-btn><br />
                <span class="text-caption">info@jhykitchen.com</span> <br />
                <span class="text-caption"></span> <br />
              </div>
            </v-col>
            <v-col cols="12" sm="8">
              <h1 class="mt-8">Send your message</h1>
              <v-divider></v-divider>
              <span class="text-caption">Please leave a message and we will get back to you as soon as possible.</span>
              <v-row class="mt-10">
                <v-col cols="12" sm="6">
                  <v-text-field label="Name" :rules="[v => !!v || 'Name is required']"
                     persistent-hint outlined color="#444C5C" v-model="msgInfo.name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="Phone No" :rules="[v => !!v || 'Phone number is required']"
                     persistent-hint outlined color="#444C5C" v-model="msgInfo.phone"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field label="Email" :rules="emailRules"
                    persistent-hint outlined color="#444C5C" v-model="msgInfo.email"></v-text-field>
                </v-col>
              </v-row>
              <v-textarea label="Message" :rules="[v => (v && v.length <= 200) || 'Message is required and 200 characters or less']"
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

export default {
  name: 'ContactUs',
  data: () => ({
      valid: false,
      msgInfo: {},
      emailRules: [
        v => !!v || 'Email is required',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Email must be valid'
      ]
  }),
  methods: {
    async submitMsg() {
      this.valid = this.$refs.form.validate()
      if(!this.valid){
        return
      }
      try {
        const response = await MessageService.post(this.msgInfo
        //   {
        //   name: 'DataTypes.STRING',
        //   phone: 'DataTypes.STRING',
        //   email: 'DataTypes.STRING',

        //   message: 'DataTypes.STRING',
        //   status: 'DataTypes.STRING',
        //   response: 'DataTypes.STRING',
        //   comment: 'DataTypes.STRING'
        // }
        )
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

  },
}
</script>