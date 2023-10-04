<template>
    <v-app >
        <v-main>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <div>
                            <v-img class="mx-auto" max-width="200px" max-height="200px" contain
                                   :src="require('@/assets/logo.png')" />
                        </div>
                        
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>{{ stateObj[stateObjSelected].name }}</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                            
                                <LoginForm
                                    v-if="stateObjSelected === 'login'"
                                    :stateObj="stateObj.login" />
                                
                                <RegisterForm
                                    v-if="stateObjSelected === 'register'"
                                    :stateObj="stateObj.register" />
                                
                                <ForgotPasswordForm
                                    v-if="stateObjSelected === 'forgotPassword'"
                                    :stateObj="stateObj.forgotPassword" />
                                
                                <div class="d-flex justify-end mt-2">
                                    <v-btn type="button" color="primary" class="ml-2"
                                        v-for="(stateObj, nameStateObj) in buttonStateObjs"
                                           :key="nameStateObj"
                                        @click="stateObjSelected = nameStateObj">
                                        {{ stateObj.name }}
                                    </v-btn>
                                </div>
                            </v-card-text>
                        </v-card>
                    
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

import LoginForm from "@/components/Register/LoginForm.vue";
import RegisterForm from "@/components/Register/RegisterForm.vue";
import ForgotPasswordForm from "@/components/Register/ForgotPasswordForm.vue";

export default {
    name: "RegisterView",
    
    components: {ForgotPasswordForm, RegisterForm, LoginForm},
    
    data() {
        return {
            errorMessage: "",
            successMessage: "",
            stateObj: {
                register :{
                    name: 'Registrarse',
                    message: '¿Ya tenes una cuenta? Ingresá'
                },
                login : {
                    name: 'Ingresar',
                    message: 'Registrate'
                },
                forgotPassword: {
                    name: 'Olvidé mi contraseña',
                    message: '¿Olvidaste tu contraseña?'
                }
            },
            stateObjSelected: 'login'
        };
    },
    
    methods: {
    
    },
    
    computed: {
        buttonStateObjs: function () {
            return Object.keys(this.stateObj)
                .filter( (el) => el !== this.stateObjSelected)
                .reduce( (acc, keyStateObj) => {
                    
                    acc[keyStateObj] = this.stateObj[keyStateObj];
                    
                    return acc;
                }, {});
        }
    }
}
</script>

<style scoped>

</style>
