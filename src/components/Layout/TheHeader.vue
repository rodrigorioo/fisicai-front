<template>
    <div>
        <v-app-bar color="primary" app dark>

            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <div class="d-flex align-center">
                <!-- LOGO -->
            </div>

            <v-spacer></v-spacer>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            absolute
            bottom
            temporary>
            <v-list
                nav
                dense>
                <v-list-item-group
                    v-model="group"
                    active-class="deep-purple--text text--accent-4">
                    <v-list-item href="/">
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Inicio</v-list-item-title>
                    </v-list-item>
                    <v-list-item href="/mis-problemas">
                        <v-list-item-icon>
                            <v-icon>mdi-table</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Mis problemas</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="logout">
                        <v-list-item-icon>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>

import {authMixin} from "@/mixins/auth.mixin";

export default {
    name: "TheHeader",
    
    mixins: [authMixin],

    data: () => ({
        drawer: false,
        group: null,
    }),

    methods: {

        logout () {
            this._auth_logout();
            this.$router.push({ name: 'login' });
        },
    },

    watch: {
        group () {
            this.drawer = false
        },
    },
}
</script>

<style scoped>

</style>
