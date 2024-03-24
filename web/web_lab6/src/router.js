import { createRouter, createWebHashHistory } from 'vue-router'
//import Auth from "./components/Auth.vue"
import Main from "./components/Main"
import NotFound from "./components/NotFound"
import Admin from "./components/Admin"
const routes = [
{ path: '/main', name: 'Main', component: Main },
{ path: '/admin', name: 'Admin', component: Admin },
{ path: '/', name: 'Auth',
// Создаст компонент, lazy-подгружаемый при первом обращении
component: () => import('./components/Auth.vue')
},
{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]
const router = createRouter({
history: createWebHashHistory(),
routes
})
export default router