<template>
  <q-page class="q-pa-md">
    <q-separator />
    <div class="q-gutter-y-md q-pt-md" full-width>
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" v-for="(room, index) in data" :key="index">
          <q-card-section :class="[getBgColor(room.category), 'text-white']">
            <div class="text-center">
              <div class="text-h6">
                Category: {{ room.category }}
               </div>
              <div class="text-subtitle6">
                Room ID:{{ room.id }}
               </div>
               <div>
                 <div class="text-subtitle6">
                  Room Name: {{ room.name }}
                 </div>
               </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat @click="joinRoom(room.id)">Join Chat...</q-btn>
          </q-card-actions>
        </q-card>

      </div>

    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch} from 'vue'
import { axios, api, base } from 'boot/axios'
import { copyToClipboard, useQuasar } from 'quasar'
import { useAdminStore } from '../stores/admin-store'
import { useWebSocketStore } from '../stores/websocket-store'
import { useRouter } from 'vue-router'

const name = 'RealtorPage'

const card = ref(false)
const data = ref([])
const viewMoreData = ref({})
const category = ref("")
const useStore = useAdminStore()
const useWebStore = useWebSocketStore()
const $q = useQuasar()
const $router = useRouter()
var token = useStore.getToken
var adminid = useStore.adminid
var username = useStore.username

const getBgColor = (category) => {
  switch (category) {
    case 'Account':
      return 'bg-red';
    case 'Transfer':
      return 'bg-blue';
    case 'Interest':
      return 'bg-green';
    case 'Loan':
      return 'bg-yellow';
    case 'Update':
      return 'bg-orange';
    case 'Airtime_Data':
      return 'bg-purple';
    case 'Bills':
      return 'bg-cyan';
    case 'Others':
      return 'bg-pink';
    default:
      return 'bg-primary';
  }
}

const joinRoom = async (id) => {
  // loadingCreateRoom.value = true
  // const fD = new FormData();
  // fD.append("id", userid);
  // fD.append("category", category.value);

  const wsEndpoint = `wss://branch-task-backend.up.railway.app/api/v1/ws/joinRoom/${id}/${adminid}/${username}`
  // const wsEndpoint = `ws://localhost:3000/api/v1/ws/joinRoom/${id}/${adminid}/${username}`
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
        // useWebStore.setAdminWebSocket(ws_);
        $router.push(`/admin-message/${id}`);
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

  // await api.post(`/ws/createRoom`, fD, {
  //   headers: { 'Content-Type': 'multipart/form-data' },})
  //   .then((response) => {
  //     data.value = response.data
  //     console.log(response.data, "create room data")
  //     // $q.notify({
  //     //   message: "Almost done",
  //     //   color: 'green-4',
  //     //   textColor: 'white',
  //     //   // icon: 'thumb_up',
  //     // })
  //     const id = data.value.id;
  //     // console.log(`/ws/joinRoom/${id}/${userid}/${username}`, "ws")
  //     console.log(api, "api")
  //     const wsEndpoint = `ws://localhost:3000/api/v1/ws/joinRoom/${id}/${userid}/${username}`
  //     // const wsEndpoint = `${ws}/ws/joinRoom/${id}/${userid}/${username}`
  //     const ws_ = new WebSocket(wsEndpoint)
  //     // console.log(wsEndpoint, "wsEndpoint")
  //     // console.log(ws_, "ws_")
  //     // if (ws_.OPEN) {
  //       //   LocalStorage.set("userChat", ws_);
  //       //   $router.push('/dashboard')
  //       //   return
  //     // }
  //     ws_.onopen = () => {
  //       console.log("WebSocket connection opened");
  //       useWebStore.setWebSocket(ws_);
  //       $router.push(`/message/${id}`);
  //       // $router.push({ name: 'message', params: { roomId: id } });
  //     };

  //     ws_.onerror = (error) => {
  //       console.error("WebSocket error:", error);
  //     };

  //     ws_.onclose = (event) => {
  //       console.log("WebSocket connection closed:", event);
  //     };

  //     // Optionally, you can also handle incoming messages using:
  //     ws_.onmessage = (event) => {
  //       console.log("Received message:", event.data);
  //     };
  //     $q.notify({
  //       message: "Success",
  //       color: 'green-4',
  //       textColor: 'white',
  //       // icon: 'thumb_up',
  //     })
  //     // $router.push('/')
  //   })
  //   .catch(() => {
  //     $q.notify({
  //       color: 'negative',
  //       position: 'bottom',
  //       message: 'Starting a chat failed',
  //       icon: 'report_problem'
  //     })
  //   })
    // loadingCreateRoom.value = false;
}

const loadData = () => {
  // const token = useStore.getToken
  console.log(token, "token");
  api.get(`/ws/getRooms`,
    { headers: { "Authorization": `Bearer ${token}` }, })
    .then((response) => {
      data.value = response.data.reverse()
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
        message: 'Rooms not found',
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
  loadData();
})

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px

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
