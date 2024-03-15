<script setup lang="ts">
//import LoginForm from '@/components/forms/LoginForm'
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, onBeforeMount } from 'vue'
import TheTitle from '@/components/TheTitle'
defineProps<{
  isDark?: Boolean
}>()
/*export default {
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username
    },
  },
  methods: {
    goToDashboard() {
      if (isAuthenticated) {
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/login')
      }
    },
  },
}*/
const message = ref(null)
const snackbar = ref(false)
const route = useRoute()

onBeforeMount(() => {
  //console.log(route.query)
  message.value = route.query !== undefined && route.query.message ? route.query.message : null
  snackbar.value = route.query !== undefined && route.query.message ? true : false;
})
</script>

<template>
  <v-container
    class="spacing-playground pa-6">
    <v-row>
      <TheTitle :isDark="isDark" pageTitle="Home page"/>
    </v-row>
    <v-row>
      <v-col class="pa-0"
        cols="12">
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar :timeout="2000"
    color="light-green-darken-3"
    elevation="24"
    v-model="snackbar">
    {{ message }}
    <template v-slot:actions>
          <v-btn
            color="light-green-lighten-5"
            variant="text"
            @click="snackbar = false"
          >
            Close
          </v-btn>
      </template>
  </v-snackbar>
</template>

<style scoped>
</style>
