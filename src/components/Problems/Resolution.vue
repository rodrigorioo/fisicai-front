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
    },
    
    computed: {
        resolution () {
            return this.$store.getters.resolution;
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