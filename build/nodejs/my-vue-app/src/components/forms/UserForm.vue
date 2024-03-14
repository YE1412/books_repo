<script setup lang="ts">
import { onBeforeMount, computed, ref, reactive } from 'vue'
import { GetBook, InsertUser } from '@/utils/axios'
import { useUserStore } from '@/stores/user'
import type { BookModel } from '@/utils/types'
import { useRouter } from 'vue-router'

const props = defineProps<{
	idUser?: number
}>()
const usrStore = useUserStore()
const serviceUser: UserModel = ref({ id: 0, name: '', username: '', email: '', password: '', roles: 'Simple user'})
const nameRules = ref([
	val => !!val || 'Name required !',
	val => (val && val.length < 31) || 'Title must be least than 30 characters !'
])
const usernameRules = ref([
	val => !!val || 'Username required !',
	val => (val && val.length < 31) || 'Author must be least than 30 characters !'
])
const emailRules = ref([
	val => !!val || 'Email required !',
	val => val && /.+@.+\..+/.test(val) || 'Email must be valid !'
])
const passwordRules = ref([
	val => !!val || 'Password is required !',
	val => (val && val.length > 7) || 'Password must be more than 8 characters !'
])
const rolesRules = ref([
	val => val.length > 0 || 'Role is required !'
])
const message = ref(null)
const formAction = computed(() => {
	if (props !== undefined && props.idUser > 0){
		return 'update'
	} else {
		return 'insert'
	}
})
const actionButtonText = computed(() => {
	if (props !== undefined && props.idUser > 0){
		return 'Update User'
	} else {
		return 'New User'
	}
})
const actionButtonIcon = computed(() => {
	if (props !== undefined && props.idUser > 0){
		return 'fas fa-user-tag'
	} else {
		return 'fas fa-user-plus'
	}
})
const userForm = ref(false)
const userFormRef = ref<HTMLFormElement>(null)
const rolesItem = ref([
	'Administrator',
	'Simple user'
])
const router = useRouter()
const reset = () => {
	//console.log("clicked !");
	//console.log(loginFormRef);
	userFormRef.value?.reset();
	message.value = null
}
const resetValidation = () => {
	userFormRef.value?.resetValidation();
}
const actions = async (e, action) => {
	console.log(`Action For Submit : ${action}`)
	//console.log(userForm)
	//console.log(userFormRef)
	//console.log(serviceUser.value)
	var res = {}
	var success = false
	var config = {
		headers: {
			'Authorization': `Bearer ${usrStore.user.token}`,
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json;charset=utf-8'
		}
	}
	var roles = []
	var user = {
		name: serviceUser.value.name,
    	username: serviceUser.value.username,
    	email: serviceUser.value.email,
    	password: serviceUser.value.password
	}
	if(serviceUser.value.roles.constructor === Array){
		serviceUser.value.roles.forEach((val, ind) => {
			switch(val){
				case 'Administrator':
					roles.push(1)
					break;
				case 'Simple user':
					roles.push(2)
					break;
				default:
					break;
			}
		})
	} else {
		switch(serviceUser.value.roles){
			case 'Administrator':
				roles.push(1)
				break;
			case 'Simple user':
				roles.push(2)
				break;
			default:
				break;
		}
	}
	user.roles = roles
	//console.log(user)
	if (action === 'insert') {
		user.id = null
		try {
			res = await InsertUser(user, config)
			if (res.data.code === 0)
				success = true
			else
				success = false
		} catch(err) {
			console.log(err)
			message.value = err.message !== undefined ? err.message : null
		} finally {
			if (success){
				//console.log(res);
				router.push({path: '/books/home', query: {message: res.data.message}})
			} else {
				message.value = res.data.message
			}
		}
	}
}

onBeforeMount(async() => {
})
</script>

<template>
	<v-sheet class="my-4 mx-auto" v-if="message" width="300">
		<div class="bg-red-darken-2 text-center"><span>{{ message }}</span></div>
	</v-sheet>
	<v-sheet class="mx-auto" width="300">
		<v-form 
			@submit.prevent="actions($event, formAction)" 
			v-model="userForm"
			ref="userFormRef">
			<v-text-field
				v-model="serviceUser.id"
				label="Id"
				placeholder=""
				prepend-inner-icon="fas fa-hashtag"
				disabled>
			</v-text-field>
			<v-text-field
				v-model="serviceUser.name"
				:counter="30"
				:rules="nameRules"
				label="Name"
				placeholder="Mickaël"
				required
				type="text"
				prepend-inner-icon="fas fa-signature">
			</v-text-field>
			<v-text-field
				v-model="serviceUser.username"
				:counter="30"
				:rules="usernameRules"
				hint="At least 30 characters !"
				type="text"
				label="Username"
				placeholder="Mika"
				required
				prepend-inner-icon="fas fa-user">
			</v-text-field>
			<v-text-field
				v-model="serviceUser.email"
				:rules="emailRules"
				type="email"
				label="Email"
				placeholder="mika@gmail.com"
				required
				prepend-inner-icon="fas fa-envelope">
			</v-text-field>
			<v-text-field
				v-model="serviceUser.password"
				:rules="passwordRules"
				type="password"
				label="Password"
				required
				prepend-inner-icon="fas fa-eye-slash">
			</v-text-field>
			<!-- <v-autocomplete
				ref="roles"
				v-model="serviceUser.roles"
				:items="rolesItem"
				:rules="rolesRules"
				label="User role(s)"
				placeholder="Select..."
				required
				prepend-inner-icon="fas fa-eye-slash">
			</v-autocomplete> -->
			<v-select
		      v-model="serviceUser.roles"
		      :rules="rolesRules"
		      :items="rolesItem"
		      hint="Pick at least one role"
		      label="Select..."
		      placeholder="Roles"
		      required
		      multiple
		    ></v-select>
			<v-btn :prepend-icon="actionButtonIcon" 
				class="mt-2" 
				type="submit"
				:disabled="!userForm" 
				block>{{actionButtonText}}
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