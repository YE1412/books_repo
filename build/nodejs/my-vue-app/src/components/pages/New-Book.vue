<script setup lang="ts">
import BookForm from '@/components/forms/BookForm'
import TheTitle from '@/components/TheTitle'
defineProps<{
	isDark?: Boolean
}>()

const breadcrumbsItems = [
	{
		title: 'Books',
		disabled: false,
		href: '#/books/home'
	},
	{
		title: 'New Book',
		disabled: true,
		href: '#/books/new'
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
			<TheTitle :isDark="isDark" pageTitle="Insert Book"/>
		</v-row>
		<v-row>
			<v-col class="pa-0"
				cols="12">
				<BookForm :isDark="isDark" :id-book="0"/>
			</v-col>
		</v-row>
	</v-container>
</template>