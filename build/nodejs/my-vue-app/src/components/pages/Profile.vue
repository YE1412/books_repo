<script setup lang="ts">
import UserForm from '@/components/forms/UserForm'
import TheTitle from '@/components/TheTitle'
import { onBeforeMount, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
defineProps<{
	isDark?: Boolean
}>()

const userId = ref(0)
const breadcrumbsItems = computed(() => [
	{
		title: 'Profile',
		disabled: true
	},
	{
		title: `#${userId.value}`,
		disabled: true
	}
])
const route = useRoute()

onBeforeMount(() => {
	//console.log(route.params)
	//console.log(/^\d+$/.test(route.params.id))
	userId.value = /^\d+$/.test(route.params.id)
		? parseInt(route.params.id)
		: 0
})
</script>

<template>
	<v-container
		class="spacing-playground pa-6">
		<v-row>
			<v-breadcrumbs :items="breadcrumbsItems" divider='>' />
		</v-row>
		<v-row>
			<TheTitle :isDark="isDark" pageTitle="Profile"/>
		</v-row>
		<v-row>
			<v-col class="pa-0"
				cols="12">
				<UserForm :isDark="isDark" :profile="true" :idUser="userId" />
			</v-col>
		</v-row>
	</v-container>
</template>