<script setup lang="ts">
	import { ref, reactive } from 'vue'
	import { Login } from '@/utils/axios'
	import type { LoginRequest } from '@/utils/types'
	import { useRouter } from 'vue-router'
//	import { addItem } from '@/utils/session'
	import { useUserStore } from '@/stores/user'
	//import TheTitle from '@/components/TheTitle'
	defineProps<{
		isDark?: Boolean
	}>()
	const serviceLogin: LoginRequest = reactive({usernameOrEmail: '', password: ''})
	const loginFormRef = ref<HTMLFormElement>(null)
	const loginForm = ref(false)
	//const usernameOrEmail = ref('');
	const usernameOrEmailRules = ref([
		val => !!val || 'Username Or Email required !',
		val => (val && val.length < 51) || 'Username or Email must be less than 50 characters !'
	]);
	const passwordRules = ref([
		val => !!val || 'Password required !',
		val => (val && val.length > 3 && val.length < 31) || 'Password must be at least 8 and less than 30 characters !'
	]);
	const message = ref(null);
	const router = useRouter();
	//const user = defineModel();
	const usrStore = useUserStore()
	//const user = usrStore.user
	const login = async () => {
		var res = {};
		var success = false;
		try{
			//console.log('Form credentials !');
			//console.log(serviceLogin);
			//console.log(loginForm.value);
			res = await Login(serviceLogin, {headers: { 'Authorization': 'Not logged !',
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json;charset=utf-8'}});
			success = true;
		} catch(err) {
			//console.log('Error !');
			//console.log(err);
			message.value = err.response ? err.response.data.message : err.message;
		} finally {
			if (success){
				//console.log('Return Datas');
				//console.log(res);
				//console.log(success);
				res.data.user.token = res.data.token
				//await addItem('user', res.data.user)
				usrStore.setUser(res.data.user)
				router.push('/books/home')
			}
		}
	};
	const reset = () => {
		//console.log("clicked !");
		//console.log(loginFormRef);
		loginFormRef.value?.reset();
		message.value = null
	}
	const resetValidation = () => {
		loginFormRef.value?.resetValidation();
	}
</script>

<!-- <script>
export default {
    data: () => ({
      usernameOrEmail: '',
      usernameOrEmailRules: [
        value => {
          if (value?.length > 3) return true

          return 'First name must be at least 3 characters.'
        },
      ],
    }),
}
</script> -->

<template>
	<v-sheet class="my-4 mx-auto" v-if="message" width="300">
		<div class="bg-red-darken-2 text-center"><span>{{ message }}</span></div>
	</v-sheet>
	<v-sheet class="mx-auto" width="300" :theme="isDark ? 'dark' : 'light'">
		<v-form 
			@submit.prevent="login" 
			v-model="loginForm"
			ref="loginFormRef">
			<v-text-field
				v-model="serviceLogin.usernameOrEmail"
				:counter="50"
				:rules="usernameOrEmailRules"
				label="Username/Email"
				placeholder="user-email@gmail.com/username"
				required
				prepend-inner-icon="fas fa-user">
			</v-text-field>
			<v-text-field
				v-model="serviceLogin.password"
				:counter="30"
				:rules="passwordRules"
				hint="At least 8 characters !"
				type="password"
				label="Password"
				required
				prepend-inner-icon="fas fa-eye">
			</v-text-field>
			<v-btn prepend-icon="fas fa-right-to-bracket" 
				class="mt-2" 
				type="submit"
				:disabled="!loginForm" 
				block>Login
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