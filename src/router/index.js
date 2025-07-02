import VueRouter from 'vue-router';

const router = new VueRouter({
  // 配置滚动行为
  scrollBehavior(to,from,savedPosition) {
     // 如果目标路由的 meta 中有 scrollToTop 且为 true
    if (to.meta.scrollToTop) {
      return { x: 0, y: 0 }; // 滚动到顶部
    }
    // 其他情况保持默认行为（如返回 savedPosition 则恢复之前的滚动位置）
    // savedPosition只在触发浏览器前进和后退才有值，所以在进行跳转时需要用back和forward
    return savedPosition || { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      // component: HomeView,
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
        {
      path: '/article',
      name: 'article',
      component: () => import('../views/ArticleView.vue'),
    },
     {
      path: '/file',
      name: 'file',
      component: () => import('../views/FileView.vue'),
    },
    {
      path: '/detail/route/:id',
      name: 'detail',
      component: () => import('../views/DetailView.vue'),
      meta: { scrollToTop: true }, // 需要滚动到顶部的路由
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue'),
    },
        {
      path: '/manager',
      name: 'manager',
      component: () => import('../views/ManagerView.vue'),
    },
  ],
})

export default router
