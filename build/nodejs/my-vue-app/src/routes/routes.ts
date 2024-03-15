import Home from '@/components/pages/Home'
import Login from '@/components/pages/Login'
import BookHome from '@/components/pages/Book-Home'
import NewBook from '@/components/pages/New-Book'
import NewUser from '@/components/pages/New-User'
import UpdateBook from '@/components/pages/Update-Book'
import Profile from '@/components/pages/Profile'
import UpdateUser from '@/components/pages/Update-User'
import UserHome from '@/components/pages/User-Home'
import { nextTick } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
	{ path: '/', name: 'Home', component: Home, meta: {title: 'Home Page', requiresAuth: false }},
	{ path: '/login', name: 'Login', component: Login, meta: {title: 'Login Page', requiresAuth: false }},
	{ path: '/books/home', name: 'Books', component: BookHome, meta: {title: 'Books Page', requiresAuth: true }},
	{ path: '/books/new', name: 'Edit_Books', component: NewBook, meta: {title: 'Create Book', requiresAuth: true }},
	{ path: '/users/new', name: 'Edit_Users', component: NewUser, meta: {title: 'Create User', requiresAuth: false }},
	{ path: '/books/:id', name: 'Update_Books', component: UpdateBook, meta: {title: 'Update Book', requiresAuth: true }},
	{ path: '/users/profile/:id', name: 'Edit_Profile', component: Profile, meta: {title: 'Profile', requiresAuth: true }},
	{ path: '/users/:id', name: 'Update_Users', component: UpdateUser, meta: {title: 'Update User', requiresAuth: true }},
	{ path: '/users/home', name: 'Users', component: UserHome, meta: {title: 'Users List', requiresAuth: true }}
]

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes
})

router.beforeEach(async (to, from) => {
	const usrStore = useUserStore()
	//console.log(to)
	//console.log(usrStore.isConnected)
	if (usrStore.isConnected){
		if (to.name === 'Home' || to.name === 'Login'){
			return { name: 'Books' }
		}
	} else {
		if (to.meta.requiresAuth){
			return { name: 'Login' }
		}
	}
})

router.afterEach((to, from) => {
	nextTick(() => {
		//console.log(to);
		document.title = to.meta.title;
	})
})

export default router;
