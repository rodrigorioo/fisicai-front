<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <div class="text-center">
                    <v-img class="mx-auto" max-width="200px" max-height="200px" contain
                           :src="require('@/assets/logo.png')" />
                </div>
                <h1 class="display-2 font-weight-bold mb-3 text-center">FisicAI</h1>
                <h3 class="display-1 font-weight-light mb-3 text-center">Dejá que una IA resuelva tus ejercicios de física 😎</h3>
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

            <v-col cols="12"
                v-if="!button_disabled">
                <v-card class="mx-auto">

                    <v-card-title>Solución</v-card-title>

                    <v-card-text>
                        <v-row>

                            <v-col cols="12" sm="6" class="pr-10">
                                <ProblemData
                                    :data="data"
                                    :requested="requested"
                                
                                    @addRequestedData="addRequestedData"
                                    @modifyRequestedData="modifyRequestedData"
                                    @addData="addData"
                                    @modifyData="modifyData"
                                    @deleteData="deleteData" />
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
        problem: "",
        data: [],
        requested: [],
        resolution: [],

        error_message: "",
        show_error_message: false,

        button_disabled: false,
    }),

    methods: {

        solveProblem () {

            // Clear vars
            this.button_disabled = true;

            this.data = [];
            this.requested = [];
            this.resolution = [];

            this.show_error_message = false;
            this.error_message = "";

            // Process request
            this.$axios.post(`${process.env.VUE_APP_API_URL}solve-problem`, {
                problem: this.problem,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then( (response) => {

                    this.data = response.data.data;
                    this.requested = response.data.requested;
                    this.resolution = response.data.resolution;

                })
                .catch( (errResponse) => {

                    // Show error
                    this.show_error_message = true;
                    this.error_message = errResponse.response.data.message;

                    // Reset problem text
                    this.problem = "";

                }).finally( () => {
                    this.button_disabled = false;
            });
        },

        resolveProblem () {

            // Clear vars
            this.button_disabled = true;

            this.resolution = [];

            this.show_error_message = false;
            this.error_message = "";

            // Process request
            this.$axios.post(`${process.env.VUE_APP_API_URL}solve-problem`, {
                resolution: {
                    data: this.data,
                    requested: this.requested,
                },
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then( (response) => {

                    this.data = response.data.data;
                    this.requested = response.data.requested;
                    this.resolution = response.data.resolution;

                })
                .catch( (errResponse) => {

                    // Show error
                    this.show_error_message = true;
                    this.error_message = errResponse.response.data.message;

                    // Reset problem text
                    this.problem = "";

                }).finally( () => {
                    this.button_disabled = false;
            });
        },

        capitalizeWord (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        },

        addRequestedData () {
            this.requested.push("");
        },

        modifyRequestedData (iRequestedData, value) {
            this.requested[iRequestedData] = value;
        },

        addData (name) {
            this.data.push({
                name,
                value: "",
                unit: "",
            });
        },

        modifyData (iData, type, value) {
            this.data[iData][type] = value;
        },

        deleteData (iData) {
            this.data.splice(iData, 1);
        },
    }
}
</script>
