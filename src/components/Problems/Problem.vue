<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <div class="text-center">
                    <v-img class="mx-auto" max-width="200px" max-height="200px" contain
                           :src="require('@/assets/logo.png')" />
                </div>
                <h3 class="display-1 font-weight-light mb-3 text-center">Dejá que una IA resuelva tus ejercicios de física 😎</h3>
                <v-alert outlined prominent shaped>
                    La aplicación está preparada para resolver problemas de MRU y MRUV. Para una mejor solución, trate de redactar el problema aclarando los datos que se necesitan obtener y los datos provistos
                </v-alert>
            </v-col>

            <v-col cols="12">
                <v-card class="mx-auto">
                    <v-card-title>Ingresar problema</v-card-title>
                    
                    <v-card-text>
                        
                        <v-row>
                            <v-col cols="12"
                                   
                                   v-if="show_error_message && error_message !== ''">
                                <v-alert v-model="show_error_message" border="left" close-text="Cerrar" dark dismissible type="error">
                                    {{ error_message }}
                                </v-alert>
                            
                            </v-col>
                            
                            <v-col cols="12">
                                <v-textarea name="input-7-1" label="Escribí tu problema" hint="Tratá de respetar las unidades y escribirlas de forma correcta" placeholder="Calcula el tiempo que demora un automóvil en recorrer 800 metros, con una velocidad media de 20 m/s"
                                
                                v-model="problem"></v-textarea>
                            </v-col>
                            
                            <v-col cols="12" class="text-right">
                                <v-btn elevation="2" color="success" dark large
                                       :disabled="button_disabled"
                                       @click="solveProblem">
                                    RESOLVER
                                    <v-icon right dark>mdi-send</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                
            </v-col>
            
            <v-col cols="12">
                <v-alert border="top" colored-border type="info" elevation="2">
                    La aplicación sólo soporta el sistema métrico decimal para un mejor procesamiento de los datos y para una estandarización de ellos.
                </v-alert>
            </v-col>

            <v-col cols="12"
                v-if="!button_disabled">
                <v-card class="mx-auto">
                    
                    <v-card-title>Solución</v-card-title>

                    <v-card-text>
                        
                        <v-row>

                            <v-col cols="12" sm="6" class="pr-10">
                                <ProblemData />
                            </v-col>

                            <v-col cols="12" sm="6">
                            
                                <Resolution
                                    :resolution="[]"
                                    :buttonDisabled="button_disabled"
                                    @resolveProblem="resolveProblem" />

                            </v-col>

                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" class="text-center"
                v-if="data.length === 0 && button_disabled">
                <v-progress-circular
                    :size="50"
                    color="primary"
                    indeterminate></v-progress-circular>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import ProblemData from "@/components/Problems/ProblemData.vue";
import Resolution from "@/components/Problems/Resolution.vue";

export default {
    name: "ProblemComponent",
    components: {ProblemData, Resolution},

    data: () => ({
        

        error_message: "",
        show_error_message: false,

        button_disabled: false,
    }),

    methods: {

        solveProblem () {
            
            // Clear vars
            this.button_disabled = true;
            this.show_error_message = false;
            this.error_message = "";
            
            // Process request
            this.$store.dispatch('solveProblem').catch( (responseError) => {
         
                // Show error
                this.show_error_message = true;
                this.error_message = responseError.response.data.message;
                
            }).finally( () => {
                this.button_disabled = false;
            });
        },

        resolveProblem () {

            // Clear vars
            this.button_disabled = true;
            this.show_error_message = false;
            this.error_message = "";
            
            // Process request
            this.$store.dispatch('resolveProblem').catch( (errResponse) => {
                
                // Show error
                this.show_error_message = true;
                this.error_message = errResponse.response.data.message;
                
            }).finally( () => {
                this.button_disabled = false;
            });
        },

        capitalizeWord (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        },
    },
    
    computed: {
        problem: {
            get () {
                return this.$store.state.problem;
            },
            set (value) {
                this.$store.commit('problem', value)
            }
        },
        
        data () {
            return this.$store.getters.data;
        },
        requested () {
            return this.$store.getters.requested;
        },
        resolution () {
            return this.$store.getters.resolution;
        },
    }
}
</script>
