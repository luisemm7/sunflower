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
          <p class="mt-0 mb-0 grey--text">Ordenar los productos:</p>
          <v-layout row justify-center class="pb-3">

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn class="pl-1 pr-1" text color="grey" @click="sortByPrice('price')" v-on="on">
                  <v-icon class="ma-0" left>monetization_on</v-icon>
                  <span class="caption text-capitalize">Por precio</span>
                </v-btn>
              </template>
              <span>Ordenar por precio</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn class="pl-1 pr-1" text color="grey" @click="sortByStarts('stars')" v-on="on">
                  <v-icon class="ma-0" left>stars</v-icon>
                  <span class="caption text-capitalize">Por puntaje</span>
                </v-btn>
              </template>
              <span>Ordenar por estrellas</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn class="pl-1 pr-1" text color="grey" @click="sortByD('available')" v-on="on">
                  <v-icon class="ma-0" left>check_circle</v-icon>
                  <span class="caption text-capitalize">Disponibles</span>
                </v-btn>
              </template>
              <span>Disponibles</span>
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
        lg4
        xl4
        v-for="(product) in productos"
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
              :id="product.id"
              :color="product.available === false ? 'blue-grey lighten-4' : 'success'"
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
    <v-dialog v-model="dialogCart" width="96%" max-width="700">
      <v-card class="pa-1">
        <v-img contain class="secondary--text align-end" :src="productos[indexclickCart].photo">
          <v-card-title class="precio">${{productos[indexclickCart].price}}</v-card-title>
        </v-img>

        <v-card-subtitle class="pa-1">{{productos[indexclickCart].title}}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{productos[indexclickCart].text}}</div>
          <p v-if="productos[indexclickCart].available === false" class="ma-0 blue-grey--text">No disponible por el momento, para más información contactenos en nuestras redes sociales.</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-0 pt-2 pb-1">
          <v-btn small outlined color="error" @click="dialogCart = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
            <v-btn
              :disabled="productos[indexclickCart].available === false ? true : false"
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
      max-width="700"
    >
  
      <v-card id="Carrito">
        <v-card-title
          class="headline grey lighten-2 pa-2"
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
          <p class="ma-0">{{producto.title}}: <strong>{{producto.count}}</strong> x ${{producto.price}}</p>
          <v-spacer></v-spacer>

            <v-btn @click="removeCart ($event)" :id="index" class="pa-0" text small color="error">
              <v-icon id="tacha">delete_forever</v-icon>
            </v-btn>
          </v-layout>
          <v-divider></v-divider>
        </v-card-text>
        
        <v-divider></v-divider>

        <v-card-actions>
          
          <v-btn small outlined color="error" @click="carrito = false">
            <v-icon id="close">close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <p class="ma-0" :class=" carritonotificacion != 0 ? '' : 'd-none' ">
            Total: $ {{totalCarrito}} 
          </p>
          <v-spacer></v-spacer>
          <v-btn
            id="ticket"
            :class="carritonotificacion != 0 ? '' : 'd-none'"
            outlined
            color="success"
            text
            @click="formulario = true"
          >
            Ticket <v-icon>receipt</v-icon>
          </v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Carrito ↑ -->

    <!-- Formulario ↓ -->

    <v-dialog v-model="formulario" max-width="600">
      <v-card>
        <v-card-title class="pa-2 headline grey lighten-2">
          <span>Formulario</span> <v-icon class="ml-1" color="secondary">mdi-book-open-variant</v-icon>
        </v-card-title>
        <v-form
          @submit.prevent="crearPdf"
          class="ma-2"
          ref="form"
          v-model="valid"
        >
          <v-text-field
            name="name"
            prepend-inner-icon="mdi-account-arrow-right"
            v-model="name"
            :rules="reglasName"
            label="Nombre"
            required
          ></v-text-field>
          <v-text-field
            name="lsname"
            prepend-inner-icon="mdi-account-arrow-right-outline"
            v-model="apellido"
            :rules="reglasApellido"
            label="Apellido"
            required
          ></v-text-field>
          <v-text-field
            name="colonia"
            prepend-inner-icon="mdi-home-city"
            v-model="colonia"
            :rules="reglasDireccion"
            label="Colonia"
            required
          ></v-text-field>
          <v-text-field
            name="calle"
            prepend-inner-icon="mdi-home"
            v-model="calle"
            :rules="reglasDireccion"
            label="Calle y número"
            required
          ></v-text-field>
          <v-text-field
            name="codigo"
            prepend-inner-icon="mdi-home-map-marker"
            v-model="codigopostal"
            :rules="reglasCodigo"
            label="Código postal"
            required
          ></v-text-field>
          <v-text-field
            name="telefono"
            prepend-inner-icon="mdi-cellphone-iphone"
            v-model="telefono"
            :rules="reglasTelefono"
            label="Teléfono"
            required
          ></v-text-field>
          <v-text-field
            name="email"
            prepend-inner-icon="mdi-at"
            v-model="email"
            :rules="reglasEmail"
            label="E-mail"
            required
          ></v-text-field>

          <v-card-actions>
          <v-btn small outlined color="error" @click="formulario = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loadingT"
            small
            outlined
            :disabled="!valid"
            color="success"
            class="ma-2"
            type="submit"
          >
            Aceptar <v-icon>mdi-file-download-outline</v-icon>
          </v-btn>
          </v-card-actions>

        </v-form>
      </v-card>
    </v-dialog>

    <!-- Formulario ↑ -->

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
      Producto agregado.
      <template v-slot:action="{ on }">
        <v-btn v-bind="on" text @click="snackbar3 = false">
          <v-icon>cancel</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar top multi-line v-model="snackbar4" color="light-blue accent-4" rounded="pill">
      Orden de compra generada.
      <template v-slot:action="{ on }">
        <v-btn v-bind="on" text @click="snackbar4 = false">
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

