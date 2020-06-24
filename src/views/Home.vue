<template>
  <div>

    <!-- Tarjeta de Bienvenida ↓ -->
    
      <v-layout justify-center class="card1">
        <v-flex xs12 sm8 md6 lg5 xl4 >
          <v-card shaped elevation="9" class="text-center">

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline mb-2">Lencería Sunflower</v-list-item-title>
                <p v-bind:class="{'d-none': loggedIn}" class="grey--text">Sitio en desarrollo. Puedes iniciar sesión para ver los demás productos con los que contamos.</p>
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
          v-for="(product,index) in products"
          :key="product.id"
          :class="loggedIn === false && product.auth === true ? 'd-none' : ''"
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

            <!-- Add to cart ↓ -->

              <v-card-actions>
                <v-btn :id="index" color="success" outlined @click="dialogCart = true;" v-on:click="clickCart($event)" >
                  <v-icon>mdi-cart-plus</v-icon>
                </v-btn>
              </v-card-actions>

            <!-- Add to cart ↑ -->

          </v-card>
        </v-flex>
      </v-layout>

    <!-- Productos ↑ -->


    <!-- PopupCart ↓ -->
      <v-dialog 
        v-model="dialogCart" 
        width="90%"
      >
        <v-card class="pa-3">

          <v-img
            contain
            class="secondary--text align-end"
            :src="products[idCart].photo"
          >

            <v-card-title class="precio">${{products[idCart].price}}</v-card-title>

          </v-img>

          <v-card-subtitle class="pa-1">
            {{products[idCart].title}}
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div> {{products[idCart].text}} </div>
          </v-card-text>
          
          <v-card-actions>

            <v-btn
              large
              outlined
              color="error"
              @click="dialogCart = false"
            >
              <v-icon>close</v-icon>
            </v-btn>
  
          </v-card-actions>
        </v-card>
      </v-dialog>
    <!-- PopupCart ↑ -->

    <v-snackbar
      multi-line
      v-model="snackbar"
      :timeout="4000"
      color="success"
      rounded="pill"
    >
      Gracias por iniciar sesión.
      <template v-slot:action="{ on }">
        <v-btn
          v-bind="on"
          text
          @click="snackbar = false"
        >
          <v-icon>cancel</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      multi-line
      v-model="snackbar2"
      :timeout="4000"
      color="warning"
      rounded="pill"
    >
      Sesión cerrada correctamente.
      <template v-slot:action="{ on }">
        <v-btn
          v-bind="on"
          text
          @click="snackbar2 = false"
        >
          <v-icon>cancel</v-icon>
        </v-btn>
      </template>
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

    data() {
      return {
        products: [
          { id: '0', photo: '/Bras/b1-n.png', title: 'Set negro', stars: 3.5, price: '280', text: 'Set completo color negro muy buena calidad' },
          { id: '1', photo: '/Bras/b1-v.png', title: 'Set violeta', stars: 3, price: '230', text: 'Set completo color violeta o morado excelente calidad' },
          { id: '2', photo: '/Bras/b2-b.png', title: 'Bra blanco', stars: 4.5, price: '179', text: 'Bra sin barillas muy cómodo' },
          { id: '3', photo: '/Bras/b2-p.png', title: 'Bra marron', stars: 3.5, price: '179', text: 'Bra color piel' },
          { id: '4', photo: '/Bras/b3-p.png', title: 'Bra piel', stars: 5, price: '199', text: 'Bra con rallas color piel' },
          { id: '5', photo: '/Bras/b3-r.png', title: 'Bra rosa', stars: 4, price: '199', text: 'Bra color rosa' },
          { id: '6', photo: '/Bras/b4-r.png', title: 'Set rosa', stars: 4.5, price: '280', text: 'Set completo color rosa de muy buena calidad' },
          { id: '7', photo: '/Bras/b5-r.png', title: 'Set rojo', stars: 5, price: '280', text: 'Set completo color rojo muy buena calidad' },
          { id: '8', photo: '/Bras/b6-p.png', title: 'Bra vainilla', stars: 3.5, price: '190', text: 'Bra color piel, muy buena calidad' },
          { id: '9', auth: true, photo: '/Bras/b7-a.png', title: 'Set azul', stars: 5, price: '280', text: 'Set color azul, muy buena calidad y comodidad' },
          { id: '10', auth: true, photo: '/Bras/b7-p.png', title: 'Set rosa', stars: 5, price: '280', text: 'Set color rosa, muy buena calidad y comodidad' },
          { id: '11', auth: true, photo: '/Bras/b7-r.png', title: 'Set rojo', stars: 5, price: '280', text: 'Set color rojo, muy buena calidad y comodidad' },
          { id: '12', auth: true, photo: '/Bras/b7-v.png', title: 'Set violeta', stars: 4.5, price: '280', text: 'Set color violeta, muy buena calidad y comodidad' },
          { id: '13', auth: true, photo: '/Bras/b8-bn.png', title: 'Set sexy', stars: 4.5, price: '189', text: 'Set blaco o negro, muy sexy, de buena calidad' },
        ],
        loggedIn: false,
        snackbar: false,
        snackbar2: false,
        nombre: '',
        foto: '',
        dialogCart: false,
        idCart: '0'
      }
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
      },
      clickCart (event) {
        var targetId = event.currentTarget.id;
        //console.log('id: ', targetId);
        this.idCart = targetId;
        //console.log('idcart: ', this.idCart); a
      },
    },

  }



</script>



<style>
  .card1 {
    margin-top: 175px;
  }
  .precio {
    width: 82px;
    background-color: rgba(255, 255, 255, 0.55);
  }
</style>