import { createRouter, createWebHistory } from 'vue-router';
import generalRouters from './generals';
import permissionRouters from './permissions';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...generalRouters,
        ...permissionRouters
    ]
})

export default router;