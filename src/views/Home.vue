<template>
  <div>

    <!-- Tarjeta de Bienvenida ↓ -->
    
      <v-layout justify-center class="card1">
        <v-flex xs12 sm8 md6 lg5 xl4 >
          <v-card shaped>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">Lencería Sunflower</v-list-item-title>
              <v-list-item-subtitle></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <v-btn class="ma-2" tile outlined color="success">
                Iniciar sesión <v-icon>mdi-login</v-icon> 
              </v-btn>
            </v-card-actions>

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
            ></v-img>

            <v-card-title>{{product.title}}</v-card-title>

            <v-card-text>
              <v-row
                align="center"
                class="mx-0"
              >
                <v-rating
                  :value="product.starts"
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
  </div>
</template>

<script>
// @ is an alias to /src


  export default {
    name: 'Home',
    data() {
      return {
        products: [
          { photo: '/Bras/b1-n.png', title: 'Set negro', starts: 3.5, price: '290', text: 'Set completo color negro muy buena calidad' },
          { photo: '/Bras/b1-v.png', title: 'Set violeta', starts: 3, price: '285', text: 'Set completo color violeta o morado excelente calidad' },
          { photo: '/Bras/b2-b.png', title: 'Bra blanco', starts: 4.5, price: '150', text: 'Bra sin barillas muy comodo' },
          { photo: '/Bras/b2-p.png', title: 'Bra marron', starts: 2, price: '140', text: 'Bra color piel' },
          { photo: '/Bras/b3-p.png', title: 'Bra piel', starts: 5, price: '190', text: 'Bra con rallas color piel' },
          { photo: '/Bras/b3-r.png', title: 'Bra rosa', starts: 4, price: '195', text: 'Bra color rosa' },
          { photo: '/Bras/b4-r.png', title: 'Set rosa', starts: 4.5, price: '290', text: 'Set completo color rosa de muy buena calidad' },
          { photo: '/Bras/b5-r.png', title: 'Set rojo', starts: 5, price: '295', text: 'Set completo color rojo muy buena calidad' },
          { photo: '/Bras/b6-p.png', title: 'Bra vainilla', starts: 3.5, price: '190', text: 'Bra color piel o algo asi, muy buena calidad' }
        ]
      }
    },
  }



</script>



<style>
  .card1 {
    margin-top: 175px;
  }
</style>