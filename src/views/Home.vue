<template>
  <div>
    <!-- Tarjeta de Bienvenida ↓ -->

    <v-layout justify-center class="card1">
      <v-flex xs12 sm8 md6 lg5 xl4>
        <v-card shaped elevation="9" class="text-center">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline mb-2">Lencería Sunflower</v-list-item-title>
              <p
                v-bind:class="{'d-none': loggedIn}"
                class="grey--text"
              >Sitio en desarrollo. Puedes iniciar sesión para ver los demás productos con los que contamos.</p>
            </v-list-item-content>
          </v-list-item>

          <template v-if="loggedIn">
            <v-avatar>
              <img :src="foto" />
            </v-avatar>
            <p>Gracias por iniciar sesión{{' ' + nombre}}.</p>
            <v-btn @click="signOut" class="ma-1" tile outlined color="error">
              Cerrar sesión
              <v-icon>mdi-logout</v-icon>
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

          <!-- Boton carrito ↓ -->
          
            <v-btn
              @click="carrito = true"
              absolute
              color="orange"
              class="white--text"
              fab
              small
              right
              bottom
            >
              <v-badge
                :content="carritonotificacion"
                :value="carritonotificacion"
                color="green"
                overlap
                bordered
              >
                <v-icon>mdi-cart</v-icon>
              </v-badge>
            </v-btn>
          

          <!-- Boton carrito ↑ -->

          <!-- Ordenador/sorter ↓ -->
          <p class="mt-2 mb-0 grey--text">Ordenar los productos:</p>
          <v-layout row justify-center>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn text color="grey" @click="sortBy('price')" v-on="on">
                  <v-icon left>monetization_on</v-icon>
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
      <v-flex
        xs11
        sm6
        v-for="(product,index) in products"
        :key="product.id"
        :class="loggedIn === false && product.auth === true ? 'd-none' : ''"
      >
        <v-card class="mx-auto my-6" max-width="374">
          <v-img height="250" :src="product.photo" :lazy-src="product.photo" aspect-ratio="1">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-card-title>{{product.title}}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="product.stars"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
            </v-row>

            <div class="my-4 subtitle-1">$ {{product.price}}</div>

            <div>{{product.text}}</div>
          </v-card-text>

          <!-- Add to cart ↓ -->

          <v-card-actions>
            <v-btn
              :id="index"
              color="success"
              outlined
              @click="dialogCart = true;"
              v-on:click="clickCart($event)"
            >
              <v-icon>shopping_cart</v-icon>
            </v-btn>
          </v-card-actions>

          <!-- Add to cart ↑ -->
        </v-card>
      </v-flex>
    </v-layout>

    <!-- Productos ↑ -->

    <!-- PopupCart ↓ -->
    <v-dialog v-model="dialogCart" width="90%">
      <v-card class="pa-3">
        <v-img contain class="secondary--text align-end" :src="products[indexCart].photo">
          <v-card-title class="precio">${{products[indexCart].price}}</v-card-title>
        </v-img>

        <v-card-subtitle class="pa-1">{{products[indexCart].title}}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{products[indexCart].text}}</div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn small outlined color="error" @click="dialogCart = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            medium
            color="success"
            text
            @click="dialogCart = false, addCart()"
          >
            Agregar al carrito <v-icon>mdi-cart-plus</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- PopupCart ↑ -->

    <!-- Carrito ↓ -->
    <v-dialog
      v-model="carrito"
      width="96%"
    >
  
      <v-card id="Carrito">
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          <v-icon class="mr-1" color="secondary">mdi-cart</v-icon> Carrito de compras
        </v-card-title>

        <v-card-text class="pa-1" v-for="(producto, index) in productoagregado" :key="producto.id">
          <v-layout class="ma-0" row  align-center>
          <v-avatar
            class="ma-2"
            size="60"
            tile
          >
            <v-img :src="producto.photo"></v-img>
          </v-avatar>
          {{producto.title}}: <strong>{{producto.count}}</strong> x ${{producto.price}}
          <v-spacer></v-spacer>

            <v-btn @click="removeCart ($event)" :id="index" class="pa-0" text small color="error">
              <v-icon>delete_forever</v-icon>
            </v-btn>
          </v-layout>
          <v-divider></v-divider>
        </v-card-text>
        
        <v-divider></v-divider>

        <v-card-actions>
          
          <v-btn small outlined color="error" @click="carrito = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <p class="ma-0" :class=" carritonotificacion != 0 ? '' : 'd-none' ">
            Total: $ {{totalCarrito}} 
          </p>
          <v-spacer></v-spacer>
          <v-btn
            :class="carritonotificacion != 0 ? '' : 'd-none'"
            outlined
            color="success"
            text
            @click="crearPdf"
          >
            Ticket
          </v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Carrito ↑ -->

    <!-- Notificaciones ↓ -->
    <v-snackbar top multi-line v-model="snackbar" :timeout="4000" color="success" rounded="pill">
      Gracias por iniciar sesión.
      <template v-slot:action="{ on }">
        <v-btn v-bind="on" text @click="snackbar = false">
          <v-icon>cancel</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar top multi-line v-model="snackbar2" :timeout="4000" color="warning" rounded="pill">
      Sesión cerrada correctamente.
      <template v-slot:action="{ on }">
        <v-btn v-bind="on" text @click="snackbar2 = false">
          <v-icon>cancel</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar top multi-line v-model="snackbar3" :timeout="2000" color="success" rounded="pill">
      Producto agregado
      <template v-slot:action="{ on }">
        <v-btn v-bind="on" text @click="snackbar3 = false">
          <v-icon>cancel</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Notificaciones ↑ -->

  </div>
