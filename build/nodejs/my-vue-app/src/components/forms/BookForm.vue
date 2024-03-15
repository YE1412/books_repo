<script setup lang="ts">
import { onBeforeMount, computed, ref, reactive } from 'vue'
import { GetBook, InsertBook, UpdateBook } from '@/utils/axios'
import { useUserStore } from '@/stores/user'
import type { BookModel } from '@/utils/types'
import { useRouter } from 'vue-router'
import TheDialog from '@/components/TheDialog'

const props = defineProps<{
	idBook?: number,
	isDark?: boolean
}>()
const usrStore = useUserStore()
const serviceBook: BookModel = ref({ id: 0, title: '', author: '', isbn: '', pagesNum: 0})
const titleRules = ref([
	val => !!val || 'Title required !',
	val => (val && val.length < 51) || 'Title must be least than 50 characters !'
])
const authorRules = ref([
	val => !!val || 'Author required !',
	val => (val && val.length < 31) || 'Author must be least than 50 characters !'
])
const isbnRules = ref([
	val => !!val || 'ISBN required !',
	val => (val && (val.length < 14 && val.length > 12)) || 'ISBN must be 13 characters !',
	val => /^\d+$/.test(val) || 'ISBN must contains only digits !'
])
const pagesNumRules = ref([
	val => !!val || 'Page numbers is required !',
	val => /^\d+$/.test(val) || 'Page numbers must contains only digits !',
	val => (val && parseInt(val) > 0) || 'Page numbers must be greather than 0 !'
])
const message = ref(null)
const formAction = computed(() => {
	if (props !== undefined && props.idBook > 0){
		return 'update'
	} else {
		return 'insert'
	}
})
const actionButtonText = computed(() => {
	if (props !== undefined && props.idBook > 0){
		return 'Update Book'
	} else {
		return 'New Book'
	}
})
const actionButtonIcon = computed(() => {
	if (props !== undefined && props.idBook > 0){
		return 'fas fa-pen-nib'
	} else {
		return 'fas fa-book-medical'
	}
})
const bookForm = ref(false)
const bookFormRef = ref<HTMLFormElement>(null)
const router = useRouter()
const dialogText = computed(() => {
	if (props !== undefined && props.idBook > 0){
		return 'Are you sure to update the book ?'
	} else {
		return 'Are you sure to insert the book ?'
	}
})
const reset = () => {
	//console.log("clicked !");
	//console.log(loginFormRef);
	bookFormRef.value?.reset();
	message.value = null
}
const resetValidation = () => {
	bookFormRef.value?.resetValidation();
}
const actions = async (e, action) => {
	//console.log(`Action For Submit : ${action}`)
	var res = {}
	var success = false
	var config = {
		headers: {
			'Authorization': `Bearer ${usrStore.user.token}`,
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json;charset=utf-8'
		}
	}
	//console.log(serviceBook);
	serviceBook.value.pagesNum = parseInt(serviceBook.value.pagesNum)
	if (action === 'insert') {
		serviceBook.value.id = null
		try {
			res = await InsertBook(serviceBook.value, config)
			success = true
		} catch(err) {
			console.log(err)
		} finally {
			if (success){
				//console.log(res);
				router.push({path: '/books/home', query: {message: 'Book added successfully !'}})
			}
		}
	} else if(action === 'update') {
		try {
			res = await UpdateBook(serviceBook.value.id, serviceBook.value, config)
			success = true
		} catch(err) {
			console.log(err)
		} finally {
			if (success){
				//console.log(res);
				router.push({path: '/books/home', query: {message: 'Book updated successfully !'}})
			}
		}
	}
}

onBeforeMount(async() => {
	//console.log('Component props')
	//console.log(props)
	//console.log(props.idBook)
	if (props !== undefined && props.idBook > 0){
		var success = false
		var res = {}
		try{
			res = await GetBook(props.idBook, {headers: {
					'Authorization': `Bearer ${usrStore.user.token}`,
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json;charset=utf-8'
			}})
			success = true
		} catch(err) {
			console.log(err)
		} finally {
			if (success){
				//console.log(res)
				serviceBook.value = res.data
				//console.log(serviceBook)
			}
		}
	}
})
</script>

<template>
	<v-sheet class="my-4 mx-auto" v-if="message" width="300" :theme="isDark ? 'dark' : 'light'">
		<div class="bg-red-darken-2 text-center"><span>{{ message }}</span></div>
	</v-sheet>
	<v-sheet class="mx-auto" width="300" :theme="isDark ? 'dark' : 'light'">
		<v-form 
			v-model="bookForm"
			ref="bookFormRef">
			<v-text-field
				v-model="serviceBook.id"
				label="Id"
				placeholder=""
				prepend-inner-icon="fas fa-hashtag"
				disabled>
			</v-text-field>
			<v-text-field
				v-model="serviceBook.title"
				:counter="50"
				:rules="titleRules"
				label="Book Title"
				placeholder="Macbeth"
				required
				prepend-inner-icon="fas fa-heading">
			</v-text-field>
			<v-text-field
				v-model="serviceBook.author"
				:counter="30"
				:rules="authorRules"
				hint="At least 30 characters !"
				type="text"
				label="Author"
				placeholder="W. Shakespeare"
				required
				prepend-inner-icon="fas fa-at">
			</v-text-field>
			<v-text-field
				v-model="serviceBook.isbn"
				:counter="13"
				:rules="isbnRules"
				hint="At least 13 characters !"
				type="text"
				label="Isbn"
				placeholder="1535..."
				required
				prepend-inner-icon="fas fa-barcode">
			</v-text-field>
			<v-text-field
				v-model="serviceBook.pagesNum"
				:rules="pagesNumRules"
				type="number"
				label="Pages Number"
				placeholder="150"
				required
				prepend-inner-icon="fas fa-book-open">
			</v-text-field>
			<v-btn :prepend-icon="actionButtonIcon" 
				class="mt-2"
				:disabled="!bookForm" 
				block>
					{{actionButtonText}}
					<TheDialog
					:text="dialogText"
					:actionParent="actions"
					:formParams="formAction" />
			</v-btn>
			<v-btn class="mt-4" 
				color="error" 
				block 
				@click="reset" prepend-icon="fas fa-arrow-left">Reset
			</v-btn>
			<v-btn class="mt-4" 
				color="warning" 
				block 
				@click="resetValidation" prepend-icon="fas fa-arrow-left">Reset Validation
			</v-btn>
		</v-form>
	</v-sheet>	
</template>