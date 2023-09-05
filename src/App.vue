<template>
  <v-app>
      <TheHeader />
      
      <v-main>
          <v-row>
              <v-col cols="12">
                  <h1 class="display-2 font-weight-bold mb-3 mt-3 text-center">Home</h1>
              </v-col>
          </v-row>
      </v-main>
      
      <TheFooter />
  </v-app>
</template>

<script>
import TheHeader from "@/components/Layout/TheHeader.vue";
import TheFooter from "@/components/Layout/TheFooter.vue";

export default {
  name: 'App',

  components: {
      TheFooter,
      TheHeader,
  },

  data: () => ({
    //
  }),
};
</script>
