<script>
export default {
    name: "ProblemData",
    
    data: () => ({
        dialog_add_data: "",
        add_data: "",
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
        },
        
        getLabelForData(data) {
          
            const dataFind = this.requestedDataOptions.find( (el) => {
                return el.key === data.name;
            });
            
            return this.capitalizeWord(dataFind.name);
        },
    },
    
    computed: {
        data () {
            return this.$store.getters.data;
        },
        requested () {
            return this.$store.getters.requested;
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
        },
        
        requestedDataOptions () {
            return this.$store.getters.requestedDataOptions;
        },
        problemData () {
            return this.$store.getters.problemData;
        },
        unitsData () {
            return this.$store.getters.unitsData;
        },
    },
}
</script>

<template>
    <div>
        <v-card class="mx-auto">
            
            <v-card-title>
                <div class="d-flex align-center justify-space-between" style="width: 100%">
                    <h4>Datos solicitados</h4>
                    
                    <v-btn class="mx-2" fab dark small color="success"
                           @click="$store.commit('addRequestedData')"
                           
                           v-if="requested.length === 0">
                        <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                </div>
            </v-card-title>
            
            <v-card-text>
                
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="12"
                                   v-for="(requestedData, iRequestedData) in requested"
                                   :key="iRequestedData">
                                
                                <v-autocomplete label="Seleccione un dato" item-value="key" item-text="name"
                                                :value="requestedData"
                                                :items="requestedDataOptions"
                                                
                                                @change="(val) => selectRequestedData(iRequestedData, val)"></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        
        <v-card class="mx-auto mt-5">
            
            <v-card-title>
                <div class="d-flex align-center justify-space-between" style="width: 100%">
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
            </v-card-title>
            
            <v-card-text>
                
                <v-row>
                    
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
                                                      :label="getLabelForData(data)"
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
            </v-card-text>
        </v-card>
    </div>
    
    
</template>

<style scoped>

</style>