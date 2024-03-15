<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed, ref, onBeforeMount } from 'vue'
import { GetUsers, DeleteUser } from '@/utils/axios'
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
		key: 'name',
		value: 'Name'
	},
	{
		key: 'username',
		value: 'Username'
	},
	{
		key: 'email',
		value: 'Email'
	},
	{
		key: 'password',
		value: 'Password'
	},
	{
		key: 'roles',
		value: 'Roles'
	}]
	if (usrStore.isAdmin){
		ret.push({
			key: 'actions',
			value: 'Actions'
		})
	} 
	return ret
})
const users = ref([])
/*const deleteUser = async (e, id) => {
	try {
		const res = await DeleteUser(id, {
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
}*/
const colSpan = computed(() => {
	var ret = 6
	if (usrStore.isAdmin){
		ret = 7
	}
	return ret
})
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
const message = ref(null)
const fetchUsers = async() => {
	var res = []
	var success = false
	try {
		res = await GetUsers({
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
			users.value = res.data
		}
	}
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
			if (id === usrStore.user.id){
				usrStore.resetUser()
				router.push("/login")
			} else {
				await fetchUsers()
			}
		}
	}
}

onBeforeMount(async () => {
	//console.log(localStorage)
	await fetchUsers()
})
</script>

<template>
	<v-sheet class="my-4 mx-auto" v-if="message" :theme="isDark ? 'dark' : 'light'">
		<div class="bg-red-darken-2 text-center"><span>{{ message }}</span></div>
	</v-sheet>
	<v-sheet class="mx-auto" :theme="isDark ? 'dark' : 'light'">
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
				<tr v-for="user in users"
					:key="user.id">
					<td>{{ user.id }}</td>
					<td>{{ user.name }}</td>
					<td>{{ user.username }}</td>
					<td>{{ user.email }}</td>
					<td>{{ user.password.substr(6, 6) }}...</td>
					<td><span v-for="(role, ind) in user.roles">{{ role.id === 1 ? 'Administrator' + ( ind < user.roles.length - 1 ? ', ' : '' ) : 'Simple user' + ( ind < user.roles.length - 1 ? ', ' : '' ) }}</span><span v-if="user.roles.length === 0">No role</span></td>
					<td v-if="usrStore.isAdmin">
						<v-btn class="text-button" 
							prepend-icon="fas fa-pen-to-square" color="primary">
							<router-link :to="'/users/' + user.id"
								class="text-indigo-lighten-5">Update</router-link>
			      		</v-btn> | <v-btn 
			      			class="text-button"
			      			prepend-icon="fas fa-trash"
			      			color="error">
			      			Delete
			      			<TheDialog 
			      				text="Are you sure to delete this user ?"
			      				:actionParent="deleteUser"
			      				:formParams="user.id"/>
			      		</v-btn> 
			      	</td>
				</tr>
				<tr v-if="users.length === 0">
					<td class="text-center" :colspan="colSpan">Unable to find users !</td>
				</tr>
			</tbody>
		</v-table>
	</v-sheet>
</template>