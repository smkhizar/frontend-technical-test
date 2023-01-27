import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home-view",
    component: HomeView,
  },
  {
    path: "/realtors",
    name: "realtors",
    component: HomeView,
  },
  {
    path: "/realtors/:realtor_id",
    name: "realtor",
    component: HomeView,
  },
  {
    path: "/realtors/:realtor_id/messages",
    name: "realtor-messages",
    component: HomeView,
  },
  {
    path: "/realtors/:realtor_id/messages/:message_id",
    name: "realtor-message",
    component: HomeView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
