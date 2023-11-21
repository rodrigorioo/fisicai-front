<script>
export default {
    name: "ResolutionComponent",
    
    props: {
        buttonDisabled: {
            type: Boolean,
            default: false,
        }
    },
    
    methods: {
        capitalizeWord (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        },
        
        changeUnitResolution (value, iResolution) {
            
            const actualResolution = this.resolution[iResolution];
            let newValue = actualResolution.value;
            
            switch(value) {
                
                case 'min': // Si lo queremos convertir a minutos
                    
                    switch(actualResolution.unit) {
                        case 'h': newValue = newValue * 60; break;
                        case 's': newValue = newValue / 60; break;
                    }
                    
                    break;
                    
                case 'h':
                    
                    switch(actualResolution.unit) {
                        case 'min': newValue = newValue / 60; break;
                        case 's': newValue = newValue / 3600; break;
                    }
                    
                    break;
                    
                case 's':
                    
                    switch(actualResolution.unit) {
                        case 'h': newValue = newValue * 3600; break;
                        case 'min': newValue = newValue * 60; break;
                    }
                    
                    break;
                    
                case 'km':
                    
                    switch(actualResolution.unit) {
                        case 'm': newValue = newValue / 1000; break;
                        case 'cm': newValue = newValue / 100000; break;
                    }
                    
                    break;
                    
                case 'm':
                    
                    switch(actualResolution.unit) {
                        case 'km': newValue = newValue * 1000; break;
                        case 'cm': newValue = newValue / 100; break;
                    }
                    
                    break;
                    
                case 'cm':
                    
                    switch(actualResolution.unit) {
                        case 'km': newValue = newValue * 100000; break;
                        case 'm': newValue = newValue * 100; break;
                    }
                    
                    break;
                
                case 'm/s':
                    
                    switch(actualResolution.unit) {
                        case 'km/s': newValue = newValue / 1000; break;
                        case 'km/h': newValue = newValue / 3.6; break;
                    }
                    
                    break;
                
                case 'km/s':
                    
                    switch(actualResolution.unit) {
                        case 'm/s': newValue = newValue * 1000; break;
                        case 'km/h': newValue = newValue / 3600; break;
                    }
                    
                    break;
                
                case 'km/h':
                    
                    switch(actualResolution.unit) {
                        case 'm/s': newValue = newValue * 3.6; break;
                        case 'km/s': newValue = newValue * 3600; break;
                    }
                    
                    break;
            }
            
            this.$store.commit('modifyResolution', {
                iResolution,
                type: 'unit',
                value,
            });
            
            this.$store.commit('modifyResolution', {
                iResolution,
                type: 'value',
                value: newValue,
            });
        },
    },
    
    computed: {
        resolution () {
            return this.$store.getters.resolution;
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
    }
}
</script>

<template>
    <v-row>
        <v-col cols="12">
            <v-list dense>
                <v-subheader>Solución de los datos solicitados</v-subheader>
                <v-list-item-group color="primary">
                    <v-list-item active-class=""
                                 v-for="(resolutionData, iResolutionData) in resolution"
                                 :key="iResolutionData">
                        <v-list-item-content>
<!--                            <v-list-item-title>-->
<!--                                {{ capitalizeWord(resolutionData.name) }}: {{ resolutionData.value }} {{ resolutionData.unit }}-->
<!--                            </v-list-item-title>-->
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-text-field placeholder="30, 40, 1.5, etc" readonly
                                                      :label="capitalizeWord(resolutionData.name)"
                                                      :value="resolutionData.value"></v-text-field>
                                    </v-col>
                                    
                                    <v-col cols="12" sm="6">
                                        <v-select label="Selecciona una unidad"
                                                  :items="unitsData[resolutionData.name]"
                                                  :value="resolutionData.unit"
                                                  @change="(val) => changeUnitResolution(val, iResolutionData)"></v-select>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-col>
        
        <v-col cols="12">
            <v-alert border="bottom" colored-border type="warning" elevation="2">
                La solución de los datos solicitados se pueden llegar a mostrar con una unidad distinta a la solicitada
            </v-alert>
        </v-col>
        
        <v-col cols="12">
            <v-btn elevation="2" color="success" dark large
                   :disabled="buttonDisabled"
                   @click="() => $emit('resolveProblem')">
                RESOLVER CON DATOS
                <v-icon right dark>mdi-send</v-icon>
            </v-btn>
        </v-col>
    </v-row>
</template>

<style scoped>

</style>