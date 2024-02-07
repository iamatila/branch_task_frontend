<template>
  <!-- <q-page class="q-pa-md"> -->
  <div class="q-pa-md">
    <div class="text-black text-h4">
      Admin Signup

    </div>
    <q-separator />
    <div class="q-pt-md">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <q-card class="q-ma-lg text-black" style="max-width: 1000px;">
                    <q-card-section>
                        <div class="q-pa-md">
                            <q-form @submit="onSubmit" @reset="onReset">
                                <div class="row q-pt-sm">
                                    <div class="col-12 col-md-6 q-pl-md">
                                        <q-input hint="First Name" class="" outlined required v-model="firstname" />
                                    </div>
                                    <div class="col-12 col-md-6 q-pl-md">
                                        <q-input hint="Last Name" class="" outlined required v-model="lastname" />
                                    </div>
                                </div>
                                <div class="row q-pt-sm">
                                    <div class="col-12 col-md-6 q-pl-md">
                                        <q-input hint="Email" class="" type="email" outlined required v-model="email" />
                                    </div>
                                    <div class="col-12 col-md-6 q-pl-md">
                                        <q-input hint="Phone Number" class="" type="number" outlined required v-model="phone" />
                                    </div>
                                </div>
                                <div class="row q-pt-sm">
                                    <div class="col-12 col-md-6 q-pl-md">
                                        <q-select hint="Gender" class="" :options="genderOptions" outlined required v-model="gender" />
                                    </div>
                                    <div class="col-12 col-md-6 q-pl-md">
                                        <q-input hint="Username" class="" outlined required v-model="username" />
                                    </div>
                                </div>
                                <div class="row q-pt-sm">
                                    <div class="col-12 col-md-6 q-pl-md">
                                        <q-input hint="Password" class="" type="password" outlined required v-model="password" />
                                    </div>
                                    <div class="col-12 col-md-6 q-pl-md">
                                        <q-input hint="City" class="" outlined required v-model="city" />
                                    </div>
                                </div>
                                <div class="row q-pt-sm">
                                    <div class="col-12 col-md-6 q-pl-md">
                                        <q-input hint="State" class="" outlined required v-model="state" />
                                    </div>
                                    <div class="col-12 col-md-6 q-pl-md">
                                        <q-input hint="Country" outlined required v-model="country" />
                                    </div>
                                </div>


                                <div class="row q-pt-lg">
                                    <div class="text-center full-width q-pl-md">
                                        <q-btn :loading="loadingCreateAdmin" label="Submit" type="submit" color="primary" style="width: 260px" />
                                    </div>
                                </div>

                            </q-form>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </div>
</div>
  <!-- </q-page> -->
</template>

<script setup>
import { ref } from 'vue'
import { axios, api, base } from 'boot/axios'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'


// const useStore = useAdminStore()

const $router = useRouter()
const genderOptions = [
    'Male',
    'Female'
]
const firstname = ref('')
const lastname = ref('')
const email = ref('')
const username = ref('')
const password = ref('')
const phone = ref('')
const gender = ref('')
const city = ref('')
const state = ref('')
const country = ref('')

const loadingCreateAdmin = ref(false)

const name = 'UserAdminPage'

const $q = useQuasar()
const data = ref([])


const onSubmit = async () => {
  loadingCreateAdmin.value = true
  const fD = new FormData();
  fD.append("firstname", firstname.value);
  fD.append("lastname", lastname.value);
  fD.append("email", email.value);
  fD.append("phone", phone.value);
  fD.append("password", password.value);
  fD.append("username", username.value);
  fD.append("gender", gender.value);
  fD.append("city", city.value);
  fD.append("state", state.value);
  fD.append("country", country.value);

  await api.post(`/admins/signup`, fD, {
    headers: { 'Content-Type': 'multipart/form-data' },})
    .then((response) => {
      data.value = response.data.data
      console.log(data.value, "Admin Sign up!")
      $q.notify({
        message: response.data.message,
        color: 'green-4',
        textColor: 'white',
        icon: 'thumb_up',
      })
      $router.push('/')
    })
    .catch(() => {
      if (HttpStatusCode.Unauthorized) {
        $router.push('/');
        $router.go();
      }
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Loading failed',
        icon: 'report_problem'
      })
    })
    loadingCreateAdmin.value = false;
}


</script>

