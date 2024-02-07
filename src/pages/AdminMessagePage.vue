<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 600px">
        <q-chat-message
          v-for="chat in messages"
          :key="chat.roomId"
          :name="chat.username"
          :text="[chat.content]"
          :sent="chat.type === 'self'"
        />
        <!-- <ChatMessage :data={messages} /> -->
      </div>
    </div>

    <div>
      <q-footer>
        <!-- <q-form @submit.prevent="onSubmit"> -->
          <q-toolbar class="bg-primary text-white row">
            <!-- <q-btn round flat icon="insert_emoticon" class="q-mr-sm" /> -->
            <q-input
              v-model="message"
              class="col-grow q-mr-sm"
              bg-color="white"
              placeholder="Type a message"
              dense
              outlined
              rounded
              autofocus
              ref="inputFocus"
            />
            <q-btn round flat icon="send" type="submit" @click="sendMessage" />
          </q-toolbar>
        <!-- </q-form> -->
      </q-footer>
  </div>
    </div>
    <!-- <q-separator /> -->
    
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch} from 'vue'
import { axios, api, ws } from 'boot/axios'
import { LocalStorage , useQuasar } from 'quasar'
import { useUserStore } from '../stores/user-store'
import { useWebSocketStore } from '../stores/websocket-store'
import { useRoute, useRouter } from 'vue-router'
import ChatMessage from '../components/chat_message.vue'
// import ChatMessage from '../components/chat_message'
import autosize from 'autosize';

const name = 'RealtorPage'

const card = ref(false)
const slide = ref(1)
const data = ref([])
let messages = ref([])
let users = ref([])
const message = ref('')
const currentMessage = ref("")
const loadingCreateRoom = ref(false)
const useStore = useUserStore()
const useWebStore = useWebSocketStore()
const $q = useQuasar()
const $router = useRouter()
const $route = useRoute()
var token = useStore.getToken
var userid = useStore.userid
var username_ = useStore.username
let conn = useWebStore.ws
// let conn = useWebStore.adminws
let roomId = $route.params.roomId;
const API_URL = `wss://branch-task-backend.up.railway.app/api/v1`;
const API_URL_HTTP = `https://branch-task-backend.up.railway.app/api/v1`;
// const API_URL = `ws://localhost:3000/api/v1`;
// const API_URL_HTTP = `http://localhost:3000/api/v1`;


// const onSubmit = async () => {
//   loadingCreateRoom.value = true
//   const fD = new FormData();
//   fD.append("id", userid);
//   fD.append("category", category.value);

//   await api.post(`/ws/createRoom`, fD, {
//     headers: { 'Content-Type': 'multipart/form-data' },})
//     .then((response) => {
//       data.value = response.data
//       console.log(response.data, "create room data")
//       // $q.notify({
//       //   message: "Almost done",
//       //   color: 'green-4',
//       //   textColor: 'white',
//       //   // icon: 'thumb_up',
//       // })
//       const id = data.value.id;
//       // console.log(`/ws/joinRoom/${id}/${userid}/${username}`, "ws")
//       console.log(api, "api")
//       const wsEndpoint = `ws://localhost:3000/api/v1/ws/joinRoom/${id}/${userid}/${username}`
//       // const wsEndpoint = `${ws}/ws/joinRoom/${id}/${userid}/${username}`
//       const ws_ = new WebSocket(wsEndpoint)
//       // console.log(wsEndpoint, "wsEndpoint")
//       // console.log(ws_, "ws_")
//       // if (ws_.OPEN) {
//         //   LocalStorage.set("userChat", ws_);
//         //   $router.push('/dashboard')
//         //   return
//       // }
//       ws_.onopen = () => {
//         console.log("WebSocket connection opened");
//         LocalStorage.set("userChat", ws_);
//         $router.push('/dashboard');
//       };

//       ws_.onerror = (error) => {
//         console.error("WebSocket error:", error);
//       };

//       ws_.onclose = (event) => {
//         console.log("WebSocket connection closed:", event);
//       };

