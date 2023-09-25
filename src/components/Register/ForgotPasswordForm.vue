<script>
export default {
    name: "ForgotPasswordForm",
    
    props: {
        stateObj: {
            type: Object,
            default: () => {},
        }
    },
    
    data() {
        return {
            email: "",
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
        
        forgotPassword() {
            
            const { email } = this;
            
            this.buttonDisabled = true;
            this.clearMessages();
            
            // Process Login
            this.$axios.post(`${process.env.VUE_APP_API_URL}forgot-password`, {
                    email,
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
        }
    },
}
</script>

<template>
    <form ref="form" @submit.prevent="forgotPassword">
        
        <v-alert type="error" v-show="errorMessage !== ''">{{ errorMessage }}</v-alert>
        <v-alert type="success" v-show="successMessage !== ''">{{ successMessage }}</v-alert>
        
        <div
            v-if="!formSended">
            <v-text-field name="email" label="Email" type="email" placeholder="pepe@mail.com" required
                          v-model="email"
            ></v-text-field>
            
            <div class="d-flex justify-end mt-4">
                <v-btn type="submit" color="success" value="register"
                       :disabled="buttonDisabled">
                    {{ stateObj.name }}
                </v-btn>
            </div>
        </div>
    
    </form>
</template>

<style scoped>

</style>