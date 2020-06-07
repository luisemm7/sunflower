<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" class="ma-1" tile outlined color="success">
                Iniciar sesión <v-icon>mdi-login</v-icon> 
            </v-btn>
        </template>
            <v-card class="pa-3 text-center">
                Puedes iniciar sesión mediante:
                <v-btn class="mx-2" fab dark large color="#3b5998">
                    <v-icon dark>mdi-facebook</v-icon>
                </v-btn>
                <v-btn class="mx-2" fab dark large color="#00acee">
                    <v-icon dark>mdi-twitter</v-icon>
                </v-btn>
                <v-btn class="mx-2" fab dark large color="#db4a39">
                    <v-icon dark>mdi-google</v-icon>
                </v-btn>          
            </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialog: false
        }
    },
}
</script>

<style>

</style>