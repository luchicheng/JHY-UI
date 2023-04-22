<template>
  <panel :title="title">
    <v-form ref="form" v-model="valid">
      <v-radio-group v-model="userInfo.deliveryPreference" row>
        <v-radio label="Pick up In-store - FREE" value="P">bbbbbbbbbbb</v-radio>
        <v-radio label="Standard Shipping - Fee to be determined." value="S">aaaaaaaaaaaaa</v-radio>
      </v-radio-group>
      <div v-if="userInfo.deliveryPreference === 'S'">
        <panel title="Standard Shippment information">
          <v-checkbox v-model="userInfo.deliveryInfoOption" label="Same as Billing information"></v-checkbox>
          <div v-if="!userInfo.deliveryInfoOption === true">
            <v-text-field label="First Name" v-model="userInfo.deliveryFname" outlined dense
              :rules="[v => !!v || 'First Name is required']"></v-text-field>
            <v-text-field label="Last Name" v-model="userInfo.deliveryLname" outlined dense
              :rules="[v => !!v || 'Last Name is required']"></v-text-field>
            <v-text-field label="Address" v-model="userInfo.deliveryAddress" :rules="[v => !!v || 'Address is required']"
              outlined dense></v-text-field>
            <v-text-field label="Unit# Apt#" v-model="userInfo.deliveryAddress2" outlined dense></v-text-field>
            <v-text-field label="City" v-model="userInfo.deliveryCity" :rules="[v => !!v || 'City is required']" outlined
              dense></v-text-field>
            <v-text-field label="Province" v-model="userInfo.deliveryProvince"
              :rules="[v => !!v || 'Province is required']" outlined dense></v-text-field>
            <v-text-field label="Post code" v-model="userInfo.deliveryPostcode"
              :rules="[v => !!v || 'Post Code is required']" outlined dense></v-text-field>
            <v-text-field label="Contact Phone#" v-model="userInfo.deliveryPhone"
              :rules="[v => !!v || 'Contact Phone # is required']" outlined dense></v-text-field>
          </div>
          <v-menu ref="menu1" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y
            min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="deliveryInfo.deliDate" required :rules="[v => !!v || 'Delivery Date is required']"
                label="Delivery Date" outlined dense readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker ref="picker" v-model="deliveryInfo.deliDate" max="2030-01-01" min="2023-01-01"
              @change="save_date1"></v-date-picker>
          </v-menu>
          <v-textarea label="Special Instructions" v-model="deliveryInfo.deliInstruction" outlined dense></v-textarea>
        </panel>
      </div>
      <div v-if="userInfo.deliveryPreference === 'P'">
        <panel title="Pick up In-store information">
          <v-menu ref="menu2" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y
            min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="deliveryInfo.pickupDate" required :rules="[v => !!v || 'Pickup Date is required']"
                label="Pickup Date" outlined dense readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker ref="picker" v-model="deliveryInfo.pickupDate" max="2030-01-01" min="2023-01-01"
              @change="save_date2"></v-date-picker>
          </v-menu>
          <v-textarea label="Special Instructions" v-model="deliveryInfo.pickInstruction" outlined dense></v-textarea>
        </panel>
      </div>

      <br>
      <v-row>
        <v-col cols="12" sm="12" md="12" class="d-flex justify-center align-center">
          <v-btn dark class="primary" @click="goToOrderReview">
            Go to Order Review page
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
      menu: false,
      valid: false,
      deliveryInfo: {
        deliDate: new Date().toISOString().slice(0, 10),
        pickupDate: new Date().toISOString().slice(0, 10)
      }
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'route'
    ]),
    title: function () {
      if (this.$store.state.isUserLoggedIn) {
        return 'Review Delivery information'
      }else{
        return 'Fill in Delivery information'
      }
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    save_date1(date) {
      this.$refs.menu1.save(date)
    },
    save_date2(date) {
      this.$refs.menu2.save(date)
    },
    async goToOrderReview() {

      this.$refs.form.validate()
      if (this.valid) {
        console.log('emiting to OrderReview page:' + JSON.stringify(this.deliveryInfo))
        console.log('emiting to OrderReview page:' + JSON.stringify(this.userInfo))
        this.$emit('goToOrderReview', this.userInfo, this.deliveryInfo)
      } else {
        alert('validation falied')
      }
    }
  },
  async mounted() {
    console.log('mounted:' + JSON.stringify(this.userInfo))
  }
}
</script>

<style scoped>
.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
