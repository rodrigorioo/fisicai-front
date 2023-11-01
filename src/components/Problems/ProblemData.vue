<script>
export default {
    name: "ProblemData",
    
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        requested: {
            type: Array,
            default: () => [],
        },
    },
    
    data: () => ({
        dialog_add_data: "",
        add_data: "",
    }),
    
    methods: {
        
        addData () {
            
            this.$emit('addData', this.add_data);
            
            this.dialog_add_data = false;
            this.add_data = "";
        },
        
        capitalizeWord (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        },
    }
}
</script>

<template>
    <v-row>
        
        <v-col cols="12">
            
            <div class="d-flex align-center justify-space-between">
                <h4>Datos solicitados</h4>
                
                <v-btn class="mx-2" fab dark small color="success"
                       @click="() => $emit('addRequestedData')">
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
                                  @change.native="() => $emit('modifyRequestedData', iRequestedData, $event.target.value)"
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
                                          @change.native="() => $emit('modifyData', iData, 'value', $event.target.value)"
                                          :label="capitalizeWord(data.name)"
                                          :value="data.value"></v-text-field>
                        </v-col>
                        
                        <v-col cols="12" sm="5">
                            <v-text-field label="Unidad" placeholder="m/s, km/h, m/s2, s, etc"
                                          @change.native="() => $emit('modifyData', iData, 'unit', $event.target.value)"
                                          :value="data.unit"></v-text-field>
                        </v-col>
                        
                        <v-col cols="12" sm="2">
                            <v-btn class="mx-2" fab dark small color="red"
                                   @click="() => $emit('deleteData', iData)">
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