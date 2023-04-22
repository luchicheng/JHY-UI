<template>
  <v-container fluid>
    <v-card tile class="mx-16 my-10 card1" color="white">
      <v-row>
                <v-col cols="12" sm="4" class="mt-n6 pr-0">
                  <v-breadcrumbs :items="items" class="justify-center mt-n7" dark>
                    <template v-slot:divider>
                      <v-icon color="#7C92FE">mdi-chevron-right</v-icon>
                    </template>
                  </v-breadcrumbs>
                </v-col>
              </v-row>
      <ShoppingAds></ShoppingAds>
      
      <v-row>
        <v-col cols="12" sm="3" class="mt-n6 pr-0">
          <v-toolbar flat outlined>
            <v-toolbar-title><strong>Filter</strong></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-divider vertical></v-divider>
            <v-btn icon class="ml-1">
              <v-icon color="#3853D8"> mdi-sync </v-icon>
            </v-btn>
          </v-toolbar>
        </v-col>
        <v-col cols="12" sm="3" class="mt-n6 px-0">
          <v-toolbar flat outlined>
            <v-toolbar-title>
              SPORT BY: <span>Price $-$$</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon class="mr-4">
              <v-icon color="black">mdi-menu-down</v-icon>
            </v-btn>
          </v-toolbar>
        </v-col>
        <v-col cols="12" sm="3" class="mt-n6 px-0">
          <v-toolbar flat outlined class="">
            SHOW: <v-autocomplete ref="pageSize" v-model="pageSize" :items="pageSizes"
              @change="initPage"></v-autocomplete>
          </v-toolbar>
        </v-col>
        <v-col cols="12" sm="3" class="mt-n6 pl-0">
          <v-toolbar flat outlined>
            <v-btn icon class="mr-1">
              <v-icon color="#3853D8">mdi-apps</v-icon>
            </v-btn>
            <v-divider vertical></v-divider>
            <v-btn icon class="mx-1">
              <v-icon color="grey">mdi-format-list-bulleted</v-icon>
            </v-btn>
            <v-divider vertical></v-divider>
            <v-toolbar-title class="ml-2">
              <strong>COMPARE :</strong>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-badge color="#3853D8" content="3" class="mr-2"></v-badge>
          </v-toolbar>
        </v-col>
        <v-col cols="3" class="py-0 pr-0 mt-n3">
          <v-card flat outlined tile>
            <v-toolbar flat>
              <v-icon color="black" class="mr-2">mdi-chevron-down</v-icon>
              <strong>CATEGORIES</strong>
              <v-spacer></v-spacer>
              <v-icon color="grey" small @click="toggleCategory()">mdi-swap-vertical</v-icon>
            </v-toolbar>
            <v-list dense v-show="displayCategory" class="mt-n5">
              <v-list-item v-for="pt in categories" :key="pt.type">
                <v-list-item-content>
                  <v-list-item-title v-text="pt.type" class="ml-8"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-subtitle v-text="pt.count"></v-list-item-subtitle>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
          <v-card flat outlined tile>
            <v-toolbar flat>
              <v-icon color="black" class="mr-2">msi-chevron-down</v-icon>
              <strong>PRICE</strong>
              <v-spacer></v-spacer>
              <v-icon color="grey" small @click="togglePriceQuery()">mdi-swap-vertical</v-icon>
            </v-toolbar>
          </v-card>
          <v-card flat outlined tile>
            <v-toolbar flat>
              <v-icon color="black" class="mr-2">mdi-chevron-down</v-icon>
              <strong>FILTER BY TYPE</strong>
              <v-spacer></v-spacer>
              <v-icon color="grey" small @click="toggleCateQuery()">mdi-swap-vertical</v-icon>
            </v-toolbar>
            <v-list dense v-show="displayCateQuery" class="mt-n5">
              <v-list-item v-for="ptf in productTypeFilter" :key="ptf.type">
                <v-list-item-content>
                  <v-list-item-title v-text="ptf.type" class="ml-6"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-checkbox color="primary" v-model="ptf.selected" @change="refreshProductListByFilter"></v-checkbox>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
          <v-card flat outlined>
            <v-toolbar flat>
              <v-icon color="black" class="mr-2">mdi-chevron-down</v-icon>
              <strong>SIZE</strong>
              <v-spacer></v-spacer>
              <v-icon color="grey" small @click="toggleSizeQuery()">mdi-swap-vertical</v-icon>
            </v-toolbar>
          </v-card>
        </v-col>
        <v-col cols="9" class="mt-n3">
          <v-row>
            <v-col cols="12" sm="4" v-for="(p, i) in historyList" :key="i" :class="p.class">
              <ProductPanel :product="p" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="3" class="mt-n3 pr-0 pb-0">
          <v-toolbar flat outlined> </v-toolbar>
        </v-col>
        <v-col cols="12" sm="3" class="mt-n3 px-0 pb-0">
          <v-toolbar flat outlined>
            <v-btn icon class="mr-1">
              <v-icon color="grey">mdi-chevron-up</v-icon>
            </v-btn>
            <v-divider vertical></v-divider>
          </v-toolbar>
        </v-col>
        <v-col cols="12" sm="3" class="mt-n3 px-0 pb-0">
          <v-toolbar flat outlined class="text-center">
            <v-pagination class="pagination mb-2" v-model="page" :length="pages" @input="updatePage"></v-pagination>
          </v-toolbar>
        </v-col>
        <v-col cols="12" sm="3" class="mt-n3 pl-0 pb-0">
          <v-toolbar flat outlined>
            <v-btn icon class="mr-1">
              <v-icon color="grey">mdi-chevron-down</v-icon>
            </v-btn>
            <v-divider vertical></v-divider>
          </v-toolbar>
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
</template>

