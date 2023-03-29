import {createRouter, createWebHistory} from 'vue-router'
import Welcome from "@/components/Welcome";
import ImagesView from "@/components/ImagesView";

const routes = [
    {
        path: '/',
        component: Welcome
    },
    {
        path: '/categories/:category/images',
        component: ImagesView,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router