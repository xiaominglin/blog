<template>
    <div class="layout">
      <div class="siderbar-wrapper" :style="{width: this.isCollapsed?'50px':'200px'}">
        <div class="logo-wrapper">
          logo
        </div>
        <el-menu
          background-color="#424f63"
          text-color="#fff"
          active-text-color="#65cea7"
          class="menu-wrapper"
          router
          unique-opened
          :collapse="isCollapsed"
          :default-active="$route.path">
          <template v-for="(item, index) in sider_menu_data">
            <el-menu-item class="menu-item" v-if="!item.children" :index="item.path" :key="index">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
            <el-submenu v-else :index="item.path">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
              </template>
              <el-menu-item class="menu-item" v-for="(sub_item, sub_index) in item.children" :index="sub_item.path"
                            :key="sub_index">
                <span slot="title" style="margin-left:12px;">{{sub_item.title}}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </div>
      <div class="topbar-wrapper" :style="{left: this.isCollapsed?'50px':'200px'}">
        <div class="menu-collapse-wrapper float-left" @click="toggleMenu">
          <i class="el-icon-adm-menu el-icon-s-fold" :style="{transform: 'rotateZ(' + (this.isCollapsed ? '90' : '0') + 'deg)'}"></i>
        </div>
        <div class="title float-left">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <ul class="menu-list float-right">
          <li v-if="user" class="menu-item" style="padding: 0;">
            <el-dropdown
              :show-timeout="10"
              :hide-timeout="10"
              style="padding: 0 15px;">
              <div class="dropdown-content el-dropdown-link">
                <i class="icon el-icon-adm-usersetup el-icon-user-solid"></i>
                <span class="text">{{user.name || user.username}}</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>{{user.username}}</el-dropdown-item>
                <el-dropdown-item>{{user.name}}</el-dropdown-item>
                <el-dropdown-item>{{user.type.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li class="menu-item">
            <i class="icon el-icon-adm-help el-icon-s-help"></i>
          </li>
          <li class="menu-item" @click="exit">
            <i class="icon iconfont el-icon-eleme"></i>
          </li>
        </ul>
      </div>
      <div class="content-wrapper" ref="content-wrapper" :style="{left: this.isCollapsed?'50px':'200px'}">
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>


<script>
export default {
    data () {
      return {
          user: {
            username: "admin",
            name: "admin001",
            type: {
              name: "admin002"
            }
          },
          sider_menu_data: [
          {
            path: '/home',
            title: '首页',
            icon: 'el-icon-location'
          },
          {
            path: '/system',
            title: '系统管理',
            icon: 'el-icon-setting',
            children: [
              {path: '/system/winfo', title: '网站信息'},
              {path: '/system/slide', title: '幻灯片管理'},
              {path: '/system/flink', title: '友情链接'},
              {path: '/system/log', title: '操作日志'}
            ]
          },
          {
            path: '/power',
            title: '权限管理',
            icon: 'el-icon-setting',
            children: [
              {path: '/power/roles', title: '角色管理'},
              {path: '/power/admin', title: '管理员'}
            ]
          },
          {
            path: '/user',
            title: '用户管理',
            icon: 'el-icon-document',
            children: [
              {path: '/user/index', title: '本站用户'}
            ]
          },
          {
            path: '/article',
            title: '门户管理',
            icon: 'el-icon-document',
            children: [
              {path: '/article/index', title: '文章管理'},
              {path: '/article/category', title: '文章分类'},
              {path: '/article/tag', title: '文章标签'}
            ]
          },
          {
            path: '/test/index',
            title: '测试',
            icon: 'el-icon-menu'
          }
        ],
        isCollapsed : false
      }
    },
    methods: {
      toggleMenu() {
        this.isCollapsed = !this.isCollapsed;
      },
      exit() {
        this.$confirm('即将退出系统登陆，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          //设置token为空
          this.$router.replace({path: '/login'});
        })
        .catch(() => {
          return false;
        })
      }
  }
}
</script>

<style lang="scss" scoped>
 @import '../../assets/styles/variable';
  
  .siderbar-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: $siderbarWidth;
    z-index: 11;
    background-color: $siderbarBackgroundColor;
    transition: all 0.3s ease-in-out;
    
    .logo-wrapper {
      height: 40px;
      line-height: 40px;
      padding: 16px 0;
      text-align: center;
      font-size: 24px;
      color: #FFFFFF;
      color: #65CEA7;
    }
    
    .menu-wrapper {
      position: absolute;
      top: 72px;
      bottom: 0;
      width: 100%;
      border-right: none;
      transition: all 0.3s ease-in-out;
      
      &:not(.el-menu--collapse) {
        overflow-y: auto;
        overflow-x: hidden;
      }
      
      i {
        color: #FFFFFF;
      }
      
      .menu-item {
        
        &.is-active, &:hover {
          background-color: #353F4F !important;
          color: #65CEA7 !important;
          
          i {
            color: #65CEA7 !important;
          }
        }
        
      }
      
      .el-submenu__title:hover {
        color: #65CEA7 !important;
        
        i {
          color: #65CEA7 !important;
        }
      }
      
      .el-submenu, .el-menu-item {
        width: 100%;
      }
    }
  }
  
  .topbar-wrapper {
    position: fixed;
    left: $siderbarWidth;
    right: 0;
    top: 0;
    height: $topbarHeight;
    line-height: $topbarHeight;
    padding: 0 24px 0 0;
    background-color: $topbarBackgroundColor;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    transition: all 0.3s ease-in-out;
    z-index: 12;
    
    .menu-collapse-wrapper {
      height: 100%;
      width: 48px;
      text-align: center;
      cursor: pointer;
      
      i {
        transition: all 0.3s ease-in-out;
      }
    }
    
    .title {
      padding:17px 5px;
    }
    
    .menu-list {
      .menu-item {
        position: relative;
        float: left;
        padding: 0 15px;
        min-width: 45px;
        text-align: center;
        font-size: 0px;
        line-height: 0;
        
        &:hover {
          cursor: pointer;
          background-color: #F5F5F5;
        }
        
        .icon {
          vertical-align: middle;
          font-size: 24px;
        }
        
        .text {
          display: inline-block;
          vertical-align: middle;
          margin-left: 4px;
          font-size: 16px;
        }
      }
    }
  }
  
  .content-wrapper {
    position: fixed;
    left: $siderbarWidth;
    right: 0;
    top: $topbarHeight;
    bottom: 0;
    padding: 16px;
    overflow: auto;
    transition: all 0.3s ease-in-out;
    
    .content {
      position: relative;
      width: 100%;
      height: 100%;
      // overflow-y: hidden;
    }
  }

  .float-left {
    float: left;
  }
  .float-right {
    float: right;
  }
</style>