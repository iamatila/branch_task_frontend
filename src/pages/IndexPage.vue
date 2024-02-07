<template>
  <q-page class="flex flex-center">
    <img
      alt="Branch logo"
      src="~assets/branch2.png"
      style="width: 600px; height: 200px"
    >
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    > -->
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../stores/admin-store'
import { useUserStore } from '../stores/user-store'

const $router = useRouter()
const useUsersStore = useUserStore()
const useAdmStore = useAdminStore()

function findToken () {
  if ((useUsersStore.getToken != null) || (useAdmStore.getToken != null)) {
    $router.replace('/dashboard');
  } else {
    $router.replace('/');
  }
}

onMounted(() => {
  setTimeout(function() {
    // Your code here
    console.log("This message will be logged after a delay of 2 seconds");
    findToken();
  }, 2000);
})
</script>
