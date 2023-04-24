<template>
  <v-app>
    <HomeNavbar />
    <div class="about">
      <v-container fluid>
        <v-col cols="12" id="page">
          <div class="pre">
            <v-row>
              <v-col cols="12" md="6" v-for="article in articles" :key="article.title">
                  <v-card class="my-6 mx-16" hover data-aos="zoom-in" data-aos-easing="ease" max-width="900">
                    <v-img height="350px" :src="getImgUrl(article.urlToImage)"></v-img>
                    <v-container fill-height fluid>
                      <v-layout>
                        <v-flex xs12 align-end d-flex class="mx-4 my-4">
                          <span class="headline">{{ article.title }}</span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <v-card-text>
                      {{ article.description }}
                    </v-card-text>
                    <v-card-actions>
                      <v-chip small color="secondary" class="white--text">
                        {{ article.sourceName }}
                      </v-chip>
                      <v-spacer></v-spacer>
                      <v-spacer></v-spacer>

                      <v-btn small replace color="info" v-bind:href="article.url" target="_blank">Read More</v-btn>
                    </v-card-actions>
                  </v-card>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-container>
    </div>
    <Footer />
  </v-app>
</template>
<script>
import HomeNavbar from '../../components/shared/HomeNavbar'
import Footer from '../../components/shared/Footer'


export default {
  components: {
    HomeNavbar,
    Footer

  },
  methods: {
    getImgUrl(pic) {
      return pic && require('@/assets/' + pic)
    }
  },
  data() {
    return {
      articles: [
        {
          title: '5 Things to Consider Before Your Kitchen Renovation',
          urlToImage: 'gallery/Aaron_SW_4.jpg',
          description: 'Before starting your kitchen renovation, there are many things to consider in order for it to live up to your expectations. It’s where you might spend most of the time in the day when you get home from work. Between meal prep and preparing for your guests, it’s always a good idea to prepare for whoever is coming to your house.',
          sourceName: 'renoassistance.ca',
          url: 'https://www.jhkitchen.ca/blogs/4'
        },
        {
          title: 'The Benefits of Renovating Your Kitchen and Bathroom Simultaneously',
          urlToImage: 'gallery/Deepa_SW_33.jpg',
          description: 'Tackling more than one renovation project at the same time has some benefits. A simultaneous kitchen and bathroom overhaul could be the most effective use of time and money. It may help to cut back on the stress of back to back projects spread out over several months.',
          sourceName: 'renoassistance.ca',
          url: 'https://www.jhkitchen.ca/blogs/3'
        },
        {
          title: 'The ABCs of an Organized Pantry',
          urlToImage: 'gallery/Deepa_SW_73.jpg',
          description: 'What could be worse than cooking and not being able to find the ingredient you’re looking for? It’s not always simple to organize your kitchen efficiently, and even less so, your pantry. Organization is an art, so much so, that some people even dedicate a career to it! Luckily, there are some great tips you can follow, without needing to call in the help of a professional. We’ve gathered some inspiration to help you get the most out of your pantry organization!',
          sourceName: 'renoassistance.ca',
          url: 'https://www.jhkitchen.ca/blogs/2'
        },
        {
          title: '10 Kitchen Trends You\'ll Be Seeing Everywhere in 2021',
          urlToImage: 'gallery/Hui_SW_24.jpg',
          description: 'The idea of getting a brand-new kitchen is rather exciting. Especially if it’s been a while since it was last renovated. If you plan on renovating your kitchen soon, it would be best to know all about the most recent trends so you can figure out what is best for your space. The possibilities are endless! Our team, with the help of experts in the field, put together these 10 kitchen trends you’re likely to see in 2021.',
          sourceName: 'renoassistance.ca',
          url: 'https://www.jhkitchen.ca/blogs/1'
        }
      ]
    }
  },
  async mounted() {
  }
}
</script>

<style scoped></style>
