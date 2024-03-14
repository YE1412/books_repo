<script setup lang="ts">
//import LoginForm from '@/components/forms/LoginForm'
import { useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import TheTitle from '@/components/TheTitle'
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
</script>

<template>
  <v-container
    class="spacing-playground pa-6">
    <v-row>
      <TheTitle pageTitle="Home page"/>
    </v-row>
    <v-row>
      <v-col class="pa-0"
        cols="12">
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>
