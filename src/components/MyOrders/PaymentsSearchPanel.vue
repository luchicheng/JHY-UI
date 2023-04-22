<template>
  <panel title="Search Order">
    <v-row no-gutters>
      <v-col cols="12" sm="12" class="px-8" id="my order">
        <v-row no-gutters>
          <v-col cols=12 sm="4">
            <v-text-field label="Search by Delivery Instruction, Pickup Instruction" v-model="search"></v-text-field>
          </v-col>
          <v-col cols=12 sm="4">
            <v-checkbox v-model="last30days" label="Last 30 Days' Order"></v-checkbox>
          </v-col>

          <v-col cols=12 sm="4">
            <v-autocomplete ref="UserId" v-if="$store.state.user && $store.state.user.userType == 'A'" v-model="userId"
              :items="validUsers" placeholder="Select..." item-value="id" item-text="userid"
              label="Query Order for for User" clearable></v-autocomplete>
          </v-col>

        </v-row>
        <v-row no-gutters v-if="!last30days === true">
          <v-col cols=12 sm="4">
            <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y
              min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="orderTsFrom" label="From Date of Order" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="orderTsFrom" max="2030-01-01" min="2023-01-01" @change="save_date1"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols=1 sm="1">
          </v-col>
          <v-col cols=12 sm="4">
            <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y
              min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="orderTsTo" label="To Date of Order" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="orderTsTo" max="2030-01-01" min="2023-01-01" @change="save_date2"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-col>
    </v-row>


  </panel>
</template>

<script>
import _ from 'lodash'
import UsersService from '@/services/UsersService'

export default {
  data() {
    return {
      validUsers: [],
      userId: this.$store.state.user.id,
      search: '',
      last30days: true,
      menu1: false,
      menu2: false,
      orderTsFrom: new Date().toISOString().slice(0, 10),
      orderTsTo: new Date().toISOString().slice(0, 10)
    }
  },
  watch: {
    search: _.debounce(function () { this.submit_query(); }, 700),
    userId: _.debounce(function () { this.submit_query(); }, 700),
    last30days: _.debounce(function () { this.submit_query(); }, 700),
    orderTsFrom: _.debounce(function () { this.submit_query(); }, 700),
    orderTsTo: _.debounce(function () { this.submit_query(); }, 700),
    '$route.query': {
      immediate: true,
      handler(value) {
        this.search = value.search
        this.userId = value.userId
        this.orderTsFrom = value.orderTsFrom
        this.orderTsTo = value.orderTsTo
        this.last30days = value.last30days

      }
    }
  },
  async mounted() {
    try {
      console.log('xxxxxxxxxxxxxx:')
      if (this.$store.state.user && this.$store.state.user.userType === 'A') {
        this.validUsers = (await UsersService.index()).data
        console.log('aaaaa:' + JSON.stringify(this.validUsers))
      }
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    save_date1(date) {
      this.$refs.menu1.save(date)
    },
    save_date2(date) {
      this.$refs.menu2.save(date)
    },
    async submit_query() {
      const route = {
        name: 'MyOrders',
        query: {
          search: this.search,
          userId: this.userId,
          last30days: this.last30days,
          orderTsFrom: this.orderTsFrom,
          orderTsTo: this.orderTsTo
        }
      }
      this.$router.push(route)
    }
  }
}
</script>

<style></style>
