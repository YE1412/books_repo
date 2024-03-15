<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, watch, onBeforeMount } from 'vue'
import TheTitle from '@/components/TheTitle'
import BookForm from '@/components/forms/BookForm'
defineProps<{
	isDark?: Boolean
}>()

const route = useRoute();
const breadcrumbsItems = [
	{
		title: 'Books',
		disabled: false,
		href: '#/books/home'
	},
	{
		title: 'Update Book',
		disabled: true,
		href: '#/books/:id'
	}
]
const bookId = ref(0)

watch(route, async (to, from)=> {
	//console.log(route.params)
})
onBeforeMount(() => {
	//console.log(route.params)
	//console.log(/^\d+$/.test(route.params.id))
	bookId.value = /^\d+$/.test(route.params.id)
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
			<TheTitle :isDark="isDark" :pageTitle="'Update Book #'+bookId"/>
		</v-row>
		<v-row>
			<v-col class="pa-0"
				cols="12">
				<BookForm :isDark="isDark" :id-book="bookId"/>
			</v-col>
		</v-row>
	</v-container>
</template>