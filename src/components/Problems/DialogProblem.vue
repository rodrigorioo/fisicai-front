<template>
    <v-dialog
        v-model="dialog"
        width="75%">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="blue lighten-2" dark
                   v-bind="attrs"
                   v-on="on">
                <v-icon class="mr-2">mdi-eye</v-icon>
                Ver problema
            </v-btn>
        </template>

        <v-card>
            <v-card-title class="text-h5 grey lighten-2">
                Ver problema
            </v-card-title>

            <v-card-text class="py-5">
                <v-row>
                    <v-col cols="12">
                        <div class="d-flex align-center justify-space-between">
                            <h4>Datos solicitados</h4>
                        </div>
                    </v-col>

                    <v-col cols="12">
                        <v-row>
                            <v-col cols="12"
                                   v-for="(requestedData, iRequestedData) in requested"
                                   :key="iRequestedData">
                                <v-text-field placeholder="aceleracion, velocidad_final, tiempo, distancia, etc" readonly
                                              :value="requestedData"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols="12">
                        <div class="d-flex align-center justify-space-between">
                            <h4>Datos obtenidos</h4>
                        </div>
                    </v-col>

                    <v-col cols="12">
                        <v-row>
                            <v-col cols="12"
                                   v-for="(data, iData) in data"
                                   :key="iData">
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-text-field placeholder="30, 40, 1.5, etc" readonly
                                                      :label="capitalizeWord(data.name)"
                                                      :value="data.value"></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <v-text-field label="Unidad" placeholder="m/s, km/h, m/s2, s, etc" readonly
                                                      :value="data.unit"></v-text-field>
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
                        </v-row>

                    </v-col>
                </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text
                    @click="dialog = false">
                    Cerrar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "DialogProblem",

    props: {

        problem: {
            type: Object,
            default: () => {
                return {};
            },
        }
    },

    data () {
        return {
            dialog: false,

            // Data of problem
            data: [],
            requested: [],
            resolution: [],
        }
    },

    mounted() {

        const processedData = JSON.parse(this.problem.processed_data);

        this.data = processedData.data;
        this.requested = processedData.requested;
        this.resolution = processedData.resolution;
    },

    methods: {
        capitalizeWord (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        },
    },
}
</script>

<style scoped>

</style>
