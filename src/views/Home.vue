<template>
  <div>

    <!-- Tarjeta de Bienvenida ↓ -->
    
      <v-layout justify-center class="card1">
        <v-flex xs12 sm8 md6 lg5 xl4 >
          <v-card shaped elevation="9" class="text-center">

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline mb-2">Lencería Sunflower</v-list-item-title>
                <p class="grey--text">Puedes iniciar sesión para ver los demás productos con los que contamos.</p>
              </v-list-item-content>
            </v-list-item>

            <template v-if="loggedIn">

              <v-avatar>
                <img :src="foto">
              </v-avatar>
              <p>Gracias por iniciar sesión{{' ' + nombre}}.</p>
              <v-btn @click="signOut" class="ma-1" tile outlined color="error">
                Cerrar sesión <v-icon>mdi-logout</v-icon> 
              </v-btn>

            </template>

            <template v-else>
            
              <v-card-actions>
                <v-layout justify-center>
                  <v-flex>
                    <Popup />
                  </v-flex>
                </v-layout>
              </v-card-actions>

            </template>

            <!-- Ordenador/sorter ↓ -->
              <p class="mt-2 mb-0 grey--text">
                  Ordenar los productos:      
              </p>
              <v-layout row justify-center>
                
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn text color="grey" @click="sortBy('price')" v-on="on">
                      <v-icon left >monetization_on</v-icon>
                      <span class="caption text-capitalize">Por precio</span>
                    </v-btn>
                  </template>
                  <span>Ordenar por precio</span>
                </v-tooltip>
                
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn text color="grey" @click="sortBy('stars')" v-on="on">
                      <v-icon left>stars</v-icon>
                      <span class="caption text-capitalize">Por puntaje</span>
                    </v-btn>
                  </template>
                  <span>Ordenar por estrellas</span>
                </v-tooltip>
              </v-layout>

            <!-- Ordenador/sorter ↑ -->

          </v-card>
        </v-flex>
      </v-layout>

    <!-- Tarjeta de Bienvenida ↑ -->

    <!-- Productos ↓ -->

      <v-layout row wrap justify-center>
        <v-flex xs11 sm6 
          v-for="product in products"
          :key="product.photo"
        >
          <v-card
            class="mx-auto my-6"
            max-width="374"
          >
            <v-img
              height="250"
              :src="product.photo"
              :lazy-src="product.photo"
              aspect-ratio="1"
            >
            
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-row>
              </template>
            
            </v-img>

            <v-card-title>{{product.title}}</v-card-title>

            <v-card-text>
              <v-row
                align="center"
                class="mx-0"
              >
                <v-rating
                  :value="product.stars"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>
              </v-row>

              <div class="my-4 subtitle-1">
                $ {{product.price}}
              </div>

              <div>{{product.text}}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

    <!-- Productos ↑ -->

    <v-snackbar
      multi-line
      v-model="snackbar"
      :timeout="4000"
      color="success"
    >
      Gracias por iniciar sesión.
      <v-btn
        text
        @click="snackbar = false"
      >
        Cerrar
      </v-btn>
    </v-snackbar>

    <v-snackbar
      multi-line
      v-model="snackbar2"
      :timeout="4000"
      color="warning"
    >
      Sesión cerrada correctamente.
      <v-btn
        text
        @click="snackbar2 = false"
      >
        Cerrar
      </v-btn>
    </v-snackbar>

  </div>
</template>

<script>
// @ is an alias to /src
import Popup from '@/components/Popup'
import fireauth from '@/Firebase'

  export default {
    name: 'Home',
    components: {Popup},
    data() {
      return {
        products: [
          { photo: '/Bras/b1-n.png', title: 'Set negro', stars: 3.5, price: '290', text: 'Set completo color negro muy buena calidad' },
          { photo: '/Bras/b1-v.png', title: 'Set violeta', stars: 3, price: '285', text: 'Set completo color violeta o morado excelente calidad' },
          { photo: '/Bras/b2-b.png', title: 'Bra blanco', stars: 4.5, price: '150', text: 'Bra sin barillas muy comodo' },
          { photo: '/Bras/b2-p.png', title: 'Bra marron', stars: 2, price: '155', text: 'Bra color piel' },
          { photo: '/Bras/b3-p.png', title: 'Bra piel', stars: 5, price: '190', text: 'Bra con rallas color piel' },
          { photo: '/Bras/b3-r.png', title: 'Bra rosa', stars: 4, price: '195', text: 'Bra color rosa' },
          { photo: '/Bras/b4-r.png', title: 'Set rosa', stars: 4.5, price: '290', text: 'Set completo color rosa de muy buena calidad' },
          { photo: '/Bras/b5-r.png', title: 'Set rojo', stars: 5, price: '295', text: 'Set completo color rojo muy buena calidad' },
          { photo: '/Bras/b6-p.png', title: 'Bra vainilla', stars: 3.5, price: '190', text: 'Bra color piel o algo asi, muy buena calidad' }
        ],
        loggedIn: false,
        snackbar: false,
        snackbar2: false,
        nombre: '',
        foto: ''
      }
    },
    created() {
      fireauth.onAuthStateChanged(user => {
        this.loggedIn = !!user;
        var user1 = fireauth.currentUser;
        var name,photoUrl;

        if (user1 != null) {
          this.snackbar = true;
          name = user1.displayName;
          photoUrl = user1.photoURL;
          this.nombre = name;
          this.foto = photoUrl;
        }
      })
      
    },
    methods: {
      sortBy(prop){ 
        this.products.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
      },
      async signOut(){
                try {
                    await fireauth.signOut();
                    this.loggedIn = false;
                    this.snackbar2 = true;
                }catch (err){
                    console.log(err)
                }
            }
    },
  }



</script>



<style>
  .card1 {
    margin-top: 175px;
  }
</style>