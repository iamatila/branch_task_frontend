<template>
  <q-page class="q-pa-md">
    <div class="text-black text-h4">All Users</div>
      <q-separator />
    <div class="q-gutter-y-md q-pt-md" full-width>
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" v-for="(user, index) in data" :key="index">
          <q-card-section class="bg-primary text-white">
            <!-- <div class="text-h6 text-center">
              <q-avatar size="100px">
                <img :src="user.picture">
              </q-avatar>
            </div> -->
            <div class="text-center">
              <div class="text-h5">
                {{ user.firstname }}
               </div>
              <div class="text-h5">
                {{ user.lastname }}
               </div>
               <div>
                 <div class="text-subtitle2">
                   @{{ user.username }}
                 </div>
               </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
          <q-btn flat @click="viewMore(user)">See Details...</q-btn>
        </q-card-actions>
        </q-card>

        <q-dialog v-model="card">
          <q-card class="my-card2">

            <q-card-section>

              <div class="row no-wrap items-center">
                <div class="col text-h4 ellipsis">
                  {{ viewMoreData.firstname }} {{ viewMoreData.lastname }}
                </div>
                <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                  <q-icon name="place" />
                  city: {{ viewMoreData.city }}
                </div>
              </div>

            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">
                Username:
              </div>
              <div class="text-caption text-grey">
                @{{ viewMoreData.username }}
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">
                Email:
              </div>
              <div class="text-caption text-grey">
                {{ viewMoreData.email }}
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">
                Phone:
              </div>
              <div class="text-caption text-grey">
                {{ viewMoreData.phone }}
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">
                User Id:
              </div>
              <div class="text-caption text-grey">
                {{ viewMoreData.userid }}
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">
                User Type:
              </div>
              <div class="text-caption text-grey">
                {{ viewMoreData.usertype }}
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">
                Location:
              </div>
              <div class="text-caption text-grey">
                {{ viewMoreData.city }}, {{ viewMoreData.state }}, {{ viewMoreData.country }}
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">
                Gender:
              </div>
              <div class="text-caption text-grey">
                {{ viewMoreData.gender }}
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none text-center">
              <div class="text-subtitle1">
                Date of Birth:
              </div>
              <div class="text-caption text-grey">
                {{ viewMoreData.dob }}
              </div>
            </q-card-section>

            <!-- <q-separator />

            <q-card-actions align="right">
              <q-btn v-close-popup flat color="primary" label="Copy User ID" @click="copyTo(viewMoreData.userid)" />
              <q-btn v-close-popup flat color="primary" round icon="event" />
            </q-card-actions> -->
          </q-card>
        </q-dialog>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch} from 'vue'
import { axios, api, base } from 'boot/axios'
import { copyToClipboard, useQuasar } from 'quasar'
import { useAdminStore } from '../stores/admin-store'
import { useRouter } from 'vue-router'

const name = 'RealtorPage'

const card = ref(false)
const slide = ref(1)
const data = ref([])
const viewMoreData = ref({})
const approved = ref([])
const useStore = useAdminStore()
const $q = useQuasar()
const $router = useRouter()
var token = useStore.getToken
var adminid = useStore.adminid

const viewMore = (data) => {
  card.value = true
  viewMoreData.value = data
}

function copyTo(ID) {
  copyToClipboard(ID)
    .then(() => {
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'thumb_up',
        message: 'Copied to clipboard'
      })
    })
    .catch(() => {
      // fail
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Please refresh page',
        icon: 'report_problem'
      })
    })
}

const loadData = () => {
  // const token = useStore.getToken
  console.log(token, "token");
  api.get(`/user/all`,
    { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      data.value = response.data.data.reverse()
      console.log(data.value, "Broker!")
    })
    .catch(() => {
      // if (HttpStatusCode.Unauthorized) {
      //   $router.push('/');
      //   $router.go();
      // }
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Realtor not found',
        icon: 'report_problem'
      })
    })
}


watch(() => {
  var decoded = useStore.checkToken(token);
  console.log(decoded);
  console.log("token decoded");
  if (decoded == true) {
    useStore.logout();
    // useStore.logout();
    $router.replace('/')
    $router.go();
  }
})

onMounted(() => {
  loadData()
})

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px

.my-card2
  width: 100%
  // max-width: 350px
.my-thumbnail
  height: 200px
.table-resp
  border-collapse: collapse
  margin-left: 1em
  caption
    text-align: left
    width: 95vw // Screws up table width until positioning below
    // caption-side: top-outside Firefox-only for now

@media (min-width: 768px)  // sm, md, lg
  .table-resp
    margin-top: 3em
    position: relative // Used below to give position: absolute context
    caption
      position: absolute // Fixes table width broken by width: 95vw above
      top: -2em
      margin-bottom: .75em
    thead
      text-align: left
      background-color: #333
      color: white
    tbody
      tr
        &:nth-child(odd)
          // background-color: hsl(0, 0%, 94%)

        &:nth-child(even)
          // background-color: hsl(0, 0%, 88%)
    td, th
      padding: .25em .5em
      &:nth-child(2)
        border-left: 3px solid #fff

@media (max-width: 767px) /* xs */
  thead
    display: none
  .table-resp
    display: block
    margin-top: 1em
  td
    display: block
  td:first-child
    font-weight: 700
    margin-top: .75em
    margin-bottom: 0
  td:nth-child(2)
    margin-top: 0


</style>
