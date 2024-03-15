<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, onBeforeMount } from 'vue'
import TheTitle from '@/components/TheTitle'
import TheTable from '@/components/TheTable'
defineProps<{
	isDark?: Boolean
}>()
const breadcrumbsItems = [
	{
		title: 'Books',
		disabled: true,
		href: '#/books/home'
	},
	{
		title: 'List',
		disabled: true,
		href: '#/books/home'
	}
]
const message = ref(null)
const route = useRoute()
const snackbar = ref(false)

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
			<v-breadcrumbs :items="breadcrumbsItems" divider='>' />
		</v-row>
		<!-- <v-sheet class="my-4 mx-auto" v-if="message" width="300">
			<div class="bg-red-darken-2 text-center"><span>{{ message }}</span></div>
		</v-sheet> -->
		<v-row>
			<TheTitle :isDark="isDark" pageTitle="Book List"/>
		</v-row>
		<v-row>
			<v-col class="pa-0"
				cols="12">
				<TheTable :isDark="isDark" />
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