//Firebase
import {fireauth} from "@/Firebase";
import {db} from "@/Firebase";

import * as jsPDF from 'jspdf';

import emailjs from 'emailjs-com';

export default {
  name: "Home",
  components: { Popup },

  created() {

    let ref = db.ref().child('productosf');

    ref.on('value', async snap => this.productos = await snap.val());

    //console.log("productos: ",this.productos);

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

      productos: '', //datos obtenidos de firebase
      
      loggedIn: false,
      snackbar: false,
      snackbar2: false,
      snackbar3: false,
      snackbar4: false,
      nombre: "",
      foto: "",
      dialogCart: false,
      indexclickCart: "0",
      carrito: false,
      idProduct: '',
      productoagregado: [],
      contador: 0,
      IDclickCart: '',
      PE: '',
      pAgregadoid: '',
      indexcount: 0,
      carritonotificacion: 0,
      totalCarrito: 0,
      loadingT: false,

      formulario: false,
      valid: false,
      name: '',
      apellido: '',
      colonia: '',
      calle: '',
      codigopostal: '',
      telefono: '',
      email: '',
      reglasEmail: [
        v => !!v || 'Ingrese un E-mail',
        v => /.+@.+\..+/.test(v) || 'Ingrese un E-mail válido',
      ],
      reglasName: [
        v => !!v || 'Ingrese un Nombre',
        v => (v && v.length >= 2) || 'Ingrese un Nombre válido',
      ],
      reglasApellido: [
        v => !!v || 'Ingrese un Apellido',
        v => (v && v.length >= 2) || 'Ingrese un Apellido válido',
      ],
      reglasDireccion: [
        v => !!v || 'Ingrese una Dirección',
        v => (v && v.length >= 4) || 'Ingrese una Dirección válida',
      ],
      reglasCodigo: [
        v => !!v || 'Ingrese un código postal',
        v => /([0-9]{4})/.test(v) || 'Ingrese un código postal válido',
      ],
      reglasTelefono: [
        v => !!v || 'Ingrese un Teléfono',
        v => (v && v.length >= 6) || 'Ingrese un Teléfono con 10 dígitos',
        v => /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(v) || 'Ingrese un Teléfono válido',
      ],
    };
  },

  methods: {

    sortByStarts(prop) {
      this.productos.sort((a, b) => (a[prop] < b[prop] ? 1 : -1));
    },

    sortByPrice(prop) {
      this.productos.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },

    sortByD(prop) {
      this.productos.sort((a, b) => (a[prop] != b[prop] ? -1 : 1));
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

      //Obtengo el ID del boton (que es el mismo que el del producto)
      this.IDclickCart = event.currentTarget.id;
      //console.log('IDclickCart: ', this.IDclickCart);

      //En el array productos busco el que tenga el IDclickCart
      this.PE = this.productos.find(P => P.id == this.IDclickCart);
      //console.log('PE: ', this.PE);

      //Obtengo el Index del producto con el this.IDclickCart
      this.indexclickCart = this.productos.indexOf(this.PE);
      //console.log('indexclickCart: ', this.indexclickCart);
      //console.log('***************************');

      if (this.productoagregado.length == 0) {
            this.contador = 0;
      }

    },

    addCart() {

      if (this.contador == 0) {

        //Agrego el producto al carrito
        this.productoagregado.push({count: this.PE.count, id: this.PE.id, photo: this.PE.photo, title: this.PE.title, stars: this.PE.stars, price: this.PE.price, text: this.PE.text, img: this.PE.img})
        //console.log('Primer producto agregado: ', this.productoagregado);
        
        //muestro la notificacion y la aumento
        this.snackbar3 = true;
        this.carritonotificacion++;

        //Suma para el TOTAL:
        this.totalCarrito += this.productos[this.indexclickCart].price;
        
        //pongo el contador a 1 para que ya no entre a este if
        this.contador = 1;
        //console.log('contador: ', this.contador);
     
      } else {

        var igual = this.productoagregado.find(U => U.id == this.IDclickCart)
        //console.log('var-igual: ',igual);

        var igualIndex = this.productoagregado.indexOf(igual);
        //console.log('igualIndex: ',igualIndex);

        //console.log('igual.id: ',igual.id);

        //if para comparar si esta repetido el id.
        if (igualIndex != -1) {
          
          if (this.IDclickCart == igual.id) {
            
            //console.log('count+1');
            this.productoagregado[igualIndex].count ++;
            this.snackbar3 = true;
            //Suma para el TOTAL
            this.totalCarrito += this.productos[this.indexclickCart].price;
                
          } 

        }else {

          //si el id no esta repetido entonces agregamos
          this.productoagregado.push({count: this.PE.count, id: this.PE.id, photo: this.PE.photo, title: this.PE.title, stars: this.PE.stars, price: this.PE.price, text: this.PE.text, img: this.PE.img})
          //console.log('Producto agregado: ', this.productoagregado);
          
          //muestro la notificacion y la aumento
          this.snackbar3 = true;
          this.carritonotificacion++;

          //Suma para el TOTAL:
          this.totalCarrito += this.productos[this.indexclickCart].price;
        
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

    crearPdf(e) {

      this.loadingT = true

      var pdf = new jsPDF()

      //Datos ↓

      pdf.setFontSize(16)
      pdf.text('Datos del usuario: ',140,28)
      pdf.setFontType('italic')
      pdf.setFontSize(12)
      pdf.text('Nombre: ',114,38)
      pdf.setFontType('normal')
      pdf.text(this.name,133,38)
      pdf.setFontType('italic')
      pdf.text('Apellido: ',114,48)
      pdf.setFontType('normal')
      pdf.text(this.apellido,133,48)
      pdf.setFontType('italic')
      pdf.text('Colonia: ',115,58)
      pdf.setFontType('normal')
      pdf.text(this.colonia,133,58)
      pdf.setFontType('italic')
      pdf.text('Calle y núm. : ',104,68)
      pdf.setFontType('normal')
      pdf.text(this.calle,133,68)
      pdf.setFontType('italic')
      pdf.text('Código postal: ',103,78)
      pdf.setFontType('normal')
      pdf.text(this.codigopostal,133,78)
      pdf.setFontType('italic')
      pdf.text('Teléfono: ',112,88)
      pdf.setFontType('normal')
      pdf.text(this.telefono,133,88)
      pdf.setFontType('italic')
      pdf.text('E-mail: ',117,98)
      pdf.setFontType('normal')
      pdf.text(this.email,133,98)

      //Datos ↑

      //FOR para imagenes+ ↓
      var y = 30
      var yy = 39
      var x = 28
      var xx = 67
      var xx2 = 77
      var xl = 10
      var yl = 48

      pdf.setFont('helvetica')
      pdf.setFontType('normal')
      pdf.setFontSize(22)
      pdf.text('Orden de compra',80,18)

      pdf.setFontType('italic')
      pdf.setFontSize(12)
      pdf.text('Lencería Sunflower',92,10)

      pdf.text('El total de su pedido es: ',21,28)

      pdf.setFontType('bold')
      pdf.text('$' + this.totalCarrito,68,28)

      pdf.setDrawColor(255, 0, 0)
      pdf.line(19, 29.5, 81, 29.5) // x,y,x2,y2
      pdf.setDrawColor(0, 0, 0)

      var logof = new Image()
      logof.src = '/Bras/sunflower2.png'
      pdf.addImage(logof, 'PNG',86,6,5,5)
      pdf.addImage(logof, 'PNG',129.5,6,5,5)

      for (let i = 0; i < this.carritonotificacion; i++) {

        var imgUrl = this.productoagregado[i].img
        var img = new Image()
        img.src = imgUrl

        var titulo = this.productoagregado[i].title
        var cantidad = this.productoagregado[i].count
        var precio = this.productoagregado[i].price

        pdf.addImage(img, 'JPEG',10,y,15,15)//

        pdf.setFont('times')
        pdf.setFontType('italic')
        pdf.setFontSize(16)
        pdf.text(titulo + ':',x,yy)
        pdf.text(cantidad + ' x',xx,yy)
        pdf.text('$' + precio,xx2,yy)
        pdf.line(xl, yl, 90, yl)

        y += 20
        yy += 20
        yl += 20
      }

      //FOR para imagenes+ ↑

      pdf.save('ticket.pdf')
      this.loadingT = false
      this.snackbar4 = true
      this.formulario = false
      this.carrito = false

      //EmailJS
       emailjs.sendForm(process.env.VUE_APP_MY_EMAILJS_ID, process.env.VUE_APP_MY_EMAILJS_IDT, e.target, process.env.VUE_APP_MY_EMAILJS_IDU)
        /* .then((result) => {
            console.log('SUCCESS!', result.status, result.text);
        }, (error) => {
            console.log('FAILED...', error);
        }); */
    }
  }
};
</script>



<style>
.v-dialog--active {
  margin-right: 10px;
  margin-left: 10px;
}
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