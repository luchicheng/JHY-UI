<template>
  <v-app id="inspire" :style="{ background: $vuetify.theme.themes.dark.background }">
    <ShoppingNavbar class="aaaaa" />
    <v-container fluid>
      <v-card tile class="mx-16 my-10" color="white" outlined elevation="11">
        <v-row>
          <v-col cols="12" sm="4" class="mt-n6 pr-0">
            <v-breadcrumbs :items="items" class="justify-center mt-n7" dark>
              <template v-slot:divider>
                <v-icon color="#7C92FE">mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="8">
            <v-card color="#f1f1f1" class="d-flex align-center rounded-lg mx-2 mb-2" dark height="500" flat>

              <v-row>
                <v-col cols="12" sm="4">
                  <h4 class="black--text">Big Image</h4>
                  <br />
                  <h6 class="black--text mt-n4">Big ImageBig ImageBig ImageBig Image</h6>
                </v-col>
                <v-col cols="12" sm="8">
                  <div align="center">
                    <v-img :src="this.productDetail.imgUrl && require('@/assets/products/' + this.productDetail.imgUrl)"
                      width="200"></v-img>
                  </div>
                </v-col>
              </v-row>
            </v-card>
            <v-card color="#f1f1f1" class="d-flex align-center rounded-lg mx-2 my-2" dark height="100" flat>
              <v-row>
                <v-col cols="12" sm="4">
                  <h4 class="black--text">Product detail</h4>
                  <br />
                  <h6 class="black--text mt-n4">Product detail Product detail Product detail</h6>
                </v-col>
                <v-col cols="12" sm="8">
                  <div align="center">

                  </div>
                </v-col>
              </v-row>
            </v-card>
            <v-card class="align-center rounded-lg mx-2 mb-2" flat>
              <v-card-title>
                <h3>Product Measurements</h3>
              </v-card-title>
              <v-card-text>
                <h4>Width: {{ this.model_size.width }} &#8243;</h4>
                <h4>Height: {{ this.model_size.height }} &#8243;</h4>
                <h4>Deepth: {{ this.model_size.deep }} &#8243;</h4>
              </v-card-text>
            </v-card>
            <v-card color="#f1f1f1" class="d-flex align-center rounded-lg mx-2 my-2" height="100" flat>
              <Comment />
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card class="align-center rounded-lg mx-2 mb-2" flat>
              <v-card-title>
                <h3>{{ productDetail.type }} -- {{ productDetail.name }}</h3>
              </v-card-title>
              <v-card-text>
                <h4 v-for="desc in this.productDesc" :key="desc.aaaaaa">
                  {{ desc }}
                </h4>
                <h4>product #, SKU # </h4>
              </v-card-text>
            </v-card>
            <v-card class="align-center rounded-lg mx-2 mb-2" flat>
              <v-card-title class="align-bottom">
                <h1>${{ price }}/</h1>
                <p>each</p>
              </v-card-title>
              <v-card-text>
              </v-card-text>
            </v-card>
            <v-card class="align-center rounded-lg mx-2 mb-2" color="#f1f1f1" flat>
              <v-card-title>
                <h3>Choose your options</h3>
              </v-card-title>
              <v-card-actions>
                <v-col cols="4">
                  Front door style:
                </v-col>
                <v-col cols="8">
                  <v-btn-toggle v-model="selected_fd" mandatory>
                    <v-btn v-for="fd in frontdoors" :key="fd.code" :value="fd.code">
                      <v-hover v-slot="{ hover }">
                        <v-img :src="fd.img && require('@/assets/' + fd.img)" :max-height="hover ? 800 : 80"
                          :max-width="hover ? 300 : 30" cover>
                        </v-img>
                      </v-hover>
                    </v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-card-actions>
              <v-card-actions>
                <v-col cols="4">
                  Fixture Color:
                </v-col>
                <v-col cols="8">
                  <v-btn-toggle v-model="selected_color" mandatory>
                    <v-btn v-for="c in colors" :key="c.code" :value="c.code">
                      {{ c.name }}
                    </v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-card-actions>
              <v-card-actions>
                <v-col cols="4">
                  Choose models:
                </v-col>
                <v-col cols="8" class="flex-wrap: wrap;">
                  <v-btn-toggle v-model="selected_model" mandatory class="flex-wrap" @change="changeModel()">
                    <v-btn v-for="m in models" :key="m.id" :value="m.id">
                      {{ m.name }}
                    </v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-card-actions>
            </v-card>
            <v-card class="d-flex align-center rounded-lg mx-2 mt-2" height="100" flat>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-text-field dense type="number" step="any" min="1" outlined ref="input" :rules="[numberRule]"
                    v-model.number="qty"></v-text-field>
                </v-col>
                <v-col cols="12" sm="8">
                  <v-btn block dark color="#444C5C" @click="addToCart()">
                    <v-icon left>
                      mdi-cart
                    </v-icon>
                    Add to cart
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-card color="#EFF0F2" height="250px" tile flat dark class="d-flex align-center justify-center mt-n10 card2">
        <v-row>
          <v-col cols="12" sm="12">
            <h4 class="text-center black--text mt-10">
              SUBSCRIBE TO OUR NEWSLETTER
            </h4>
          </v-col>
          <v-col cols="12" sm="12">
            <h6 class="text-center grey--text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              dolorem dignissimos <br />
              Eos eligendi cupiditate cumque nemo sapiente quae omnis doloribus
              ducimus.
            </h6>
          </v-col>
          <v-col cols="12" sm="12">
            <v-card flat color="transparent" class="d-flex justify-center">
              <v-text-field placeholder="Enter Your Email" rounded class="shrink" background-color="grey" filled
                append-icon="mdi-email-outline" dense></v-text-field>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import ShoppingNavbar from '../shopping/ShoppingNavbar';
