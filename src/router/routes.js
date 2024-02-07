
const routes = [
  {
    path: '/',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/admin-login',
    component: () => import('pages/AdminLoginPage.vue'),
  },
  {
    path: '/user-signup',
    component: () => import('pages/UserSignupPage.vue'),
  },
  {
    path: '/admin-signup',
    component: () => import('pages/AdminSignupPage.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requireLogin: true } },
      // { path: '/properties', component: () => import('pages/PropertyPages.vue'), meta: { requireLogin: true } },
      { path: '/user-home', component: () => import('pages/UserHomePage.vue'), meta: { requireLogin: true } },
      { path: '/admin-home', component: () => import('pages/AdminHomePage.vue'), meta: { requireLogin: true } },
      { path: '/all-users', component: () => import('pages/AllUsersPage.vue'), meta: { requireLogin: true } },
      { path: '/all-admins', component: () => import('pages/AllAdminsPage.vue'), meta: { requireLogin: true } },
      { path: '/chat', component: () => import('pages/ChatRoomPage.vue'), meta: { requireLogin: true } },
      { path: '/all-chats', component: () => import('pages/AllChatRoomPage.vue'), meta: { requireLogin: true } },
      { path: '/message/:roomId?', component: () => import('pages/MessagePage.vue'), meta: { requireLogin: true } },
      { path: '/admin-message/:roomId?', component: () => import('pages/AdminMessagePage.vue'), meta: { requireLogin: true } },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
