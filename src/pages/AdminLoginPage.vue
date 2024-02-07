<template>
  <div class="">

    <div class="row window-height window-width">
      <!-- <div class="col">
        <div class="column full-height">
          <div class="col-2 q-pb-xl q-pt-xl q-pl-md"></div>
          <div class="col-10 ">
            <div class="userLogin">
                <q-card class="my-card text-white" style="max-width: 400px">
                    <q-card-section>
                    <div class="text-h4 text-weight-bold q-pa-md text-primary">User Login</div>
                    <div class="text-6 q-pl-md q-pr-md q-pt-sm q-pb-sm text-primary">
                        Welcome, let’s access
                        your accounts shall we?
                    </div>
                    </q-card-section>
                    <q-card-section>
                    <div class="q-pa-md">
                        <q-form @submit="onUserSubmit" @reset="onUserReset" class="">
                        <q-input type="email" bottom-slots v-model="userEmail" label="Email" hint="Your email address"
                            lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']">
                            <template v-slot:prepend>
                            <q-icon name="fa-light fa-at" />
                            </template>
                        </q-input>

                        <q-input type="password" bottom-slots v-model="userPassword" label="Password" hint="Your password"
                            lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']">
                            <template v-slot:prepend>
                            <q-icon name="lock" />
                            </template>
                        </q-input>

                        <div class="q-pt-md">
                            <q-btn :loading="userloadingLogin" class="full-width" label="Submit" type="submit" color="primary" />
                        </div>
                        </q-form>
                        <div class="text-black q-pa-sm text-center">
                            Don't have an account yet?
                            <router-link class="text-primary" to="/user-signup" style="text-decoration: none">
                            Sign up
                            </router-link>

                        </div>
                    </div>
                    </q-card-section>
                </q-card>
                </div>
            </div>
        </div>
      </div> -->
      <div class="col">
        <div class="column full-height">
          <div class="col-2 q-pb-xl q-pt-xl q-pl-md"></div>
          <div class="col-10 ">
            <div class="adminLogin">
              <q-card class="my-card text-white" style="max-width: 400px">
                <q-card-section>
                  <div class="text-h4 text-weight-bold q-pa-md text-secondary">Admin Login</div>
                  <div class="text-6 q-pl-md q-pr-md q-pt-sm q-pb-sm text-secondary">
                    Welcome, let’s access
                    your accounts shall we?
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="q-pa-md">
                    <q-form @submit="onAdminSubmit" @reset="onAdminReset" class="">
                      <q-input type="email" bottom-slots v-model="adminEmail" label="Email" hint="Your email address"
                        lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']">
                        <template v-slot:prepend>
                          <q-icon name="fa-light fa-at" />
                        </template>
                      </q-input>

                      <q-input type="password" bottom-slots v-model="adminPassword" label="Password" hint="Your password"
                        lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']">
                        <template v-slot:prepend>
                          <q-icon name="lock" />
                        </template>
                      </q-input>

                      <div class="q-pt-md">
                        <q-btn :loading="adminloadingLogin" class="full-width" label="Submit" type="submit" color="secondary" />
                      </div>
                    </q-form>
                    <div class="text-black q-pa-sm text-center">
                        Don't have an account yet?
                        <router-link class="text-secondary" to="/admin-signup" style="text-decoration: none">
                        Sign up
                        </router-link>

                    </div>
                    <q-separator />
                    <div class="text-black q-pa-sm text-center">
                        <router-link class="text-secondary" to="/" style="text-decoration: none">
                        Back to User Login
                        </router-link>

                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { onMounted, ref, computed } from 'vue'
import { axios, api, base } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../stores/admin-store'
import { useUserStore } from '../stores/user-store'
import { jwtDecode } from 'jwt-decode';
// import store from '../store/index.js'
// import { createLogger, mapMutations } from "pinia";
// import { useAuthStore } from '../stores/AuthStore'
// import { mapActions, mapState } from 'pinia'


  name: 'LoginPage'
  const $q = useQuasar()
const useUsersStore = useUserStore()
const useAdmStore = useAdminStore()

  // const userEmail = ref("")
  // const userPassword = ref("")
  const adminEmail = ref("")
  const adminPassword = ref("")
  const userloadingLogin = ref(false)
  const adminloadingLogin = ref(false)

  // mapMutations({
  //   setLoggedUser: "auth/setLoggedUser",
  // })
  const itemsLength = computed(() => {
    return mapState(useAuthStore, ['authUser'])
  })

  const $router = useRouter()
  // const onUserSubmit = async () => {
  //   userloadingLogin.value = true
  //   // Get the token/cookie
  //   // await useUsersStore.getSanctumCookie()
  //   // login user
  //   const user = await useUsersStore.login(userEmail.value, userPassword.value)
  //   // console.log(user.data, "user")
  //   const token = user.data.token;
  //   // const secret = 'yourSecret';
  //   console.log(token, 'user token');
  //   console.log(user.data, 'user.data');

  //   // Decode the token
  //   const decoded = jwtDecode(token);

  //   // Access the values in the token
  //   console.log(decoded, 'user decoded');
  //   // set user data to localstorage()
  //   useUsersStore.setUser(decoded)
  //   useUsersStore.setToken(user.data)
  //   // routing to the dashboard
  //   if (useUsersStore.getUsertype == "$BranchUser") {
  //     $router.replace('/dashboard')
  //     $q.notify({
  //       color: 'green-4',
  //       textColor: 'white',
  //       icon: 'thumb_up',
  //       message: 'Welcome to your Dashboard'
  //     })
  //   } else {
  //     $q.notify({
  //       color: 'negative',
  //       textColor: 'white',
  //       icon: 'thumb_down',
  //       message: 'You don\'t have Permissions to view this page, this page can only be viewed by an admin user'
  //     })
  //   }
  //   userloadingLogin.value = false
  // }


  // const onUserReset = () => {
  //   userEmail.value = null
  //   userPassword.value = null
  // }

  const onAdminSubmit = async () => {
    adminloadingLogin.value = true
    // Get the token/cookie
    // await useAdmStore.getSanctumCookie()
    // login admin
    const admin = await useAdmStore.login(adminEmail.value, adminPassword.value)
    // console.log(admin.data, "admin")
    const token = admin.data.token;
    // const secret = 'yourSecret';

    // Decode the token
    const decoded = jwtDecode(token);

    // Access the values in the token
    console.log(decoded, 'admin decoded');
    // set admin data to localstorage()
    useAdmStore.setAdmin(decoded)
    useAdmStore.setToken(admin.data)
    // useAdmStore.setUser(admin.data)
    // routing to the dashboard
    if (useAdmStore.getAdmintype == "$BranchAdmin") {
      $router.replace('/dashboard')
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'thumb_up',
        message: 'Welcome to your Dashboard'
      })
    } else {
      $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'thumb_down',
        message: 'You don\'t have Permissions to view this page, this page can only be viewed by an admin user'
      })
    }
    adminloadingLogin.value = false
  }


  const onAdminReset = () => {
    adminEmail.value = null
    adminPassword.value = null
  }

  function logOut () {
    $router.replace('/admin-login')
    // useStore.clearAdmin;
    useUsersStore.logout();
    useAdmStore.logout();
   }

onMounted(() => {
  logOut();
})
</script>

<style lang="sass" scoped>
.userLogin
  display: flex
  align-items: center
  justify-content: center
.adminLogin
  display: flex
  align-items: center
  justify-content: center

</style>
<!-- .my-card
  width: 100%
  max-width: 250px -->