//       // Optionally, you can also handle incoming messages using:
//       ws_.onmessage = (event) => {
//         console.log("Received message:", event.data);
//       };
//       $q.notify({
//         message: "Success",
//         color: 'green-4',
//         textColor: 'white',
//         // icon: 'thumb_up',
//       })
//       // $router.push('/')
//     })
//     .catch(() => {
//       $q.notify({
//         color: 'negative',
//         position: 'bottom',
//         message: 'Starting a chat failed',
//         icon: 'report_problem'
//       })
//     })
//     loadingCreateRoom.value = false;
// }

// const onReset = () => {
//   category.value = null
// }

// watch(() => {
//   var decoded = useStore.checkToken(token);
//   console.log(decoded);
//   console.log("token decoded");
//   if (decoded == true) {
//     useStore.logout();
//     // useStore.logout();
//     $router.replace('/')
//     $router.go();
//   }
// })

// TEST


// watch(
//   () => [conn, messages, users],
//   () => {
//     if (conn) {
//       conn.onmessage = (message) => {
//     // if (conn.value) {
//     //   conn.value.onmessage = (message) => {
//         const m = JSON.parse(message.data);
//         // if (m.content === username + " is Ready to chat") {
//         if (m.content === 'A new user has joined the room') {
//           users.value = [...users.value, { username: m.username }];
//         }

//         if (m.content === 'user left the chat') {
//           users.value = users.value.filter((u) => u.username !== m.username);
//           messages.value = [...messages.value, m];
//           return;
//         }

//         m.type = username_ === m.username ? 'self' : 'recv';
//         // m.type = user.value?.username === m.username ? 'self' : 'recv';
//         messages.value = [...messages.value, m];
//       };
//     }
//   },
//   { immediate: true }
// );

// const sendMessage = () => {
//   if (!currentMessage.value) return;
//   if (!conn) {
//   // if (!conn.value) {
//     $router.push('/dashboard');
//     return;
//   }

//   conn.send(currentMessage.value);
//   // conn.value.send(currentMessage.value);
//   currentMessage.value = '';
// };

// onMounted( async () => {
//   if (!conn) {
//   // if (!conn.value) {
//     await $router.push('/dashboard');
//     return;
//   }

//   // const roomId = conn.value.url.split('/')[5];
//   try {
//     const res = await fetch(`${API_URL_HTTP}/ws/getClients/${roomId}`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     const data = await res.json();
//     users.value = data;
//     console.log(users.value, "users.value");
//   } catch (e) {
//     console.error(e);
//   }
// })


onMounted(async () => {
  if (conn === null) {
    await $router.push('/dashboard')
    return
  }

  // const roomI_d = conn.url.split('/')[5]
  // console.log(roomI_d, "roomI_d")
  try {
    const res = await fetch(`${API_URL_HTTP}/ws/getClients/${roomId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()
    
    users.value = data
    console.log(users.value, "users.value")
  } catch (e) {
    console.error(e)
  }

  if (message.value) {
    autosize(message.value)
  }

  conn.onmessage = (message) => {
    const m = JSON.parse(message.data)
    if (m.content == 'A new user has joined the room') {
      users.value = [...users.value, { username: m.username }]
    }

    if (m.content == 'user left the chat') {
      const deleteUser = users.value.filter((user) => user.username != m.username)
      users.value = [...deleteUser]
      messages.value = [...messages.value, m]
      return
    }

    username_ == m.username ? (m.type = 'self') : (m.type = 'recv')
    // user.username == m.username ? (m.type = 'self') : (m.type = 'recv')
    messages.value = [...messages.value, m]
  }

  conn.onclose = () => {}
  conn.onerror = () => {}
  conn.onopen = () => {}
})

const sendMessage = () => {
  if (!message.value) return
  if (conn === null) {
    $router.push('/dashboard')
    return
  }

  console.log("conn.send()");
  conn.send(message.value)
  // console.log(message.value, "message");
  // console.log(messages.value, "value");
  message.value = ''
}


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
