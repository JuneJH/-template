import { RouteRecordRaw } from 'vue-router';
import Layout from '../layouts/index.vue';
import Home from '../pages/index.vue';
import About from '../pages/about/index.vue';

const permissions: RouteRecordRaw[] = [
    {
        path: "/",
        component: Layout,
        children: [
            {
                path:"/",
                component:Home,

            },{
                name: "about",
                path: "/about",
                component: About
            }
        ]
    }
];


export default permissions;