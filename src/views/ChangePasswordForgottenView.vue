<template>
    <v-app >
        <v-main>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Cambiar contraseña</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                            
                                <ChangePasswordForgottenForm
                                    v-if="validCode"
                                    :code="code" />
                                
                                <v-alert type="error"
                                    v-else>{{ errorMessage }}</v-alert>
                            </v-card-text>
                        </v-card>
                    
                    </v-flex>
                </v-layout>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

import ChangePasswordForgottenForm from "@/components/Register/ChangePasswordForgottenForm.vue";

export default {
    name: "ChangePasswordForgottenView",
    components: {ChangePasswordForgottenForm},
    
    data() {
        return {
            errorMessage: "",
            validCode: false,
        };
    },
    
    mounted() {
        // Check code
        this.$axios.post(`${process.env.VUE_APP_API_URL}check-forgot-password-code`, {
                code: this.code,
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then( () => {
                
                this.validCode = true;
            
        }).catch( (errResponse) => {
            
            // Show error
            this.errorMessage = errResponse.response.data.message;
            
        });
        
    },
    
    computed: {
        code: function() {
            return this.$route.params.code;
        }
    }
}
</script>

<style scoped>

</style>
