import Vue from 'vue';
import VueRouter from 'vue-router';
import RegisterView from "@/views/RegisterView.vue";
import ChangePasswordForgottenView from "@/views/ChangePasswordForgottenView.vue";
import SolveProblemView from "@/views/SolveProblemView.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: SolveProblemView,
    },
    {
        path: '/login',
        name: 'login',
        component: RegisterView,
    },
    {
        path: '/forgot-password/:code',
        name: 'forgotPassword',
        component: ChangePasswordForgottenView,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
