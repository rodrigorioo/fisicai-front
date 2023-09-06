<template>
    <v-app >
        <v-main>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>{{isRegister ? stateObj.register.name : stateObj.login.name}}</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <form ref="form" @submit.prevent="isRegister ? register() : login()">
                                    
                                    <div class="red--text"> {{ errorMessage }}</div>
                                    <div class="green--text"> {{ successMessage }}</div>
                                    
                                    <v-text-field
                                        v-model="email"
                                        name="email"
                                        label="Email"
                                        type="email"
                                        placeholder="pepe@mail.com"
                                        required
                                    ></v-text-field>
                                    
                                    <v-text-field
                                        v-model="password"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        required
                                    ></v-text-field>
                                    
                                    <v-text-field v-if="isRegister"
                                                  v-model="confirmPassword"
                                                  name="confirmPassword"
                                                  label="Confirmar Password"
                                                  type="password"
                                                  placeholder="cocnfirm password"
                                                  required
                                    ></v-text-field>
                                    
                                    <v-btn type="submit" class="mt-4" color="primary" value="log in"
                                           :disabled="buttonDisabled">
                                        {{ isRegister ? stateObj.register.name : stateObj.login.name }}
                                    </v-btn>
                                    <div class="grey--text mt-4"
                                         @click="isRegister = !isRegister;">
                                        {{ toggleMessage }}
                                    </div>
                                </form>
                            </v-card-text>
                        </v-card>
                    
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

export default {
    name: "LoginForm",
    
    data() {
        return {
            email: "",
            password: "",
            confirmPassword: "",
            isRegister : false,
            errorMessage: "",
            successMessage: "",
            buttonDisabled: false,
            stateObj: {
                register :{
                    name: 'Registrarse',
                    message: 'Ya tenes una cuenta? Login.'
                },
                login : {
                    name: 'Ingresar',
                    message: 'Registrate'
                }
            }
        };
    },
    
    methods: {
        register () {
        
        },
        
        login () {
        
        }
    },
    
    computed: {
        toggleMessage: function () {
            return this.isRegister ? this.stateObj.register.message : this.stateObj.login.message;
        }
    }
}
</script>

<style scoped>

</style>
