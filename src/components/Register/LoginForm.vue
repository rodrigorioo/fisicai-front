<script>
export default {
    name: "LoginForm",
    
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
    },
}
</script>

<template>
    <form ref="form" @submit.prevent="login">
        
        <div class="red--text"> {{ errorMessage }}</div>
        <div class="green--text"> {{ successMessage }}</div>
        
        <v-text-field name="email" label="Email" type="email" placeholder="pepe@mail.com" required
                      v-model="email"></v-text-field>
        
        <v-text-field label="Contraseña"
                      v-model="password"
                      name="password"
                      type="password"
                      required></v-text-field>
        
        <div class="d-flex justify-end mt-4">
            <v-btn type="submit" color="success" value="log in"
                   :disabled="buttonDisabled">
                {{ stateObj.name }}
            </v-btn>
        </div>
    
    
    </form>
</template>

<style scoped>

</style>