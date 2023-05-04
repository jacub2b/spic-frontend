import Vuex from 'vuex'
import {axiosIns} from "../../axios.config";

export const store = new Vuex.Store({
    state: {
        isLogged: false,
        username: null
    },
    mutations: {
        LOGOUT: state => state.isLogged = false,
        LOGIN: state => state.isLogged = true,
        SET_USERNAME: (state, username) => state.username = username
    },
    actions: {
        logout(context) {
            context.commit('LOGOUT')
            context.commit('SET_USERNAME', null)
            localStorage.removeItem('jwt_token')
            location.reload()
        },
        login(context, {username, token}) {
            axiosIns.defaults.headers.common['Authorization'] = `Bearer ${token}`
            localStorage.setItem('jwt_token', token)
            context.commit('LOGIN')
            context.commit('SET_USERNAME', username)
        },
        loginWithToken(context, token) {
            try {
                const {username} = JSON.parse(atob(token.split('.')[1]))
                context.dispatch('login', {username, token})
            } catch {}
        }
    },
    getters: {
        isLogged: state => state.isLogged,
        getUsername: state => state.username
    }
})