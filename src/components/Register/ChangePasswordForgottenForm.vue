<script>
export default {
    name: "ChangePasswordForgottenForm",
    
    props: {
        code: {
            type: String,
            default: "",
        }
    },
    
    data() {
        return {
            password: "",
            confirmPassword: "",
            errorMessage: "",
            successMessage: "",
            buttonDisabled: false,
            formSended: false,
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
                
                const { code, password } = this;
                
                this.buttonDisabled = true;
                this.clearMessages();
                
                // Process Login
                this.$axios.post(`${process.env.VUE_APP_API_URL}change-password-forgotten`, {
                        code,
                        password,
                    },
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    }).then( (response) => {
                    
                    this.successMessage = response.data.message;
                    this.formSended = true;
                    
                }).catch( (errResponse) => {
                    
                    // Show error
                    this.errorMessage = errResponse.response.data.message;
                    
                }).finally( () => {
                    
                    // Clear vars
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
        
        <v-alert type="error" v-show="errorMessage !== ''">{{ errorMessage }}</v-alert>
        <v-alert type="success" v-show="successMessage !== ''">{{ successMessage }}</v-alert>
        
        <div
            v-if="!formSended">
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
                    Cambiar contraseña
                </v-btn>
            </div>
        </div>
    
    </form>
</template>

<style scoped>

</style>