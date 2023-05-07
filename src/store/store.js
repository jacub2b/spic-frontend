import Vuex from 'vuex'
import {axiosIns} from "../../axios.config";

export const store = new Vuex.Store({
    state: {
        isLogged: false,
        username: null,
        selectedPictures: []
    },
    mutations: {
        LOGOUT: state => state.isLogged = false,
        LOGIN: state => state.isLogged = true,
        SET_USERNAME: (state, username) => state.username = username,
        UPDATE_PICTURES: (state, selectedPictures) => state.selectedPictures = selectedPictures
    },
    actions: {
        logout(context) {
            context.commit('LOGOUT')
            context.commit('SET_USERNAME', null)
            localStorage.removeItem('jwt_token')
            location.href = '/'
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
        },
        updatePictures(context, selectedPictures) {
            context.commit('UPDATE_PICTURES', selectedPictures)
        }
    },
    getters: {
        isLogged: state => state.isLogged,
        getUsername: state => state.username
    }
})