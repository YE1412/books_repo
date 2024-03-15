<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed, ref, onBeforeMount } from 'vue'
import { GetBooks, DeleteBook } from '@/utils/axios'
import TheDialog from '@/components/TheDialog'

defineProps<{
	isDark?: Boolean
}>()
const usrStore = useUserStore();
const columns = computed(() => {
	var ret = [{
		key: 'id',
		value: '#'
	},
	{
		key: 'title',
		value: 'Title'
	},
	{
		key: 'author',
		value: 'Author'
	},
	{
		key: 'isbn',
		value: 'ISBN'
	},
	{
		key: 'pagesNum',
		value: 'Pages Number'
	}]
	if (usrStore.isAdmin){
		ret.push({
			key: 'actions',
			value: 'Actions'
		})
	} 
	return ret
})
const books = ref([])
const deleteBook = async (e, id) => {
	try {
		const res = await DeleteBook(id, {
			headers: { 
				'Authorization': `Bearer ${usrStore.user.token}`,
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json;charset=utf-8'
			}
		})
	} catch (err) {
		console.log(err)
	} finally {
		await fetchBooks()
	}
}
const colSpan = computed(() => {
	var ret = 5
	if (usrStore.isAdmin){
		ret = 6
	}
	return ret
})
const fetchBooks = async() => {
	var res = []
	var success = false
	try {
		res = await GetBooks({
			headers: { 
				'Authorization': `Bearer ${usrStore.user.token}`,
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json;charset=utf-8'
			}
		})
		success = true
	}
	catch(err) {
		console.log(err)
	}
	finally {
		if (success) {
			//console.log(res)
			books.value = res.data
		}
	}
}
onBeforeMount(async () => {
	//console.log(localStorage)
	await fetchBooks()
})
</script>

<template>
	<v-table :theme="isDark ? 'dark' : 'light'">
		<thead>
			<tr>
				<th v-for="column in columns"
					:key="column.key"
					class="text-left">
					{{ column.value }}		
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="book in books"
				:key="book.id">
				<td>{{ book.id }}</td>
				<td>{{ book.title }}</td>
				<td>{{ book.author }}</td>
				<td>{{ book.isbn }}</td>
				<td>{{ book.pagesNum }}</td>
				<td v-if="usrStore.isAdmin">
					<v-btn class="text-button" 
						prepend-icon="fas fa-pen-to-square" color="primary">
						<router-link :to="'/books/' + book.id"
							class="text-indigo-lighten-5">Update</router-link>
		      		</v-btn> | <v-btn 
		      			class="text-button"
		      			prepend-icon="fas fa-trash"
		      			color="error">
		      			Delete
		      			<TheDialog
							text="Are you sure to delete this book ?"
							:actionParent="deleteBook"
							:formParams="book.id" />
		      		</v-btn>
		      	</td>
			</tr>
			<tr v-if="books.length === 0">
				<td class="text-center" :colspan="colSpan">Unable to find books !</td>
			</tr>
		</tbody>
	</v-table>
</template>