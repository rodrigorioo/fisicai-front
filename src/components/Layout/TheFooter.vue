<template>
    <v-footer padless>
        <v-card flat tile width="100%" class="primary lighten-1 text-center">
            
            <v-divider></v-divider>
            
            <v-card-text class="white--text">
                {{ new Date().getFullYear() }} — <strong>FisicAI</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
export default {
    name: "TheFooter",
}
</script>

<style scoped>

</style>