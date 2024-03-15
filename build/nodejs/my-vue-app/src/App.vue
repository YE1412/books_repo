<script setup lang="ts">
//import HelloWorld from './components/HelloWorld.vue'
//import TheWelcome from './components/TheWelcome.vue'
import TheToolbar from '@/components/TheToolbar'
import { RouterView } from 'vue-router';
import { reactive, ref, watch } from 'vue';
//import { useUserStore } from '@/stores/user'
import { useDark, useToggle } from '@vueuse/core'

const user = ref(null);
const isDark = useDark({
  selector: 'html',
});
const toogleDark = useToggle(isDark);
//toogleDark()
//const usrStore = useUserStore();
//provide('userSession', user.value)
//watch(user, async (newUser, oldUser) => {
  //console.log('Old User !')
  //console.log(oldUser);
  //console.log('New User !')
  //console.log(newUser);
  //usrStore.user.value = newUser
//})
</script>

<template>
  <TheToolbar v-model="isDark" />
  <router-view :isDark="isDark"></router-view>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main> -->
</template>

<style scoped>
/*header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}*/
</style>
