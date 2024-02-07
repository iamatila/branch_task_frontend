<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-pa-md row q-gutter-md">
        <q-card class="full-width text-primary" >
          <q-card-section>
            <div class="justify-center q-pt-sm">
            <!-- <div style="max-width: 700px"> -->
              <q-form @submit="onSubmit" @reset="onReset" class="">
                <!-- <div class="col-12 col-md-12 q-pa-md"> -->
                  <q-select hint="Category" class="" label="Pick a Category" :options="categoryOptions" outlined required v-model="category"
                  />
                <!-- </div> -->
                <q-separator dark />
                <div class="q-ma-lg">
                  <q-btn :loading="loadingCreateRoom" class="bg-primary full-width text-white" type="submit">Start</q-btn>
                </div>
              </q-form>
            <!-- </div> -->
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- <q-separator /> -->
    
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch} from 'vue'
import { axios, api } from 'boot/axios'
import { LocalStorage , useQuasar } from 'quasar'
import { useUserStore } from '../stores/user-store'
import { useWebSocketStore } from '../stores/websocket-store'
import { useRouter } from 'vue-router'

const name = 'RealtorPage'

const card = ref(false)
const slide = ref(1)
const data = ref([])
const categoryOptions = [
    'Account',
    'Transfer',
    'Interest',
    'Loan',
    'Update',
    'Airtime_Data',
    'Bills',
    'Others'
]
const viewMoreData = ref({})
const category = ref("")
const loadingCreateRoom = ref(false)
const useStore = useUserStore()
const useWebStore = useWebSocketStore()
const $q = useQuasar()
const $router = useRouter()
var token = useStore.getToken
var userid = useStore.userid
var username = useStore.username

const onSubmit = async () => {
  loadingCreateRoom.value = true
  console.log(category.value, "category value data")
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  console.log(result, "result data")
  const fD = new FormData();
  // fD.append("id", userid);
  fD.append("id", result);
  fD.append("category", category.value);
  fD.append("name", category.value + "_" + result);

  await api.post(`/ws/createRoom`, fD, {
    headers: { 'Content-Type': 'multipart/form-data' },})
    .then((response) => {
      data.value = response.data
      console.log(response.data, "create room data")
      // $q.notify({
      //   message: "Almost done",
      //   color: 'green-4',
      //   textColor: 'white',
      //   // icon: 'thumb_up',
      // })
      const id = data.value.id;
      onWs(id);
      // console.log(`/ws/joinRoom/${id}/${userid}/${username}`, "ws")
      // $router.push('/')
    })
    .catch(() => {
      $q.notify({
        color: 'negative',
        position: 'bottom',
        message: 'Starting a chat failed',
        icon: 'report_problem'
      })
    })
    loadingCreateRoom.value = false;
}

const onReset = () => {
  category.value = null
}

const onWs = (id) => {
  const wsEndpoint = `wss://branch-task-backend.up.railway.app/api/v1/ws/joinRoom/${id}/${userid}/${username}`
  // const wsEndpoint = `ws://localhost:3000/api/v1/ws/joinRoom/${id}/${userid}/${username}`
  // const wsEndpoint = `${ws}/ws/joinRoom/${id}/${userid}/${username}`
  const ws_ = new WebSocket(wsEndpoint)
  // console.log(wsEndpoint, "wsEndpoint")
  // console.log(ws_, "ws_")
  // if (ws_.OPEN) {
    //   LocalStorage.set("userChat", ws_);
    //   $router.push('/dashboard')
    //   return
  // }
  ws_.onopen = () => {
    console.log("WebSocket connection opened");
    useWebStore.setWebSocket(ws_);
    $router.push(`/message/${id}`);
    // $router.push({ name: 'message', params: { roomId: id } });
  };

  ws_.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws_.onclose = (event) => {
    console.log("WebSocket connection closed:", event);
  };

  // Optionally, you can also handle incoming messages using:
  ws_.onmessage = (event) => {
    console.log("Received message:", event.data);
  };

  $q.notify({
    message: "Success",
    color: 'green-4',
    textColor: 'white',
    // icon: 'thumb_up',
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
