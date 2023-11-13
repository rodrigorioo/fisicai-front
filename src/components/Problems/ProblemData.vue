<script>
export default {
    name: "ProblemData",
    
    data: () => ({
        dialog_add_data: "",
        add_data: "",
        
        // Requested data for selection
        problemData: {
            // MRU
            'distancia': ['posicion_inicial', 'velocidad', 'tiempo'],
            'velocidad': ['distancia', 'posicion_inicial', 'tiempo', /* MRUV */ 'velocidad_inicial', 'aceleracion'],
            'tiempo': ['distancia', 'posicion_inicial', 'velocidad', /* MRUV */ 'velocidad_inicial', 'aceleracion'],
            'posicion_inicial': [],
            'hora': ['tiempo'],
            'rapidez': ['distancia', 'posicion_inicial', 'tiempo', /* MRUV */ 'velocidad_inicial', 'aceleracion'],
            
            // MRUV
            'velocidad_inicial': [],
            'velocidad_final': ['velocidad_inicial', 'aceleracion', 'tiempo'],
            'tiempo_inicial': [],
            'tiempo_final': [],
            'posicion_final': ['posicion_inicial', 'velocidad_inicial', 'tiempo', 'aceleracion'],
            'posicion': ['posicion_inicial', 'velocidad_inicial', 'tiempo', 'aceleracion'],
            'aceleracion': ['velocidad', 'velocidad_inicial', 'tiempo', 'tiempo_inicial'],
        },
        unitsData: {
            aceleracion: ['m/s2', 'km/s2', 'km/h2'],
            
            velocidad: ['m/s', 'km/s', 'km/h'],
            velocidad_inicial: ['m/s', 'km/s', 'km/h'],
            velocidad_final: ['m/s', 'km/s', 'km/h'],
            
            posicion: ['km', 'm', 'cm'],
            posicion_inicial: ['km', 'm', 'cm'],
            posicion_final: ['km', 'm', 'cm'],
            
            distancia: ['km', 'm', 'cm'],
            
            tiempo: ['min', 's', 'h'],
            tiempo_inicial: ['min', 's', 'h'],
            tiempo_final: ['min', 's', 'h'],
        },
    }),
    
    methods: {
        
        addData () {
            
            this.$store.commit('addData', this.add_data);
            
            this.dialog_add_data = false;
            this.add_data = "";
        },
        
        capitalizeWord (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        },
        
        getUnit (dataName) {
            return this.unitsData[dataName];
        },
        
        selectRequestedData (iRequestedData, value) {
            
            const data = this.problemData[value].reduce( (acc, elem) => {
                
                acc.push({
                    name: elem,
                    unit: this.getUnit(elem),
                    value: "",
                });
                
                return acc;
            }, []);
            
            this.$store.commit('data', data);
            
            this.$store.commit('modifyRequestedData', {
                iRequestedData,
                value,
            })
        },
        
        changeUnitData (value, iData) {
            
            this.$store.commit('modifyData', {
                iData,
                type: 'unit',
                value,
            });
            
        }
    },
    
    computed: {
        data () {
            return this.$store.getters.data;
        },
        requested () {
            return this.$store.getters.requested;
        },
        
        requestedDataOptions () {
            return Object.keys(this.problemData);
        },
        availableDataToAdd () {
            
            return this.requested.reduce( (acc, elem) => { // Get all data from requested data
                
                acc = acc.concat(this.problemData[elem]);
                
                return acc;
            }, [])
                
                // Remove elements that are present in data
                .filter( (elem) => {
                    
                    return !this.data.some( (elData) => {
                        return elData.name === elem;
                    });
                    
                });
        }
    },
}
</script>

<template>
    <v-row>
        
        <v-col cols="12">
            
            <div class="d-flex align-center justify-space-between">
                <h4>Datos solicitados</h4>
                
                <v-btn class="mx-2" fab dark small color="success"
                       @click="$store.commit('addRequestedData')"
                        
                        v-if="requested.length === 0">
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>
            </div>
        
        </v-col>
        
        <v-col cols="12">
            <v-row>
                <v-col cols="12"
                       v-for="(requestedData, iRequestedData) in requested"
                       :key="iRequestedData">
                    
                    <v-select label="Seleccione un dato"
                              :value="requestedData"
                              :items="requestedDataOptions"
                                
                              @change="(val) => selectRequestedData(iRequestedData, val)"></v-select>
                </v-col>
            </v-row>
        </v-col>
        
        
        <v-col cols="12">
            <div class="d-flex align-center justify-space-between">
                <h4>Datos obtenidos</h4>
                
                <v-dialog width="500"
                          v-model="dialog_add_data"
                
                    v-if="availableDataToAdd.length !== 0">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="mx-2" fab dark small color="success"
                               v-bind="attrs"
                               v-on="on">
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    
                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                            Agregar dato obtenido
                        </v-card-title>
                        
                        <v-card-text>
                            
                            <v-container fluid>
                                <v-row>
                                    <v-col cols="12">
                                        <v-select label="Selecciona un dato"
                                                  :items="availableDataToAdd"
                                                  v-model="add_data"></v-select>
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
                                          @change.native="() => $store.commit('modifyData', {
                                              iData,
                                              type: 'value',
                                              value: $event.target.value
                                          })"
                                          :label="capitalizeWord(data.name)"
                                          :value="data.value"></v-text-field>
                        </v-col>
                        
                        <v-col cols="12" sm="5">
                            <v-select label="Selecciona una unidad"
                                      :items="unitsData[data.name]"
                                      :value="data.unit"
                                      @change="(val) => changeUnitData(val, iData)"></v-select>
                        </v-col>
                        
                        <v-col cols="12" sm="2">
                            <v-btn class="mx-2" fab dark small color="red"
                                   @click="() => $store.commit('deleteData', iData)">
                                <v-icon dark>mdi-delete</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<style scoped>

</style>