import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { retreiveItem, addItem, deleteItem } from '@/utils/session'

export const useUserStore = defineStore( 'user', () => {
	const user = ref(retreiveItem('user'))
	const isConnected = computed(() => user.value !== null ? true : false)
	const isAdmin = computed(() => {
		//console.log(isConnected.value)
		//console.log(user.value)
		var ret = false;
		if (isConnected.value){
			user.value.roles.forEach((role, ind) => {
				if (role.id === 1)
					ret = true;
				return;
			})
		} 
		return ret;
	})
	const setUser = (data: UserModel) => {
		user.value = data
		addItem('user', data)
	}

	const resetUser = () => {
		user.value = null
		deleteItem('user')
	}
	return { user, isConnected, isAdmin, setUser, resetUser }
})