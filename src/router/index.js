import {createRouter, createWebHistory} from 'vue-router'
import Welcome from "@/components/Welcome";
import PicturesView from "@/components/PicturesView";

const routes = [
    {
        path: '/',
        component: Welcome
    },
    {
        path: '/categories/:category/pictures',
        component: PicturesView,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router