<script>
import ProductPanel from './ProductPanel'
import ShoppingAds from './ShoppingAds'
import ProductsService from '@/services/ProductsService'
import { mapState } from 'vuex'
export default {
  data: () => ({
    page: 1,
    pageSize: 9,
    pageSizes: [3, 6, 9],
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
    products: [],
    productTypeFilter: [],
    pageOfItems: [],
    listCount: 0,
    historyList: [],
    displayPriceQuery: true,
    displayCategory: true,
    displayCateQuery: true,
    displaySizeQuery: true,
    productType: ''
  }),
  async mounted() {
    this.productType = this.$route.params.category
    // console.log('product type in Dashboard vue:', this.productType)
    // console.log('categories in Dashboard vue:', JSON.stringify(this.categories) )
    //this.productTypeList = (await ProductsService.getProductTypeList()).data;
    this.initProductTypeFilter(this.productType);
    if (this.productType) {
      let t = {}
      t.text = this.productType
      t.disabled = false
      this.items.push(t)
      this.refreshProductListByFilter();
    } else {
      this.products = (await ProductsService.index()).data;
    }
    let _this = this;
    _this.initPage();
    _this.updatePage(_this.page);
  },
  methods: {

    initProductTypeFilter( productType) {
      this.productTypeFilter = [];
      this.categories.forEach(i => {
        let r = {}
        r.type = i.type;
        if (productType) {
          if (productType === i.type) {
            r.selected = true;
          } else {
            r.selected = false;
          }
        } else {
          r.selected = true;
        }
        this.productTypeFilter.push(Object.assign({}, r))
      })
      console.log('returned productTypeFilter:' + JSON.stringify(this.productTypeFilter))
    },
    async refreshProductListByFilter() {
      //query by productTypeFilter
      this.products = (await ProductsService.getProductListByFilter(this.productTypeFilter)).data;
      this.initPage();
    },
    togglePriceQuery() {
      this.displayPriceQuery = !this.displayPriceQuery;
    },
    toggleCategory() {
      this.displayCategory = !this.displayCategory;
    },
    toggleCateQuery() {
      this.displayCateQuery = !this.displayCateQuery;
    },
    toggleSizeQuery() {
      this.displaySizeQuery = !this.displaySizeQuery;
    },
    initPage: function () {
      let _this = this;
      _this.listCount = _this.products.length;
      if (_this.listCount < _this.pageSize) {
        _this.historyList = _this.products;
      } else {
        _this.historyList = _this.products.slice(0, _this.pageSize);
      }
    },
    updatePage: function (pageIndex) {
      let _this = this;
      let _start = (pageIndex - 1) * _this.pageSize;
      let _end = pageIndex * _this.pageSize;
      _this.historyList = _this.products.slice(_start, _end);
      _this.page = pageIndex;
    }
  },
  components: {
    ProductPanel,
    ShoppingAds
  },
  created() {
  },
  computed: {
    ...mapState([
      'route','categories'
    ]),
    pages() {
      let _this = this;
      if (_this.pageSize == null || _this.listCount == null) return 0;
      return Math.ceil(_this.listCount / _this.pageSize);
    }
  }
};
</script>

<style>
.container {
  padding: 0px !important;
}

.v-btn.withoutupercase {
  text-decoration: none;
}

.v-chip.v-size--default {
  border-radius: 50px !important;
  font-size: 14px !important;
  height: 40px !important;
  width: 40px !important;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}

.card1 {
  z-index: 10;
}

.card2 {
  z-index: 1;
}
</style>