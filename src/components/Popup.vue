<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" class="ma-1" tile outlined color="success">
                Iniciar sesión <v-icon>mdi-login</v-icon> 
            </v-btn>
        </template>
            <v-card class="pa-3 text-center">
                Puedes iniciar sesión mediante:
                <v-btn @click="facebook" class="mx-2" fab dark large color="#3b5998">
                    <v-icon dark>mdi-facebook</v-icon>
                </v-btn>
                <v-btn @click="twitter" class="mx-2" fab dark large color="#00acee">
                    <v-icon dark>mdi-twitter</v-icon>
                </v-btn>
                <v-btn @click="google" class="mx-2" fab dark large color="#db4a39">
                    <v-icon dark>mdi-google</v-icon>
                </v-btn>          
            </v-card>
        
        <v-snackbar
            multi-line
            v-model="snackbar"
            :timeout="4000"
            color="error"
            rounded="pill"
            >
            Hay un error, inténtelo nuevamente.
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

    </v-dialog>
</template>

<script>

import firebase from 'firebase/app'
import fireauth from '@/Firebase'

export default {
    data() {
        return {
            dialog: false,
            snackbar: false
        }
    },
    methods: {
        async facebook() {
                try {

                    var provider = await new firebase.auth.FacebookAuthProvider();
                 
                    fireauth.signInWithPopup(provider);

                }catch(err){
                    this.snackbar = true;
                    console.log('Error facebook: ',err)
                }
        },      
        async google() {
                try {

                    var provider2 = await new firebase.auth.GoogleAuthProvider();
                    
                    provider2.addScope('profile');
                    provider2.addScope('email');
                    fireauth.signInWithPopup(provider2);
        
                }catch(err) {
                    this.snackbar = true;
                    console.log('Error google: ',err);
                }
                
        },
        async twitter() {
                try {

                    var provider3 = await new firebase.auth.TwitterAuthProvider();
                   
                    fireauth.signInWithPopup(provider3);
    
                }catch(err){
                    this.snackbar = true;
                    console.log('Error Twitter: ',err);
                }
                
        },
         
    },
}
</script>

<style>

</style>