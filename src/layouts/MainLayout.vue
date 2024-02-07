<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Branch CS Messaging App
        </q-toolbar-title>

        <q-space />
        <q-btn round dense flat color="grey-8" icon="logout" @click="logOut">
          <q-tooltip>Logout</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <q-item
          clickable
          v-show="userMenu"
          href="/user-home"
        >
          <q-item-section
            avatar
          >
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-show="adminMenu"
          href="/admin-home"
        >
          <q-item-section
            avatar
          >
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-show="adminMenu"
          href="/all-users"
        >
          <q-item-section
            avatar
          >
            <q-icon name="fa-solid fa-user" />
          </q-item-section>

          <q-item-section>
            <q-item-label>All Users</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-show="adminMenu"
          href="/all-admins"
        >
          <q-item-section
            avatar
          >
            <q-icon name="fa-solid fa-user" />
          </q-item-section>

          <q-item-section>
            <q-item-label>All Admin Users</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-show="userMenu"
          href="/chat"
          >
          <!-- v-show="userMenu" -->
          <q-item-section
            avatar
          >
            <q-icon name="fa-brands fa-rocketchat" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Chat</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-show="adminMenu"
          href="/all-chats"
          >
          <!-- v-show="userMenu" -->
          <q-item-section
            avatar
          >
            <q-icon name="fa-brands fa-rocketchat" />
          </q-item-section>

          <q-item-section>
            <q-item-label>All Chat Rooms</q-item-label>
          </q-item-section>
        </q-item>

        <!-- <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        /> -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useUserStore } from '../stores/user-store'
import { useAdminStore } from '../stores/admin-store'
import { useRouter } from 'vue-router'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    // EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    
    const useUsStore = useUserStore()
    const useAdStore = useAdminStore()

    const userMenu = ref(false);
    const adminMenu = ref(false);
    // const $q = useQuasar()
    const $router = useRouter()

    function logOut () {
      $router.replace('/')
      // useStore.clearAdmin;
      useUsStore.logout();
      useAdStore.logout();
      // localStorage.removeItem('user');
      // localStorage.removeItem('admin');
    }
    function user_Menu () {
      if (useUsStore.userid != null) {
        userMenu.value = true;
      }
    }
    function admin_Menu () {
      if (useAdStore.adminid != null) {
        adminMenu.value = true;
      }
    }

    onMounted(() => {
      admin_Menu();
      user_Menu();
    });

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      userMenu,
      adminMenu,
      admin_Menu,
      user_Menu,
      logOut,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
