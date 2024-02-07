import { defineStore } from 'pinia';
import { api, base, axios } from 'src/boot/axios';
import { jwtDecode } from 'jwt-decode';

export const useUserStore = defineStore('user', {
  state: () => ({
    usertype: null,
    firstname: null,
    lastname: null,
    email: null,
    token: null,
    userid: null,
    username: null,
    phone: null
  }),
  // persist: true, // Note that we are using a persisted state here
  getters: {
    getUsertype: (state) => state.usertype,
    getFirstname: (state) => state.firstname,
    getLastname: (state) => state.lastname,
    getEmail: (state) => state.email,
    getToken: (state) => state.token,
    getUserId: (state) => state.userid,
    getUsername: (state) => state.username,
    getPhoneNumber: (state) => state.phone
  },
  actions: {
    // async getSanctumCookie() {
    //   try {
    //     await api.get('sanctum/csrf-cookie')
    //   } catch (error) {
    //     if (error) throw error
    //   }
    // },

    async login(email, password) {
      try {
        // return await axios.post('/users/login/', { email, password })
        return await api.post('/users/login', { email, password })
      } catch (error) {
        if (error) throw error
      }
    },

    async fetchUser() {
      try {
        return await api.get('api/user')
      } catch (error) {
        if (error) throw error
      }
    },

    setUser(payload) {
      if(payload.usertype) this.usertype = payload.usertype;
      if(payload.firstname) this.firstname = payload.firstname;
      if(payload.lastname) this.lastname = payload.lastname;
      if(payload.email) this.email = payload.email;
      if(payload.userid) this.userid = payload.userid;
      if(payload.username) this.username = payload.username;
      if (payload.phone) this.phone = payload.phone;
    },

    setToken(payload) {
      if(payload.token) this.token = payload.token;
    },

    clearUser(){
      this.usertype = null,
      this.firstname = null,
      this.lastname = null,
      this.email = null,
      this.token = null,
      this.userid = null,
      this.username = null,
      this.phone = null
    },

    checkToken() {
      // if (!this.token) {
        // const decodedToken = JSON.parse(atob(this.token.split('.')[1]));
        // const expirationTime = decodedToken.exp * 1000;
        // return Date.now() > expirationTime;
      const decodedToken = jwtDecode(this.token);
      const expirationTime = decodedToken.exp * 1000;
      return Date.now() > expirationTime;
        // this.logout()
      // }
    },

    logout() {
      // Clear token and redirect to login page
      this.usertype = null;
      this.firstname = null;
      this.lastname = null;
      this.email = null;
      this.token = null;
      this.userid = null;
      this.username = null;
      this.phone = null;
    //   router.push('/');
      localStorage.removeItem('user');
    },
  },
  persist: true,
});