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
        };
    },
    
    methods: {
        clearMessages () {
            this.successMessage = "";
            this.errorMessage = "";
        },
        
        forgotPassword() {
            
            // TODO: Request for forgot password
        }
    },
}
</script>

<template>
    <form ref="form" @submit.prevent="forgotPassword">
        
        <div class="red--text"> {{ errorMessage }}</div>
        <div class="green--text"> {{ successMessage }}</div>
        
        <v-text-field name="email" label="Email" type="email" placeholder="pepe@mail.com" required
                      v-model="email"
        ></v-text-field>
        
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