<template>
  <v-app>
    <HomeNavbar />
    <div class="service">
      <v-container fluid>

        <v-col cols="12" sm="12" id="services">
          <v-row class="fill-height">
            <v-col cols="12">
              <v-tabs v-model="tabs" dark color="white">
                <v-tab v-for="(s, i) in ourServices" :key="s.title" :href="'#tr-tabs-' + (i + 1)">
                  {{ s.title }} </v-tab>
              </v-tabs>
              <v-tabs-items v-model="tabs">
                <v-tab-item v-for="i in ourServices.length" :key="i" :value="'tr-tabs-' + i">
                  <v-card outlined height="100" v-if="i == 1" flat>
                    <h3>{{ ourServices[0].detail }}</h3>
                  </v-card>
                  <v-card outlined height="100" v-if="i == 2" flat>
                    <h3>{{ ourServices[1].detail }}</h3>
                  </v-card>
                  <v-card outlined height="100" v-if="i == 3" flat>
                    <h3>{{ ourServices[2].detail }}</h3>
                  </v-card>
                  <v-card outlined height="100" v-if="i == 4" flat>
                    <h3>{{ ourServices[3].detail }}</h3>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-col>
          </v-row>
          <div class="d-flex justify-center mb-6">
          </div>
        </v-col>
        <v-col cols="12" class="imgHover">
          <v-row class="fill-height" align="center" justify="center">
            <v-col cols="12" md="4">
              <v-hover v-slot="{ hover }">
                <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" @click="imageView(30)">
                  <v-img :src="getImgUrl('services/j1.jpg')" height="225px" cover> </v-img>
                </v-card>
              </v-hover>
            </v-col>
            <v-col cols="12" md="4">
              <v-hover v-slot="{ hover }">
                <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" @click="imageView(50)">
                  <v-img :src="getImgUrl('services/j2.jpg')" height="225px" cover> </v-img>
                </v-card>
              </v-hover>
            </v-col>
            <v-col cols="12" md="4">
              <v-hover v-slot="{ hover }">
                <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" @click="imageView(90)">
                  <v-img :src="getImgUrl('services/j3.jpg')" height="225px" cover> </v-img>
                </v-card>
              </v-hover>
            </v-col>
            <v-col cols="12" md="4">
              <v-hover v-slot="{ hover }">
                <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" @click="imageView(110)">
                  <v-img :src="getImgUrl('services/j4.jpg')" height="225px" cover> </v-img>
                </v-card>
              </v-hover>
            </v-col>
            <v-col cols="12" md="4">
              <v-hover v-slot="{ hover }">
                <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" @click="imageView(130)">
                  <v-img :src="getImgUrl('services/j5.jpg')" height="225px" cover> </v-img>
                </v-card>
              </v-hover>
            </v-col>
            <v-col cols="12" md="4">
              <v-hover v-slot="{ hover }">
                <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" @click="imageView(150)">
                  <v-img :src="getImgUrl('services/j6.jpg')" height="225px" cover> </v-img>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="12">
          <div class="d-flex justify-center mb-6">
            <v-btn color="#FBDF7E" class="mt-4" @click="imageView(0)">Load More</v-btn>
          </div>
        </v-col>

        <v-col cols="12" id="page">
          <div class="pre">
            <h1 class="mt-16">WHAT MAKES US STAND OUT? WHY JH-Y?</h1>
          </div>
        </v-col>
        <v-col cols="12" id="page">
          <div class="pre">
            <v-row>
              <v-col v-for="card in whyUsItems" cols="12" md="4" :key="card.title">
                <v-card class="mx-auto fill-height" min-height="450px">
                  <v-img :src="getImgUrl(card.src)" height="200px" contain></v-img>
                  <v-card-title>{{ card.title }}</v-card-title>
                  <v-card-subtitle></v-card-subtitle>
                  <v-card-text>
                    {{ card.text }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="12" class="padd" id="portfolio">
          <div class="first" id="project">
            <v-row>
              <v-col cols="12" sm="12" id="services">
                <div class="d-flex justify-center mb-6">
                  <v-btn tile dark color="grey" class="mt-4">
                    Download a brochure
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </div>
        </v-col>
      </v-container>
    </div>
    <Footer />
  </v-app>
</template>
<script>
import HomeNavbar from '../components/shared/HomeNavbar'
import Footer from '../components/shared/Footer'

export default {
  name: 'ServiceView',
  data() {
    return {
      tabs: 0,
      whyUsItems: [
        {
          title: 'STANDARD SOFT CLOSE DOORS AND DRAWERS', src: 'services/Service1.jpg', text: `What are soft close hinges? Soft-close hinges have hydraulics built into them so when you close the
                    cabinet door, the hydraulics take over and ease the door closed silently.
                    JH-Y Kitchen guarantee to provide the best hinges for our customers. We insure to use soft closing
                    hinges in order for the door shuts smoothly and silently. In addition, they also prevents fingers from
                    being slammed in doors due to the door closing too quickly. Definitely a must safety feature with
                    children.` },
        {
          title: 'INTERNAL MATERIAL', src: 'services/Service2.jpg', text: `We utilize the best quality internal material to be our priority to make our cabinet boxes and
                    drawers. We provide with two primarily options of internal material such as: hard rock maple or white
                    melamine. What are the advantages of particle boards? First of all particle board provides smooth and
                    flat surface for sticking decorative laminates or wood veneer. Secondly is stronger and aesthetically
                    attractive. At last, which is the most important it requires minimal maintenance and is easy to clean.
                    Also, Semi-custom Kitchen its commitment to environmental sustainability, therefore we determined to
                    use particle board due to it is an eco-friendly material.` },
        {
          title: 'PAINTING FINISH', src: 'services/Service5.jpg', text: `The importance of high- quality paint ; it provides longer lasting, higher durability, and safer
                    environment. High-quality paints can protect your cabinets; it is not only provide beautiful, even
                    color, but also mildew and spoilage protection. We strongly believe in using good quality paint can
                    prevent peeling and scratching. For those reasons,
                    we are proudly to use Chemcraft paint to be our main and only paint.` },
        {
          title: 'DOOR MATERIAL', src: 'services/Service6.jpg', text: `JH-Y Kitchen Cabinets utilizes MDF doors which stands for medium-density fiberboard (MDF). What is
                    MDF? It is an engineered material made by breaking down hardwood or softwood residuals into fine
                    particles, combining it with wax and a resin binder and applying high temperature and pressure. What
                    are the advantages of using MDF doors? MDF is a one piece wood material which is very consistent
                    throughout, so cut edges appear smooth and will not have voids or splinters. Due to it smoothness of
                    the surface is ideal for cutting detailed designs. Also, MDF has no joints like solid wood doors
                    therefore using MDF doors can prevent breaking or cracking on joints specially considering the hot and
                    cold weather of Canada.` },
        {
          title: 'STANDARD SOFT CLOSE for DRAWERS', src: 'services/Service7.jpg', text: `What are soft close hinges? Soft-close hinges have hydraulics built into them so when you close the
                    cabinet door, the hydraulics take over and ease the door closed silently.
                    JH-Y Kitchen guarantee to provide the best hinges for our customers. We insure to use soft closing
                    hinges in order for the door shuts smoothly and silently. In addition, they also prevents fingers from
                    being slammed in doors due to the door closing too quickly. Definitely a must safety feature with
                    children.` },
        {
          title: 'QUALITY DRAWER HARDWARES', src: 'services/Service8.jpg', text: `What are soft close hinges? Soft-close hinges have hydraulics built into them so when you close the
                    cabinet door, the hydraulics take over and ease the door closed silently.
                    JH-Y Kitchen guarantee to provide the best hinges for our customers. We insure to use soft closing
                    hinges in order for the door shuts smoothly and silently. In addition, they also prevents fingers from
                    being slammed in doors due to the door closing too quickly. Definitely a must safety feature with
                    children.` }
      ],
      ourServices: [
        {
          title: 'Kitchen Design', detail: `Our certified design team will sit down with you for a free initial consultation.
        With your needs in mind, the team will create a new floor plan that embraces your family’s lifestyle, ensuring aesthetics 
        as well as function. Our team will provide insightful suggestions based on their experience and expertise. In the end, 
        we hope to create a design that you love!` },
        {
          title: 'Space Planning', detail: `Once a kitchen is designed, our contractors along with our design team will make a home visit. 
          We will then take measurements, adjust any necessary plans and begin the initial steps to create your dream kitchen. ` },
        {
          title: 'Installation', detail: `The kitchen is installed in a timely manner, taking into consideration the family’s needs and lifestyle.
          Our staff ensures safety and cleanliness along the way until the complete kitchen is done. ` },
        {
          title: 'Custom Cabinetry', detail: `Along with our elegant kitchen designs, we also pride ourselves on offering luxurious accents to other
           rooms in your home. We offer unique vanities, functional fireplace mantles, bookcases, bedroom and basement wall units, to name a few. 
           With both classical and traditional styles to modern and cutting-edge designs, we are here to meet your every need. ` }
      ],
      galleryImgs: [
        { name: "", url: "gallery/Aaron_SW_2.jpg" },
        { name: "", url: "gallery/Aaron_SW_4.jpg" },
        { name: "", url: "gallery/Aaron_SW_6.jpg" },
        { name: "", url: "gallery/Aaron_SW_7.jpg" },
        { name: "", url: "gallery/Anya_SW_11.jpg" },
        { name: "", url: "gallery/Anya_SW_13.jpg" },
        { name: "", url: "gallery/Anya_SW_2.jpg" },
        { name: "", url: "gallery/Anya_SW_28.jpg" },
        { name: "", url: "gallery/Anya_SW_3.jpg" },
        { name: "", url: "gallery/Anya_SW_36.jpg" },
        { name: "", url: "gallery/Anya_SW_37.jpg" },
        { name: "", url: "gallery/Anya_SW_39.jpg" },
        { name: "", url: "gallery/Anya_SW_5.jpg" },
        { name: "", url: "gallery/Anya_SW_6.jpg" },
        { name: "", url: "gallery/Anya_VR_SW.jpg" },
        { name: "", url: "gallery/Beverly3.jpg" },
        { name: "", url: "gallery/David_SW_45.jpg" },
        { name: "", url: "gallery/Deepa_SW_24.jpg" },
        { name: "", url: "gallery/Deepa_SW_3.jpg" },
        { name: "", url: "gallery/Deepa_SW_32.jpg" },
        { name: "", url: "gallery/Deepa_SW_33.jpg" },
        { name: "", url: "gallery/Deepa_SW_35.jpg" },
        { name: "", url: "gallery/Deepa_SW_41.jpg" },
        { name: "", url: "gallery/Deepa_SW_42.jpg" },
        { name: "", url: "gallery/Deepa_SW_44.jpg" },
        { name: "", url: "gallery/Deepa_SW_46.jpg" },
        { name: "", url: "gallery/Deepa_SW_47.jpg" },
        { name: "", url: "gallery/Deepa_SW_48.jpg" },
        { name: "", url: "gallery/Deepa_SW_52.jpg" },
        { name: "", url: "gallery/Deepa_SW_56.jpg" },
        { name: "", url: "gallery/Deepa_SW_59.jpg" },
        { name: "", url: "gallery/Deepa_SW_6.jpg" },
        { name: "", url: "gallery/Deepa_SW_60.jpg" },
        { name: "", url: "gallery/Deepa_SW_67.jpg" },
        { name: "", url: "gallery/Deepa_SW_69.jpg" },
        { name: "", url: "gallery/Deepa_SW_73.jpg" },
        { name: "", url: "gallery/Deepa_SW_79.jpg" },
        { name: "", url: "gallery/Deepa_SW_82.jpg" },
        { name: "", url: "gallery/Deepa_SW_86.jpg" },
        { name: "", url: "gallery/Deepa_SW_VR_1.jpg" },
        { name: "", url: "gallery/Deepa_SW_VR_2.jpg" },
        { name: "", url: "gallery/Deepa_SW_VR_3.jpg" },
        { name: "", url: "gallery/Deepa_SW_VR_4.jpg" },
        { name: "", url: "gallery/Deepa_SW_VR_5.jpg" },
        { name: "", url: "gallery/Diana_SW_1.jpg" },
        { name: "", url: "gallery/Diana_SW_2.jpg" },
        { name: "", url: "gallery/Diana_SW_4.jpg" },
        { name: "", url: "gallery/Diana_SW_6.jpg" },
        { name: "", url: "gallery/Diana_SW_8.jpg" },
        { name: "", url: "gallery/Hui_SW_1.jpg" },
        { name: "", url: "gallery/Hui_SW_11.jpg" },
        { name: "", url: "gallery/Hui_SW_12.jpg" },
        { name: "", url: "gallery/Hui_SW_13.jpg" },
        { name: "", url: "gallery/Hui_SW_2.jpg" },
        { name: "", url: "gallery/Hui_SW_20.jpg" },
        { name: "", url: "gallery/Hui_SW_24.jpg" },
        { name: "", url: "gallery/Hui_SW_3.jpg" },
        { name: "", url: "gallery/Hui_SW_30.jpg" },
        { name: "", url: "gallery/Hui_SW_33.jpg" },
        { name: "", url: "gallery/Hui_SW_34.jpg" },
        { name: "", url: "gallery/Hui_SW_6.jpg" },
        { name: "", url: "gallery/Hui_VR_SW.jpg" },
        { name: "", url: "gallery/Hui_VR_SW1.jpg" },
        { name: "", url: "gallery/JinKang_NorthYork1.jpg" },
        { name: "", url: "gallery/JinKang_NorthYork14.jpg" },
        { name: "", url: "gallery/JinKang_NorthYork6.jpg" },
        { name: "", url: "gallery/JinKang_NorthYork7.jpg" },
        { name: "", url: "gallery/JoeWahba_SW_1.jpg" },
        { name: "", url: "gallery/JoeWahba_SW_25.jpg" },
        { name: "", url: "gallery/JoeWahba_SW_26.jpg" },
        { name: "", url: "gallery/JoeWahba_SW_32.jpg" },
        { name: "", url: "gallery/JoeWahba_SW_42.jpg" },
        { name: "", url: "gallery/JoeWahba_SW_47.jpg" },
        { name: "", url: "gallery/JoeWahba_SW_5.jpg" },
        { name: "", url: "gallery/JoeWahba_SW_50.jpg" },
        { name: "", url: "gallery/JoeWahba_SW_8.jpg" },
        { name: "", url: "gallery/Joyce_SW_10.jpg" },
        { name: "", url: "gallery/Joyce_SW_16.jpg" },
        { name: "", url: "gallery/Joyce_SW_18.jpg" },
        { name: "", url: "gallery/Joyce_SW_20.jpg" },
        { name: "", url: "gallery/Joyce_SW_22.jpg" },
        { name: "", url: "gallery/Joyce_SW_9.jpg" },
        { name: "", url: "gallery/Kitty_SW_1.jpg" },
        { name: "", url: "gallery/Kitty_SW_18.jpg" },
        { name: "", url: "gallery/Kitty_SW_26.jpg" },
        { name: "", url: "gallery/Kitty_SW_4.jpg" },
        { name: "", url: "gallery/Kitty_SW_5.jpg" },
        { name: "", url: "gallery/Kitty_SW_6.jpg" },
        { name: "", url: "gallery/Kitty_SW_7.jpg" },
        { name: "", url: "gallery/Showroon_RH_SW_1.jpg" },
        { name: "", url: "gallery/Showroon_RH_SW_15.jpg" },
        { name: "", url: "gallery/Showroon_RH_SW_20.jpg" },
        { name: "", url: "gallery/Showroon_RH_SW_21.jpg" },
        { name: "", url: "gallery/Showroon_RH_SW_23.jpg" },
        { name: "", url: "gallery/Showroon_RH_SW_24.jpg" },
        { name: "", url: "gallery/Showroon_RH_SW_27.jpg" },
        { name: "", url: "gallery/Showroon_RH_SW_28.jpg" },
        { name: "", url: "gallery/Showroon_RH_SW_30.jpg" },
        { name: "", url: "gallery/Showroon_RH_SW_31.jpg" },
        { name: "", url: "gallery/Showroon_RH_SW_32.jpg" },
        { name: "", url: "gallery/Showroon_RH_SW_33.jpg" },
        { name: "", url: "gallery/Showroon_RH_SW_34.jpg" },
        { name: "", url: "gallery/Showroon_RH_SW_35.jpg" },
        { name: "", url: "gallery/Showroon_RH_SW_36.jpg" },
        { name: "", url: "gallery/Showroon_RH_SW_37.jpg" },
        { name: "", url: "gallery/Showroon_RH_SW_9.jpg" },
        { name: "", url: "gallery/Stephenie & Daniel_10.jpg" },
        { name: "", url: "gallery/Stephenie & Daniel_11.jpg" },
        { name: "", url: "gallery/Stephenie & Daniel_18.jpg" },
        { name: "", url: "gallery/Stephenie & Daniel_19.jpg" },
        { name: "", url: "gallery/Stephenie & Daniel_2.jpg" },
        { name: "", url: "gallery/Stephenie & Daniel_3.jpg" },
        { name: "", url: "gallery/Stephenie & Daniel_5.jpg" },
        { name: "", url: "gallery/Stephenie & Daniel_7.jpg" },
        { name: "", url: "gallery/Stephen_13.jpg" },
        { name: "", url: "gallery/Stephen_2.jpg" },
        { name: "", url: "gallery/Stephen_4.jpg" },
        { name: "", url: "gallery/Stephen_5.jpg" },
        { name: "", url: "gallery/Suzan19.jpg" },
        { name: "", url: "gallery/Suzan2.jpg" },
        { name: "", url: "gallery/Suzan21.jpg" },
        { name: "", url: "gallery/Suzan23.jpg" },
        { name: "", url: "gallery/Suzan33.jpg" },
        { name: "", url: "gallery/Suzan35.jpg" },
        { name: "", url: "gallery/Suzan38.jpg" },
        { name: "", url: "gallery/Suzan39.jpg" },
        { name: "", url: "gallery/Suzan4.jpg" },
        { name: "", url: "gallery/Suzan40.jpg" },
        { name: "", url: "gallery/Suzan43.jpg" },
        { name: "", url: "gallery/Suzan48.jpg" },
        { name: "", url: "gallery/Suzan5.jpg" },
        { name: "", url: "gallery/Vivian_SW_11.jpg" },
        { name: "", url: "gallery/Vivian_SW_12.jpg" },
        { name: "", url: "gallery/Vivian_SW_3.jpg" },
        { name: "", url: "gallery/Vivian_SW_6.jpg" },
        { name: "", url: "gallery/Vivian_SW_9.jpg" },
        { name: "", url: "gallery/Yvonne_SW_1.jpg" },
        { name: "", url: "gallery/Yvonne_SW_11.jpg" },
        { name: "", url: "gallery/Yvonne_SW_12.jpg" },
        { name: "", url: "gallery/Yvonne_SW_15.jpg" },
        { name: "", url: "gallery/Yvonne_SW_17.jpg" },
        { name: "", url: "gallery/Yvonne_SW_19.jpg" },
        { name: "", url: "gallery/Yvonne_SW_2.jpg" },
        { name: "", url: "gallery/Yvonne_SW_20.jpg" },
        { name: "", url: "gallery/Yvonne_SW_21.jpg" },
        { name: "", url: "gallery/Yvonne_SW_23.jpg" },
        { name: "", url: "gallery/Yvonne_SW_24.jpg" },
        { name: "", url: "gallery/Yvonne_SW_27.jpg" },
        { name: "", url: "gallery/Yvonne_SW_28.jpg" },
        { name: "", url: "gallery/Yvonne_SW_30.jpg" },
        { name: "", url: "gallery/Yvonne_SW_31.jpg" },
        { name: "", url: "gallery/Yvonne_SW_33.jpg" },
        { name: "", url: "gallery/Yvonne_SW_37.jpg" },
        { name: "", url: "gallery/Yvonne_SW_38.jpg" },
        { name: "", url: "gallery/Yvonne_SW_39.jpg" },
        { name: "", url: "gallery/Yvonne_SW_4.jpg" },
        { name: "", url: "gallery/Yvonne_SW_42.jpg" },
        { name: "", url: "gallery/Yvonne_SW_45.jpg" },
        { name: "", url: "gallery/Yvonne_SW_47.jpg" },
        { name: "", url: "gallery/Yvonne_SW_5.jpg" },
        { name: "", url: "gallery/Yvonne_SW_9.jpg" }
      ]
    }
  },
  methods: {
    getImgUrl(pic) {
      return pic && require('@/assets/' + pic)
    },
    imageView(index) {
      this.$imageViewer.index(index);
      this.$imageViewer.show();
      console.log('this.$imageViewer:' + JSON.stringify(this.$imageViewer))
    }
  },
  created() {
    for (const i in this.galleryImgs) {
      const o = this.galleryImgs[i]
      if (o && o.url) {
        o.url = this.getImgUrl(o.url)
      }
      console.log(o)
    }

    this.$imageViewer.images(this.galleryImgs)
    this.$imageViewer.imgStyle = {width:1200,height:900}
  },
  components: {
    HomeNavbar,
    Footer

  },
}
</script>
<style scoped></style>