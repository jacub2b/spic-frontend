import {createRouter, createWebHistory} from 'vue-router'
import Welcome from "@/components/Welcome";
import PicturesView from "@/components/PicturesView";
import Register from "@/components/Register";
import Login from "@/components/Login"

const routes = [
    {
        path: '/',
        component: Welcome
    },
    {
        path: '/categories/:category/pictures',
        component: PicturesView,
        props: true
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router