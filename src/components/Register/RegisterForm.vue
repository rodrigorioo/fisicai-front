<script>
export default {
    name: "RegisterForm",
    
    props: {
        stateObj: {
            type: Object,
            default: () => {},
        }
    },
    
    data() {
        return {
            email: "",
            password: "",
            confirmPassword: "",
            errorMessage: "",
            successMessage: "",
            buttonDisabled: false,
        };
    },
    
    methods: {
        clearMessages () {
            this.successMessage = "";
            this.errorMessage = "";
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
}
</script>

<template>
    <form ref="form" @submit.prevent="register">
        
        <div class="red--text"> {{ errorMessage }}</div>
        <div class="green--text"> {{ successMessage }}</div>
        
        <v-text-field name="email" label="Email" type="email" placeholder="pepe@mail.com" required
                      v-model="email"
        ></v-text-field>
        
        <v-text-field label="Contraseña"
                      v-model="password"
                      name="password"
                      type="password"
                      required></v-text-field>
        
        <v-text-field label="Confirmar Contraseña" name="confirmPassword" type="password" placeholder="confirmar contraseña"
                      v-model="confirmPassword"
                      required></v-text-field>
        
        <div class="d-flex justify-end mt-4">
            <v-btn type="submit" color="success" value="register"
                   :disabled="buttonDisabled">
                {{ stateObj.name }}
            </v-btn>
        </div>
    
    
    </form>
</template>

<style scoped>

</style>