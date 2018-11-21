const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true}
    },
    {
      path: '/notes',
      name: 'Notes',
      component: Notes,
      params: {
        'foo': 'bar'
      },
      meta: { requiresAuth: true}
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu,
      meta: { requiresAuth: true}
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true}
    },
    {
      path: '/auth',
      name: 'Authenticator',
      component: components.Authenticator
    }
  ]
});

router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user;
    Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then((data) => {
      if (data && data.signInUserSession) {
        user = data;
      } 
    }).catch((e) => {
      console.log(e)
    });
    if (!user) {
      next({
        path: '/auth',
        query: {
          redirect: to.fullPath,
        }
      });
    }
    next()
  }
  next()
})
