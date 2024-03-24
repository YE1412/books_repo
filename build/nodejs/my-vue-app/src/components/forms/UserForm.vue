<script setup lang="ts">
import { onBeforeMount, computed, ref, reactive } from 'vue'
import { GetUser, InsertUser, UpdateUser, UpdateUserRoles, DeleteUser } from '@/utils/axios'
import { useUserStore } from '@/stores/user'
import type { BookModel } from '@/utils/types'
import { useRouter } from 'vue-router'
import TheDialog from '@/components/TheDialog'

const props = defineProps<{
	idUser?: number,
	profile: boolean | null,
	isDark?: boolean
}>()
const usrStore = useUserStore()
const serviceUser: UserModel = ref({ id: 0, name: '', username: '', email: '', password: '', roles: '2'})
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
		if (props.profile)
			return 'profile'
		else
			return 'update'
	} else {
		return 'insert'
	}
})
const actionButtonText = computed(() => {
	if (props !== undefined && props.idUser > 0){
		if (props.profile !== null && props.profile)
			return 'Update Profile'
		else
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
const rolesItem = ref([{
		title: 'Administrator',
		value: '1'
	},
	{
		title: 'Simple user',
		value: '2'
	}])
const router = useRouter()
const config = computed(() => {
	return usrStore.user 
	? {
		headers: {
			'Authorization': `Bearer ${usrStore.user.token}`,
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json;charset=utf-8'
		}
	} : {
		headers: {
			'Authorization': 'Not Logged !',
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json;charset=utf-8'
		}
	}
})
const dialog = ref(false)
const dialogText = computed(() => {
	if (props !== undefined && props.idUser > 0){
		if (props.profile !== null && props.profile)
			return 'Are you sure to update your profile !'
		else
			return 'Are you sure to update the user !'
	} else {
		return 'Are you sure to create a new account !'
	}
})
const reset = () => {
	//console.log("clicked !");
	//console.log(loginFormRef);
	userFormRef.value?.reset();
	message.value = null
}
const deleteUser = async (e, id) => {
	//console.log(`Delete user with id '${id}' click !`)
	var success = false
	try {
		await DeleteUser(id, config.value)
		success = true
	} catch(err) {
		console.log(err)
		message.value = err.message !== undefined ? err.message : null
	} finally {
		if (success){
			usrStore.resetUser()
			router.push("/login")
		}
	}
}
const resetValidation = () => {
	userFormRef.value?.resetValidation();
}
const actions = async (e, action) => {
	//console.log(`Action For Submit : ${action}`)
	//console.log(userForm)
	//console.log(userFormRef)
	//console.log(serviceUser.value)
	var res = {}
	var success = false
	var roles: string[] = []
	var user = {
		name: serviceUser.value.name,
    	username: serviceUser.value.username,
    	email: serviceUser.value.email,
    	password: serviceUser.value.password
	}
	if (action === 'insert') {
		user.id = null
		roles.push(serviceUser.value.roles);
		user.roles = roles
		//console.log(user);
		try {
			res = await InsertUser(user, config.value)
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
				router.push({path: '/', query: {message: res.data.message}})
			} else {
				message.value = res.data.message
			}
		}
	}
	else {
		user.id = props.idUser
		if (props.profile !== null && props.profile){
			usrStore.user.roles.forEach((val, ind) => {
				roles.push(val.id)
			})
			user.roles = roles
		} else {
			if(serviceUser.value.roles.constructor === Array){
				/*serviceUser.value.roles.forEach((val, ind) => {
					switch(val){
						case '1':
							roles.push("1")
							break;
						case '2':
							roles.push("2")
							break;
						default:
							break;
					}
				})*/
				roles = serviceUser.value.roles
			} else {
				/*switch(serviceUser.value.roles){
					case 'Administrator':
						roles.push("1")
						break;
					case 'Simple user':
						roles.push("2")
						break;
					default:
						break;
				}*/
				roles.push(serviceUser.value.roles)
			}
			user.roles = roles
		}
		//console.log(user)
		try {
			if (props.profile !== null && props.profile)
				res = await UpdateUser(user.id, user, config.value)
			else
				res = await UpdateUserRoles(user.id, user.roles, config.value)
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
				if (action === 'update')
					router.push({path: '/users/home', query: {message: res.data.message}})
				else
					router.push({path: '/books/home', query: {message: res.data.message}})
			} else {
				message.value = res.data.message
			}
		}
	}
}

onBeforeMount(async() => {
	if(props.idUser !== undefined && props.idUser !== 0 && props.profile !== null && !props.profile){
		var success = false
		var res = {}
		try {
			res = await GetUser(props.idUser, config.value)
			success = true
		} catch (err) {
			var mess = 'Failed to fetch user informations (back office) off !'
			if (err.response !== undefined){
				mess = `Failed to fetch user informations, remote server (back office) send ${err.response.status} response !`
				if (err.response.data.message !== undefined){
					mess = err.response.data.message
				}
			}
			message.value = mess
		} finally {
			if (success){
				//console.log(res)
				serviceUser.value.id = res.data.id
				serviceUser.value.name = res.data.name
				serviceUser.value.username = res.data.username
				serviceUser.value.email = res.data.email
				if (res.data.roles.length > 1){
					var r = []
					res.data.roles.forEach((val, ind) => {
						r.push(val.id.toString())
					})
					serviceUser.value.roles = r
				} else if (res.data.roles.length == 1) {
					var r = res.data.roles[0].id.toString()
					serviceUser.value.roles = r
				} else {
					serviceUser.value.roles = ''
				}
			}
		}
	} else if(props.idUser !== undefined && props.idUser !== 0 && props.profile !== null && props.profile){
		serviceUser.value.id = usrStore.user.id
		serviceUser.value.name = usrStore.user.name
		serviceUser.value.username = usrStore.user.username
		serviceUser.value.email = usrStore.user.email
	}
})
</script>

<template>
	<v-sheet class="my-4 mx-auto" v-if="message" width="300" :theme="props.isDark ? 'dark' : 'light'">
		<div class="bg-red-darken-2 text-center"><span>{{ message }}</span></div>
	</v-sheet>
	<v-sheet class="mx-auto" width="300" :theme="props.isDark ? 'dark' : 'light'">
		<v-form
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
				prepend-inner-icon="fas fa-signature"
				:disabled="props.profile !== null && !props.profile">
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
				prepend-inner-icon="fas fa-user"
				:disabled="props.profile !== null && !props.profile">
			</v-text-field>
			<v-text-field
				v-model="serviceUser.email"
				:rules="emailRules"
				type="email"
				label="Email"
				placeholder="mika@gmail.com"
				required
				prepend-inner-icon="fas fa-envelope"
				:disabled="props.profile !== null && !props.profile">
			</v-text-field>
			<v-text-field
				v-model="serviceUser.password"
				:rules="props.profile ? passwordRules : []"
				type="password"
				label="Password"
				required
				prepend-inner-icon="fas fa-eye-slash"
				:disabled="props.profile !== null && !props.profile">
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
				v-if="(props.idUser !== undefined && props.profile !== null && !props.profile)"
				v-model="serviceUser.roles"
				:rules="rolesRules"
				:items="rolesItem"
				hint="Pick at least one role"
				label="Select..."
				placeholder="Roles"
				required
				multiple>
		    </v-select>
			<v-btn :prepend-icon="actionButtonIcon" 
				class="mt-2"
				:disabled="!userForm" 
				block>
				{{actionButtonText}}
				<TheDialog 
					:text="dialogText" 
					:actionParent="actions"
					:formParams="formAction"/>
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
			<v-btn v-if="(props.profile !== null && props.profile)"
				class="mt-4" 
				color="error" 
				block
				prepend-icon="fas fa-user-minus">
				Delete Profile
				<TheDialog 
					text="Are you sure to delete your Account ?" 
					:actionParent="deleteUser"
					:formParams="props.idUser"/>
			</v-btn>
		</v-form>
	</v-sheet>
		
</template>