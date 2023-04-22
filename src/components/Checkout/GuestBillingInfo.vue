<template>
  <panel :title="title">
    <v-form ref="form" v-model="valid">
      <v-text-field label="Email" outlined v-model="userInfo.email" dense
        :rules="[v => !!v || 'Email is required']"></v-text-field>
      <v-text-field label="First Name" v-model="userInfo.fname" outlined dense
        :rules="[v => !!v || 'First Name is required']"></v-text-field>
      <v-text-field label="Last Name" v-model="userInfo.lname" outlined dense
        :rules="[v => !!v || 'Last Name is required']"></v-text-field>
      <v-text-field label="Address" v-model="userInfo.address" outlined dense
        :rules="[v => !!v || 'Address is required']"></v-text-field>
      <v-text-field label="Apt#" v-model="userInfo.address2" outlined dense></v-text-field>
      <v-text-field label="City" v-model="userInfo.city" outlined dense
        :rules="[v => !!v || 'City is required']"></v-text-field>
      <v-text-field label="Province" v-model="userInfo.province" outlined dense
        :rules="[v => !!v || 'Province is required']"></v-text-field>
      <v-text-field label="Post Code" v-model="userInfo.postcode" outlined dense
        :rules="[v => !!v || 'Post Code is required']"></v-text-field>
      <v-text-field label="Phone" v-model="userInfo.phone" outlined dense
        :rules="[v => !!v || 'Contact Phone # is required']"></v-text-field>
      <br>
      <v-row>
        <v-col cols="12" sm="12" md="12" class="d-flex justify-center align-center">
          <v-btn dark class="primary" @click="goToShipment">
            Go to Shipments page
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </panel>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: [
    'userInfo'
  ],
  data() {
    return {
      valid: false
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'route'
    ]),
    title: function () {
      if (this.$store.state.isUserLoggedIn) {
        return 'Review User and Billing information'
      }else{
        return 'Fill in User and Billing information'
      }
    }
  },
  watch: {
  },
  methods: {

    async goToShipment() {
      this.valid = this.$refs.form.validate()
      if (this.valid) {
        console.log('emiting to shippmeng page:' + JSON.stringify(this.userInfo))
        this.$emit('goToShipment', this.userInfo)
      } else {
        alert('validation falied')
      }
    }
  },
  async mounted() {
  }
}
</script>

<style scoped>
.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