</template>

<script>
// @ is an alias to /src
import Popup from "@/components/Popup";
import fireauth from "@/Firebase";
import * as jsPDF from 'jspdf';

export default {
  name: "Home",
  components: { Popup },

  created() {
    fireauth.onAuthStateChanged(user => {
      this.loggedIn = !!user;
      var user1 = fireauth.currentUser;
      var name, photoUrl;

      if (user1 != null) {
        this.snackbar = true;
        name = user1.displayName;
        photoUrl = user1.photoURL;
        this.nombre = name;
        this.foto = photoUrl;
      }
    });
  },

  data() {
    return {
      products: [
        {
          count: 1,
          id: "0",
          photo: "/Bras/b1-n.png",
          title: "Set negro",
          stars: 3.5,
          price: 280,
          text: "Set completo color negro muy buena calidad"
        },
        {
          count: 1,
          id: "1",
          photo: "/Bras/b1-v.png",
          title: "Set violeta",
          stars: 3,
          price: 230,
          text: "Set completo color violeta o morado excelente calidad"
        },
        {
          count: 1,
          id: "2",
          photo: "/Bras/b2-b.png",
          title: "Bra blanco",
          stars: 4.5,
          price: 179,
          text: "Bra sin barillas muy cómodo"
        },
        {
          count: 1,
          id: "3",
          photo: "/Bras/b2-p.png",
          title: "Bra marron",
          stars: 3.5,
          price: 179,
          text: "Bra color piel"
        },
        {
          count: 1,
          id: "4",
          photo: "/Bras/b3-p.png",
          title: "Bra piel",
          stars: 5,
          price: 199,
          text: "Bra con rallas color piel"
        },
        {
          count: 1,
          id: "5",
          photo: "/Bras/b3-r.png",
          title: "Bra rosa",
          stars: 4,
          price: 199,
          text: "Bra color rosa"
        },
        {
          count: 1,
          id: "6",
          photo: "/Bras/b4-r.png",
          title: "Set rosa",
          stars: 4.5,
          price: 280,
          text: "Set completo color rosa de muy buena calidad"
        },
        {
          count: 1,
          id: "7",
          photo: "/Bras/b5-r.png",
          title: "Set rojo",
          stars: 5,
          price: 280,
          text: "Set completo color rojo muy buena calidad"
        },
        {
          count: 1,
          id: "8",
          photo: "/Bras/b6-p.png",
          title: "Bra vainilla",
          stars: 3.5,
          price: 190,
          text: "Bra color piel, muy buena calidad"
        },
        {
          count: 1,
          id: "9",
          auth: true,
          photo: "/Bras/b7-a.png",
          title: "Set azul",
          stars: 5,
          price: 280,
          text: "Set color azul, muy buena calidad y comodidad"
        },
        {
          count: 1,
          id: "10",
          auth: true,
          photo: "/Bras/b7-p.png",
          title: "Set rosa",
          stars: 5,
          price: 280,
          text: "Set color rosa, muy buena calidad y comodidad"
        },
        {
          count: 1,
          id: "11",
          auth: true,
          photo: "/Bras/b7-r.png",
          title: "Set rojo",
          stars: 5,
          price: 280,
          text: "Set color rojo, muy buena calidad y comodidad"
        },
        {
          count: 1,
          id: "12",
          auth: true,
          photo: "/Bras/b7-v.png",
          title: "Set violeta",
          stars: 4.5,
          price: 280,
          text: "Set color violeta, muy buena calidad y comodidad"
        },
        {
          count: 1,
          id: "13",
          auth: true,
          photo: "/Bras/b8-bn.png",
          title: "Set sexy",
          stars: 4.5,
          price: 189,
          text: "Set blaco o negro, muy sexy, de buena calidad"
        }
      ],
      loggedIn: false,
      snackbar: false,
      snackbar2: false,
      snackbar3: false,
      nombre: "",
      foto: "",
      dialogCart: false,
      indexCart: "0",
      carrito: false,
      idProduct: '',
      productoagregado: [],
      contador: 0,
      agregadoIdId: '',
      pAgregadoid: '',
      indexcount: 0,
      carritonotificacion: 0,
      totalCarrito: 0,
    };
  },
  methods: {
    sortBy(prop) {
      this.products.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    async signOut() {
      try {
        await fireauth.signOut();
        this.loggedIn = false;
        this.snackbar2 = true;
      } catch (err) {
        console.log(err);
      }
    },
    clickCart(event) {
      var indexC = event.currentTarget.id;
      //console.log('indexC: ', indexC);
      this.indexCart = indexC;
      //console.log('indexCart: ', this.indexCart);

      if (this.productoagregado.length == 0) {
            this.contador = 0;
      }
    },
    addCart() {

      if (this.contador == 0) {

        //Obtengo el id del producto a agregar
        this.idProduct = this.products[this.indexCart].id;
        //console.log('*idProduct: ', this.idProduct);

        //Suma para el TOTAL:
        this.totalCarrito += this.products[this.indexCart].price;

        //Tomo el producto a agregar por su id
        var pAgregado = this.products.find((pAgregado) => pAgregado.id == this.idProduct)
        //console.log('pAgregado: ', pAgregado);

        //Almaceno el id del producto agregado
        this.pAgregadoid = pAgregado.id;
        //console.log('*pAgregadoid: ', this.pAgregadoid);

        //Agrego el producto al carrito
        this.productoagregado.push({count: pAgregado.count, id: pAgregado.id, photo: pAgregado.photo, title: pAgregado.title, stars: pAgregado.stars, price: pAgregado.price, text: pAgregado.text})
        //console.log('Primer producto agregado: ', this.productoagregado);

        this.snackbar3 = true;
        this.carritonotificacion++;
        
        //pongo el contador a 1 para que ya no entre a este if
        this.contador = 1;
        //console.log('contador: ', this.contador);
     
      } else {
        //Obtengo el id del producto a agregar
        this.idProduct = this.products[this.indexCart].id;
        //console.log('*idProduct: ', this.idProduct);

        //Suma para el TOTAL:
        this.totalCarrito += this.products[this.indexCart].price;

        //El error esta aqui, estaba porque puse ? '' : ''
        //si no encuentra producto con ese id se detiene aqui
        //Escaneo los agregados y Obtengo el id
        var agregadoId = this.productoagregado.find((agregadoId) =>  (agregadoId.id == this.idProduct ? this.pAgregadoid = agregadoId.id : ''/*console.log('agregadoId*: ', this.pAgregadoid)*/ ));
        //console.log('agregadoId**: ', this.pAgregadoid);

        this.indexcount = this.productoagregado.indexOf(agregadoId);
        //console.log('indexcount: ', this.indexcount);

        //if para comparar si esta repetido el id
        if (this.idProduct == this.pAgregadoid) {
          
          
          this.productoagregado[this.indexcount].count ++;
          //console.log('count+1');

          this.snackbar3 = true;
          
          
        } else {

          //si el id no esta repetido entonces agregamos

          //Obtengo el id del producto a agregar
          this.idProduct = this.products[this.indexCart].id;
          //console.log('*idProduct: ', this.idProduct);

          //Tomo el producto a agregar por su id
          pAgregado = this.products.find((pAgregado) => pAgregado.id == this.idProduct)
          //console.log('pAgregado: ', pAgregado);

          //Almaceno el id del producto agregado
          this.pAgregadoid = pAgregado.id;
          //console.log('*pAgregadoid: ', this.pAgregadoid);

          //Agrego el producto al carrito
          this.productoagregado.push({count: pAgregado.count, id: pAgregado.id, photo: pAgregado.photo, title: pAgregado.title, stars: pAgregado.stars, price: pAgregado.price, text: pAgregado.text})
          //console.log('Producto agregado: ', this.productoagregado);
        
          this.snackbar3 = true;
          this.carritonotificacion++;

          //Obtengo el index del producto agregado con ayuda del id
          //Por si se llega a repetir el id
          //Escaneo los agregados y Obtengo el id.
          agregadoId = this.productoagregado.find((agregadoId) =>  (agregadoId.id == this.idProduct ? this.pAgregadoid = agregadoId.id : ''/*console.log('agregadoId*: ', this.pAgregadoid)*/ ));
          //console.log('agregadoId**: ', this.pAgregadoid);

          this.indexcount = this.productoagregado.indexOf(agregadoId);
          //console.log('indexcount: ', this.indexcount);
        }
        
      }

    },
    removeCart (event) {
      var indexRemove = event.currentTarget.id;

      //para el TOTAL:
      this.totalCarrito -= (this.productoagregado[indexRemove].count * this.productoagregado[indexRemove].price);

      this.productoagregado.splice(indexRemove, 1);
      this.carritonotificacion--;
    },
    crearPdf () {
      html2canvas(document.getElementById('Carrito'), {
        onrendered: function (canvas) {
          var img = canvas.toDataURL("image/png");
          var pdf = new jsPDF();
          pdf.addImage(img, 'JPEG',20,20);
          pdf.save("orden.pdf");
        }
      });
    }
  }
};
</script>



<style>
.card1 {
  margin-top: 175px;
}
.precio {
  width: 82px;
  background-color: rgba(255, 255, 255, 0.55);
}
.v-badge__badge{
  margin-left: 8px !important;
  margin-bottom: 8px !important;
}
</style>