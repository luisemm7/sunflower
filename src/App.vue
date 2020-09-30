<template>
  <v-app>
    
    <!-- AppBar ↓ -->

        <v-app-bar
          absolute
          color="#fcb69f"
          dark
          hide-on-scroll
          prominent
          src="https://firebasestorage.googleapis.com/v0/b/sunflower-v.appspot.com/o/Icons%2Fgirasolesbar.png?alt=media&token=d0675882-7d0f-44ac-83d9-a2eecba8db6e"
        >
          <template v-slot:img="{ props }">
            <v-img
              v-bind="props"
              gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
            ></v-img>
          </template>

          <v-layout justify-center class="mt-5">
            <v-toolbar-title>Lencería Sunflower</v-toolbar-title>
          </v-layout>

          <template v-slot:extension>
            <v-tabs centered slider-color="primary" slider-size="4">
              <v-tab to="/">Inicio</v-tab>
              <v-tab to="/clima">Clima</v-tab>
              <v-tab to="/about">Politica</v-tab>
            </v-tabs>
          </template>

        </v-app-bar>
    
    <!-- AppBar ↑ -->

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>

    <!-- Footer ↓ -->

      <v-footer
      dark
      padless
      >
        <v-card
          class="flex"
          flat
          tile
        >

          <v-card-text class="py-2 gray--text text-center secondary">
            {{ new Date().getFullYear() }} — <strong>Lencería Sunflower</strong>
            
            <v-btn
              v-for="icon in social"
              :key="icon.icon"
              :color="icon.color"
              class="ml-3"
              :class="icon.cc"
              fab
              x-small
              :href="icon.route" target="_blank"
            >
              <v-icon size="24px">{{ icon.icon }}</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-footer>

    <!-- Footer ↑ -->

  </v-app>
</template>

<script>


export default {
  name: 'App',

  data: () => ({
    social: [
        {color: 'blue darken-2', icon: 'mdi-facebook', route: 'https://www.facebook.com/pages/category/Clothing--Brand-/Lencer%C3%ADa-Sunflower-Underwear-519792908494757/'},
        {color: 'red darken-2', icon: 'mdi-youtube', route: 'https://www.youtube.com/channel/UCWOZoA7FY1Ef_3FfaUBrreQ'},
        {cc: 'insta',color: '', icon: 'mdi-instagram', route: 'https://instagram.com/lenceria_sunflowermx?igshid=1thhjx9kde20d'}
      ],
  }),
};
</script>

<style>

  .insta {
    background: #833ab4;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #fcb045, #fd1d1d, #833ab4);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #fcb045, #fd1d1d, #833ab4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }

</style>
