import { defineStore } from 'pinia';

export const useWebSocketStore = defineStore('webSocketStore', {
  state: () => ({
    ws: null,
    adminws: null,
  }),
  actions: {
    setWebSocket(ws) {
      this.ws = ws;
    },
    setAdminWebSocket(adminws) {
      this.adminws = adminws;
    },
  },
  persist: true,
});
