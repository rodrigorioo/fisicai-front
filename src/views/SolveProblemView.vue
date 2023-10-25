<template>
    <v-app>
        <TheHeader />

        <v-main>
            <Problem />
        </v-main>
    </v-app>
</template>

<script>

import TheHeader from "@/components/Layout/TheHeader.vue";
import Problem from "@/components/Problems/Problem.vue";

export default {
    name: 'SolveproblemView',

    components: {
        TheHeader,
        Problem,
    },


};
</script>
