<template>
<v-layout justify-center class="card1">
<v-flex xs11 sm11 md6 lg6 xl4 >
<v-card shaped elevation="9">
    <v-img
        src="../assets/cold-bg.jpg"
        gradient="to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.75)"
    >
        <v-card-text class="cardtext">
            <v-form class="px-3 text-center">
                <v-text-field @keyup.enter="fetchWeather()" label="Escribe el nombre de una ciudad" v-model="query" prepend-icon="public"></v-text-field>
                <v-btn @click="fetchWeather()" class="primary mx-0 mt-2">
                    Buscar clima
                    <v-icon right dark>mdi-cloud</v-icon>
                </v-btn>
            </v-form>

            <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
                <div class="location-box">
                    <div class="location">{{weather.name}}, {{weather.sys.country}}</div>
                    <div class="date">{{dateBuilder()}}</div>
                </div>
                <div class="weather-box">
                    <div class="temp">{{Math.round(weather.main.temp)}}°c</div>
                    <div class="weather">{{weather.weather[0].main}}</div>
                </div>
            </div>

        </v-card-text>

        <!-- <div :class="typeof weather.main != 'undefined' && 
        weather.main.temp > 16 ? 'warm' : ''">
            <div class="search-box">
                <input 
                type="text" 
                class="search-bar" 
                placeholder="Escribe el nombre de una ciudad..."
                v-model="query"
                @keyup.enter="fetchWeather()" 
                /> --> <!-- con el keyup quitamos el if que teniamos abajo en esa funcion -->
                
            <!-- </div>

            <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
                <div class="location-box">
                <div class="location">{{weather.name}}, {{weather.sys.country}} </div>
                <div class="date">{{dateBuilder()}}</div>
                </div>
                <div class="weather-box">
                <div class="temp">{{Math.round(weather.main.temp)}}°c</div>
                <div class="weather">{{weather.weather[0].main}}</div>
                </div>
            </div>
        </div> -->
        
    </v-img>
</v-card>
</v-flex>
</v-layout>
</template>

<script>
export default {


    data () {
      return { //cambio
        api_key: process.env.VUE_APP_MY_API_KEYCLIMA,
        url_base: 'https://api.openweathermap.org/data/2.5/', //http://api.weatherbit.io/v2.0/current  http://api.weatherbit.io/v2.0/  // https://api.openweathermap.org/data/2.5
        query: '',
        weather: {}
      }
    },
    methods: {
      fetchWeather () {
        /* quitamos el if gracias al keyup de Vuejs */
        //if (e.key == "Enter") {
          fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
            .then(res => {
              return res.json()
            }).then(this.setResults)
        //}
      },
      setResults (results) {
        this.weather = results;
      },
      /* Funcion para obtener la fecha */
      dateBuilder () {
        let d = new Date();
        let months = ["January", "February", "March", "April",
        "May", "June", "July", "August", "September", "October",
        "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
      }
    }

}
</script>

<style scoped>
    .card1 {
    margin-top: 175px;
    }
    .cardtext {
        margin-top: 60%;
    }
    .weather-wrap {
        margin-top: 10%;
    }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'montserrat', sans-serif ;
  }

  main {
    min-height: 100vh;
    padding: 25px;

 /*    background-image: linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.75));
   */}

  .search-box{
    width: 100%;
    margin-bottom: 30px;
  }

  .search-box .search-bar {
    display: block;
    width: 100%;
    padding: 15px;

    color: black;
    font-size: 20px;

    appearance: none;
    border: none;
    outline: none;
    background: none;

    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0px 16px 0px 16px;
    transition: 0.4s;
  }

  .search-box .search-bar:focus {
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 16px 0px 16px 0px;
  }

  .location-box .location {
    color:azure;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
  }

  .location-box .date{
    color:azure;
    font-size: 20px;
    font-weight: 300;
    font-style: italic;
    text-align: center;
  }

  .weather-box {
    text-align: center;
  }

  .weather-box .temp {
    display: inline-block;
    padding: 50px 25px;
    color: azure;
    font-size: 102px;
    font-weight: 900;
    
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 16px;
    margin-bottom: 20px;
    margin-top: 2px;

    box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }

  .weather-box .weather {
    color:azure;
    font-size: 48px;
    font-weight:700;
    font-style: italic;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }

</style>