<script setup lang="ts">
import LoginForm from '@/components/forms/LoginForm'
import { useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import TheTitle from '@/components/TheTitle'
/*const emit = defineEmits<{
	  (e: 'user-detail-child'): void
}>();*/
const props = defineProps<{
	isDark?: boolean
}>()
//const user = defineModel()
//console.log(user)
//import 
</script>

<template>
	<v-container
		class="spacing-playground pa-6">
		<v-row>
			<TheTitle :isDark="props.isDark" pageTitle="Login page"/>
		</v-row>
		<v-row>
			<v-col class="pa-0"
				cols="12">
				<LoginForm :isDark="props.isDark"/>
			</v-col>
		</v-row>
	</v-container>
</template>

<style scoped>
</style>
