import VueRouter from 'vue-router'

const routes = [{path: '/', redirect: 'home'},{
    path: '/',
    name: 'nav',
    component: (resolve) => { require(['../view/nav.vue'], resolve)},
    children: [
        {
            path: 'home',
            name: 'home',
            component: (resolve) => { require(['../view/home/home.vue'], resolve)}
        }
    ]
}]

export default new VueRouter({
    routes // (缩写) 相当于 routes: routes
})
