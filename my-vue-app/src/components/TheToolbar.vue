<script setup lang="ts">
	import { ref, computed, reactive } from 'vue'
	import { useUserStore } from '@/stores/user'
	import { useRouter } from 'vue-router'
	/*const items = ref([
		{ title: 'Home', icon: 'fas fa-home', link: '/' }
	])*/
	/*const buttons = ref([
		{ text: 'Login', icon: 'fas fa-right-to-bracket', isLink: true, action: null, link: '/login' }
	])*/
	//const user = defineModel()
	const usrStore = useUserStore()
	const links = computed(() => {
		var ret = []
		if (usrStore.isConnected){
			ret.push({ title: 'Home', icon: 'fas fa-book', isLink: true, action: null, link: '/books/home' })
			if (usrStore.isAdmin){
				ret.push({
					title: 'New Book',
					icon: 'fas fa-book-medical',
					isLink: true,
					action: null,
					link: '/books/new'
				})
			}
		} else {
			ret.push({ title: 'Home', icon: 'fas fa-home', isLink: true, action: null, link: '/' })
		}
		return ret
	})
	const buttons = computed(() => {
		var ret = []
		if (usrStore.isConnected){
			if (usrStore.isAdmin){
				ret.push({
					text: 'New User',
					icon: 'fas fa-user-plus',
					isLink: true,
					action: null,
					link: '/users/new'
				})
			}
			ret.push({
				text: 'Logout',
				icon: 'fas fa-right-from-bracket',
				isLink: false,
				action: 'logout',
				link: null
			})
		} else {
			ret.push({ text: 'Login', icon: 'fas fa-right-to-bracket', isLink: true, action: null, link: '/login' })
		}
		return ret
	})
	const router = useRouter()
	const actions = (e, action) => {
		//console.log(`Button click for action : ${action}`)
		if (action === 'logout'){
			usrStore.resetUser()
			//console.log(usrStore.isConnected);
			router.push("/")
		}
	}
</script>

<template>
	<v-toolbar
  		density="comfortable"
  		:elevation="8">
  		<v-menu>
			<template v-slot:activator="{ props }">
				<v-app-bar-nav-icon v-bind="props"></v-app-bar-nav-icon>
				<!-- <v-btn icon="fa-solid fa-ellipsis-vertical" v-bind="props"></v-btn> -->
			</template>
			<v-list>
				<v-list-item
					v-for="(item, i) in links"
					:key="i">
					<v-list-item-title>
						<v-icon :icon="item.icon"></v-icon> <router-link :to="item.link">{{ item.title }}</router-link>
					</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
		<v-toolbar-title>Book App</v-toolbar-title>
		<v-list class="transparent-body">
			<v-list-item
				v-for="(item, i) in links"
				:key="i"
				class="d-inline-flex">
				<router-link :to="item.link">{{ item.title }}</router-link>
			</v-list-item>
		</v-list>
      	<v-spacer></v-spacer>
      	<v-list class="transparent-body">
			<v-list-item
				v-for="(item, i) in buttons"
				:key="i"
				class="d-inline-block my-auto px-0">
				<v-btn v-if="item.isLink" class="text-button" :prepend-icon="item.icon" variant="text">
					<router-link :to="item.link">{{ item.text }}</router-link>
		      	</v-btn>
		      	<v-btn v-if="!item.isLink" class="text-button" :prepend-icon="item.icon" variant="text" @click="actions($event, item.action)">
					<span>{{ item.text }}</span>
		      	</v-btn>
			</v-list-item>
		</v-list>
	</v-toolbar>
	
</template>