import Vue from 'vue';
import VueRouter from 'vue-router';
import RegisterView from "@/views/RegisterView.vue";
import ChangePasswordForgottenView from "@/views/ChangePasswordForgottenView.vue";
import SolveProblemView from "@/views/SolveProblemView.vue";
import MyProblemsView from "@/views/MyProblemsView.vue";

import {requiredLogin, requiredLogout} from "@/middleware/auth.middleware";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: SolveProblemView,
        meta: {
            requiredAuth: true,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: RegisterView,
        meta: {
            requiredAuth: false,
        },
    },
    {
        path: '/forgot-password/:code',
        name: 'forgotPassword',
        component: ChangePasswordForgottenView,
        meta: {
            requiredAuth: false,
        },
    },
    {
        path: '/mis-problemas',
        name: 'mis-problemas',
        component: MyProblemsView,
        meta: {
            requiredAuth: true,
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach((to, from, next) => {

    // If exists requiredAuth meta key
    if(to.meta.requiredAuth !== undefined) {

        // If required auth
        if(to.meta.requiredAuth) {
            return requiredLogin({
                next,
            });
        } else {
            return requiredLogout({
                next,
            });
        }
    }

    return next();
});

export default router;
