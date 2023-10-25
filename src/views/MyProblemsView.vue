<template>
    <v-app>
        <TheHeader />

        <v-main>
            <v-row>
                <v-col cols="12">
                    <h1 class="display-2 font-weight-bold mb-3 mt-3 text-center">Mis problemas</h1>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12"

                       v-if="showErrorMessage && errorMessage !== ''">
                    <v-alert v-model="showErrorMessage" border="left" close-text="Cerrar" dark dismissible type="error">
                        {{ errorMessage }}
                    </v-alert>

                </v-col>

                <v-col cols="12">
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-left">Problema</th>
                                <th class="text-left">Resuelto</th>
                                <th class="text-left">Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="problem in problems"
                                :key="problem.id">
                                <td>{{ problem.problem }}</td>
                                <td>
                                    <v-chip color="success"
                                        v-if="problem.processed_data">
                                        <v-icon>
                                            mdi-check
                                        </v-icon>
                                    </v-chip>
                                    <v-chip color="danger"
                                             v-else>
                                        <v-icon>
                                            mdi-close
                                        </v-icon>
                                    </v-chip>
                                </td>
                                <td>
                                    <DialogProblem
                                        :problem="problem" />
                                </td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>

                </v-col>
            </v-row>
        </v-main>
    </v-app>

</template>

<script>

import TheHeader from "@/components/Layout/TheHeader.vue";
import DialogProblem from "@/components/Problems/DialogProblem.vue";

export default {
    name: "MyProblemsView",

    components: {
        DialogProblem,
        TheHeader
    },

    data () {
        return {
            problems: [],

            showErrorMessage: false,
            errorMessage: "",
        }
    },

    methods: {

        getProblemsOfUser() {

            this.$axios.get(`${process.env.VUE_APP_API_URL}problems`).then( (response) => {

                this.problems = response.data;

            }).catch( (errResponse) => {

                // Show error
                this.errorMessage = errResponse.response.data.message;

            }).finally( () => {



            });
        },
    },

    mounted() {

        this.getProblemsOfUser();

    },
}
</script>

<style scoped>

</style>
