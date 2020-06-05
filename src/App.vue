<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>open_in_new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>

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
          <v-card-title class="amber lighten-2">
            <strong class="subheading black--text">Visitanos en las siguientes plataformas!</strong>

            <v-spacer></v-spacer>

            <v-btn
              v-for="icon in social"
              :key="icon.icon"
              class="mx-4 black--text"
              icon
              :href="icon.route" target="_blank"
            >
              <v-icon size="24px">{{ icon.icon }}</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text class="py-2 gray--text text-center secondary">
            {{ new Date().getFullYear() }} — <strong>Lencería Sunflower</strong>
          </v-card-text>
        </v-card>
      </v-footer>

    <!-- Footer ↑ -->

  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    social: [
        {icon: 'mdi-facebook', route: 'https://www.facebook.com/pages/category/Clothing--Brand-/Lencer%C3%ADa-Sunflower-Underwear-519792908494757/'},
        {icon: 'mdi-youtube', route: 'https://www.youtube.com/channel/UCWOZoA7FY1Ef_3FfaUBrreQ'},
        {icon: 'mdi-instagram', route: 'https://instagram.com/lenceria_sunflowermx?igshid=1thhjx9kde20d'}
      ],
  }),
};
</script>
