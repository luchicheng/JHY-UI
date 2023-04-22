<template>
    <v-hover v-slot:default="{ hover }">
        <v-card height="300" align="center" flat outlined tile>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black" small dark>{{ product.sold }}</v-btn>
            </v-card-actions>
            <v-img
            :src="require('@/assets/products/'+product.imgUrl)"
            width="200"
            height="200"
            contain
            ></v-img>
            <v-card-text class="mt-n4">
            <strong :class="hover ? 'blue--text' : 'black--text'">{{
                product.name
            }}</strong>
            </v-card-text>
            <v-expand-transition>
            <div
                v-if="hover"
                class="
                d-flex
                transition-fast-in-fast-out
                blue-grey
                v-card--reveal
                display-3
                white--text
                "
                style="height: 100%"
                @click="gotoProductDetail(product.id)"
            >
                <v-btn rounded color="white">
                <v-icon>mdi-cart-outlined</v-icon>
                View Details
                </v-btn>
                <v-btn fab small color="white" class="ml-2">
                <v-icon color="black">mdi-content-copy</v-icon>
                </v-btn>
                <v-btn fab small color="white" class="ml-2">
                <v-icon color="black">mdi-heart-outline</v-icon>
                </v-btn>
            </div>
            </v-expand-transition>
        </v-card>
    </v-hover>
</template>
<script>
export default {
  props: [
    'product'
  ],
  methods: {
    gotoProductDetail (id) {
      console.log('gotoProductDetail page:', id)
      this.$router.push({
        name: 'ProductDetail',
        params: {
          productId: id
        }
      })
    },
    getProdImgUrl (pic) {
      return 'products/' + pic
    }
  }
}
</script>
<style scoped>
</style>