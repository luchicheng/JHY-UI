<template>
    <v-row>
            <v-col cols="12" sm="8" class="pr-0">
          <v-card height="250px" tile flat color="#9b836b">
            <v-row>
              <v-col cols="12" sm="4" class="pl-8 pt-5">
                <v-btn color="black" dark class="withoutupercase" small tile>
                  new
                </v-btn>
                <h6 class="white--text mt-8">Kitchen Final Design</h6>
                <h3 class="white--text mt-5">Transitional Kitchen</h3>
                <v-btn
                  rounded
                  color="#696366"
                  dark
                  class="withoutupercase px-8 mt-10"
                >
                  More Info
                </v-btn>
              </v-col>
              <v-col cols="12" sm="8">
                <v-img
                  :src="require('@/assets/demo/Picture1.jpg')"
                  max-height="400"
                  max-width="400"
                  contain
                  class="mt-n6"
                ></v-img>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="pl-0">
          <v-card height="250px" tile flat color="#9b836b">
            <v-row>
              <v-col cols="12" sm="4" class="pl-8 pt-5">
                <v-btn color="black" dark class="withoutupercase" small tile>
                  new
                </v-btn>
                <h6 class="white--text mt-8">Kitchen Final Design</h6>
                <h3 class="white--text mt-5">Modern Kitchen</h3>
                <v-btn
                  rounded
                  color="#696366"
                  dark
                  class="withoutupercase px-8 mt-10"
                >
                  More Info
                </v-btn>
              </v-col>
              <v-col cols="12" sm="8">
                <v-img
                :src="require('@/assets/demo/Picture26.jpg')"
                  max-height="400"
                  max-width="400"
                  contain
                  class="mt-n6"
                ></v-img>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
    </v-row>
</template>
    