import Footer from '../shared/Footer'
import Comment from './Comment.vue';
import ProductsService from '@/services/ProductsService'
export default {
  data: () => ({
    qty: 1,
    selected_fd: null,
    selected_model: '',
    selected_model_obj: null,
    productId: null,
    productDetail: {},
    productModelList: [],
    productDesc: [],
    selected_color: null,
    model_size: {},
    items: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
      {
        text: "Catalog",
        disabled: false,
        href: "/shopping",
      }
    ],
    models: [],
    numberRule: val => {
      if (val < 1) return 'Please enter a positive number'
      return true
    }
  }),
  components: {
    Comment,
    ShoppingNavbar,
    Footer
  },
  computed: {
    ...mapState([
      'route'
    ]),
    price() { return (this.selected_model_obj && this.selected_model_obj.price) / 100 },
    frontdoors() {
      return this.$store.getters.frontdoors
    },
    colors() {
      return this.$store.getters.colors
    }
  },
  methods: {
    addToCart() {
      if (this.qty > 0) {
        const payload = { 'id': this.selected_model_obj.id, 'qty': this.qty, 'fd': this.selected_fd, 'color': this.selected_color }
        this.$store.dispatch('addToCart', payload)
      }
    },
    parseProdDesc() {
      let arr = []
      if (this.productDetail) {
        arr.push(this.productDetail.description ? this.productDetail.description : 'This product doesn\'t have any  description')
        if (this.productDetail.minPrice)
          arr.push('Price start from $' + this.productDetail.minPrice / 100)
        if (this.productDetail.deep) {
          arr.push('This product has fixed depth ' + this.productDetail.deep + ' ' + this.productDetail.measureUnit)
        }
        if (this.productDetail.height) {
          arr.push('This product has fixed height ' + this.productDetail.height + ' ' + this.productDetail.measureUnit)
        }
        if (this.productDetail.width) {
          arr.push('This product has fixed width ' + this.productDetail.width + ' ' + this.productDetail.measureUnit)
        }
        arr.push('Other size will be determined by model.')
      }
      this.productDesc = arr
    },
    getModelSize(productDetail, selected_model_obj) {
      let model_size = {}
      if (productDetail.deep) {
        model_size.deep = productDetail.deep
      } else {
        model_size.deep = selected_model_obj.deep
      }
      if (productDetail.height) {
        model_size.height = productDetail.height
      } else {
        model_size.height = selected_model_obj.height
      }
      if (this.productDetail.width) {
        model_size.width = productDetail.width
      } else {
        model_size.width = selected_model_obj.width
      }
      return model_size
    },
    changeModel() {
      if (this.productDetail) {
        this.selected_model_obj = this.models.find(m => m.id === this.selected_model);
        this.model_size = this.getModelSize(this.productDetail, this.selected_model_obj)
      }
      // console.log('size in Product Index vue:', this.model_size)
    },
    getBreadcrumbsItems() {
      if (this.productDetail) {
        let o = {}
        o.text = this.productDetail.type
        o.disabled = false
        o.href = '/category/' + this.productDetail.type + '/filter'
        this.items.push(o)
        let t = {}
        t.text = this.productDetail.name
        t.disabled = false
        this.items.push(t)
      }
    }
  },
  async mounted() {
    this.productId = this.$route.params.productId
    console.log('product id in Product Index vue:', this.productId)
    this.productDetail = (await ProductsService.getProductDetail(this.productId)).data;
    // console.log(this.productDetail)
    if (this.productDetail) {
      this.models = this.productDetail.modelList;
      this.selected_model = this.models[0].id;
      this.selected_model_obj = this.models[0]
      this.model_size = this.getModelSize(this.productDetail, this.selected_model_obj)
      this.getBreadcrumbsItems()
    }
    // console.log(this.models)
    this.parseProdDesc()
  },
}
</script>

<style>
.v-card.borderme {
  border: 3px solid #4d2c00 !important;
}

.v-card.borderout {
  border: 3px solid #f1f1f1 !important;
}

.index {
  z-index: 9999;
}
</style>