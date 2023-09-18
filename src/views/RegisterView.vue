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
                                    
                                    <v-text-field name="email" label="Email" type="email" placeholder="pepe@mail.com" required
                                        v-model="email"
                                    ></v-text-field>
                                    
                                    <v-text-field label="Contraseña"
                                        v-model="password"
                                        name="password"
                                        type="password"
                                        required
                                    ></v-text-field>
                                    
                                    <v-text-field label="Confirmar Contraseña" name="confirmPassword" type="password" placeholder="confirmar contraseña"
                                        v-if="isRegister"
                                                  v-model="confirmPassword"
                                                  
                                                  required
                                    ></v-text-field>
                                    
                                    <div class="d-flex justify-end mt-4">
                                        <v-btn type="button" class="me-2" color="primary"
                                               @click="isRegister = !isRegister;">
                                            {{ toggleMessage }}
                                        </v-btn>
                                        
                                        <v-btn type="submit" color="primary" value="log in"
                                               :disabled="buttonDisabled">
                                            {{ isRegister ? stateObj.register.name : stateObj.login.name }}
                                        </v-btn>
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
                    message: '¿Ya tenes una cuenta? Ingresá'
                },
                login : {
                    name: 'Ingresar',
                    message: 'Registrate'
                }
            }
        };
    },
    
    methods: {
        clearMessages () {
            this.successMessage = "";
            this.errorMessage = "";
        },
        
        login() {
            
            const { email, password } = this;
            
            this.buttonDisabled = true;
            this.clearMessages();
            
            // Process Login
            this.$axios.post(`${process.env.VUE_APP_API_URL}login`, {
                    email,
                    password,
                },
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then( (response) => {
                
                const data = response.data;
                
                // Load access token to localStorage
                this._auth_login(data.accessToken);
                
                // Redirect user to home page
                this.$router
                    .push({ name: 'home' });
                
            }).catch( (errResponse) => {
                
                // Show error
                this.errorMessage = errResponse.response.data.message;
                
            }).finally( () => {
                
                this.buttonDisabled = false;
                
            });
        },
        
        register() {
            
            // If the passwords are equals
            if(this.password == this.confirmPassword){
                
                const { email, password } = this;
                
                this.buttonDisabled = true;
                this.clearMessages();
                
                // Process Login
                this.$axios.post(`${process.env.VUE_APP_API_URL}register`, {
                        email,
                        password,
                    },
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).then( (response) => {
                    
                    this.successMessage = response.data.message;
                    
                }).catch( (errResponse) => {
                    
                    // Show error
                    this.errorMessage = errResponse.response.data.message;
                    
                }).finally( () => {
                    
                    // Clear vars
                    this.isRegister = false;
                    this.$refs.form.reset();
                    this.buttonDisabled = false;
                    
                });
                
            } else {
                this.errorMessage = "Las contraseñas no coinciden"
            }
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
