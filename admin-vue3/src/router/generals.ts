import { RouteRecordRaw } from 'vue-router';
import NotPermissions from "../pages/error/403.vue";
import NotFound from '../pages/error/404.vue';

const generalRouters: Readonly<RouteRecordRaw[]> = [
    {
        name: "404",
        path: "/404",
        component: NotFound,
    }, {
        name: "403",
        path: "/403",
        component: NotPermissions
    }
];

export default generalRouters;