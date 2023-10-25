<template>
    <v-container>
        <v-row>
            <v-col cols="12">
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
                                <v-row>

                                    <v-col cols="12">

                                        <div class="d-flex align-center justify-space-between">
                                            <h4>Datos solicitados</h4>

                                            <v-btn class="mx-2" fab dark small color="success"
                                                   @click="addRequestedData">
                                                <v-icon dark>mdi-plus</v-icon>
                                            </v-btn>
                                        </div>

                                    </v-col>

                                    <v-col cols="12">
                                        <v-row>
                                            <v-col cols="12"
                                                   v-for="(requestedData, iRequestedData) in requested"
                                                   :key="iRequestedData">
                                                <v-text-field label="Ingrese un dato" placeholder="aceleracion, velocidad_final, tiempo, distancia, etc"
                                                    @change.native="modifyRequestedData(iRequestedData, $event.target.value)"
                                                    :value="requestedData"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-col>


                                    <v-col cols="12">
                                        <div class="d-flex align-center justify-space-between">
                                            <h4>Datos obtenidos</h4>

                                            <v-dialog width="500"
                                                v-model="dialog_add_data">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn class="mx-2" fab dark small color="success"
                                                           v-bind="attrs"
                                                           v-on="on">
                                                        <v-icon dark>mdi-plus</v-icon>
                                                    </v-btn>
                                                </template>

                                                <v-card>
                                                    <v-card-title class="text-h5 grey lighten-2">
                                                        Agregar dato
                                                    </v-card-title>

                                                    <v-card-text>

                                                        <v-container fluid>
                                                            <v-row>
                                                                <v-col cols="12">
                                                                    <v-text-field label="Nombre"
                                                                                  v-model="add_data"></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                        </v-container>
                                                    </v-card-text>

                                                    <v-divider></v-divider>

                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn color="success" text
                                                               @click="addData">
                                                            Agregar
                                                        </v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>

                                        </div>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-row>
                                            <v-col cols="12"
                                                   v-for="(data, iData) in data"
                                                   :key="iData">
                                                <v-row>
                                                    <v-col cols="12" sm="5">
                                                        <v-text-field placeholder="30, 40, 1.5, etc"
                                                            @change.native="modifyData(iData, 'value', $event.target.value)"
                                                            :label="capitalizeWord(data.name)"
                                                            :value="data.value"></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12" sm="5">
                                                        <v-text-field label="Unidad" placeholder="m/s, km/h, m/s2, s, etc"
                                                            @change.native="modifyData(iData, 'unit', $event.target.value)"
                                                            :value="data.unit"></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12" sm="2">
                                                        <v-btn class="mx-2" fab dark small color="red"
                                                               @click="deleteData(iData)">
                                                            <v-icon dark>mdi-delete</v-icon>
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-col>

                            <v-col cols="12" sm="6">

                                <v-row>
                                    <v-col cols="12">
                                        <v-list dense>
                                            <v-subheader>Solución de los datos solicitados</v-subheader>
                                            <v-list-item-group color="primary">
                                                <v-list-item active-class=""
                                                             v-for="(resolutionData, iResolutionData) in resolution"
                                                             :key="iResolutionData">
                                                    <v-list-item-content>
                                                        <v-list-item-title>
                                                            {{ capitalizeWord(resolutionData.name) }}: {{ resolutionData.value }} {{ resolutionData.unit }}
                                                        </v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </v-list-item-group>
                                        </v-list>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-btn elevation="2" color="success" dark large
                                               :disabled="button_disabled"
                                               @click="resolveProblem">
                                            RESOLVER CON DATOS
                                            <v-icon right dark>mdi-send</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>

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

export default {
    name: "ProblemComponent",

    data: () => ({
        problem: "",
        data: [],
        requested: [],
        resolution: [],

        dialog_add_data: "",
        add_data: "",

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
                .then( () => {

                    // this.data = response.data.data;
                    // this.requested = response.data.requested;
                    // this.resolution = response.data.resolution;

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
                .then( () => {

                    // this.data = response.data.data;
                    // this.requested = response.data.requested;
                    // this.resolution = response.data.resolution;

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

        addData () {
            this.data.push({
                name: this.add_data,
                value: "",
                unit: "",
            });

            this.dialog_add_data = false;
            this.add_data = "";
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
