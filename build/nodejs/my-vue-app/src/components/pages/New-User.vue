<script setup lang="ts">
import UserForm from '@/components/forms/UserForm'
import TheTitle from '@/components/TheTitle'

const breadcrumbsItems = [
	{
		title: 'Users',
		disabled: true
	},
	{
		title: 'New User',
		disabled: true,
		href: '/users/new'
	}
]
</script>

<template>
	<v-container
		class="spacing-playground pa-6">
		<v-row>
			<v-breadcrumbs :items="breadcrumbsItems" divider='>' />
		</v-row>
		<v-row>
			<TheTitle pageTitle="Insert User"/>
		</v-row>
		<v-row>
			<v-col class="pa-0"
				cols="12">
				<UserForm />
			</v-col>
		</v-row>
	</v-container>
</template>