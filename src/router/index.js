//引入路由和路由配置
import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginView from '@/pages/login/LoginView' 
import LayoutView from '@/pages/layout/LayoutView';
import HomeView from '@/pages/home/HomeView';
import TestView from '@/pages/test/TestView';



//使用路由
Vue.use(VueRouter)

//生成路由实例
const router = new VueRouter({
    mode: 'history',
	  routes: [ 
        {
            path: '/',
            redirect: '/login',
        },
	      { 
            path: '/login',  
            meta: {
                title: 'Login - 登录'
            },
			      name: 'LoginView', 
	          component: LoginView
        },
        {
            path: '',
            name: 'home',
            redirect: '/home',
            meta: {
              requireAuth: true
            },
            component: LayoutView,
            children: [
              {
                path: 'home',
                name: 'home',
                title: '首页',
                component: HomeView,
              }
            ]
        },
        //Main组件的子组件
        {
            path: '/system',
            name: 'system',
            title: '系统管理',
            meta: {
              requireAuth: true
            },
            component: LayoutView,
            children: [
              {
                path: 'winfo',
                name: 'syswinfo',
                title: '网站管理',
                component: () => import('@/pages/system/SysWinFoView')
              }, 
              {
                path: 'slide',
                name: 'sysslide',
                title: '幻灯片管理',
                component: () => import('@/pages/system/SysSlideView')
              },
              {
                path: 'flink',
                name: 'sysflink',
                title: '友情链接',
                component: () => import('@/pages/system/SysFlinkView')
              }, 
              {
                path: 'log',
                name: 'syslog',
                title: '操作日志',
                component: () => import('@/pages/system/SysLogView')
              }
            ]
        },
        {
          path: '/article',
          name: 'article',
          title: '门户管理',
          meta: {
            requireAuth: true
          },
          component: LayoutView,
          children: [
              {
                path: 'index',
                name: 'index',
                title: '文章管理',
                component: () => import('@/pages/article/IndexView')
              }
            ]
      },
      {
          path: '/test',
          name: 'test',
          title: '测试',
          meta: {
            requireAuth: true
          },
          component: LayoutView,
          children: [
            {
              path: 'index',
              name: 'test_index',
              title: '测试',
              component: TestView
            }
          ]
        }
	  ]
});
export default router