<template>
  <div class="tmshead-container">
    <h1 class="tmshead-tit">后台管理系统</h1>
    <!--一级菜单-->
    <ul class="first-menu">
      <li class="firstmenu-item" :class="{active: activeIndex==index}" v-for="(item, index) in menuList" :key="index" @click="changeSecondMenu(index)">
        <div class="item-inner">
          <i class="iconfont" :class="item.miIconname"></i>
          <p class="menu-text">{{item.miName}}</p>
        </div>
      </li>
    </ul>
    <div class="head-right hidden-xs">
      <div class="notice" v-if="false">
        <el-badge :value="12" class="item">
          <i class="iconfont icon-tongzhi"></i>
        </el-badge>
      </div>
      <div class="message" v-if="false">
        <i class="iconfont icon-informatiom"></i>
      </div>
      <div class="user">
        <div class="user-avatar">
          <i class="iconfont icon-gerenyonghutouxiang2"></i>
        </div>
        <ul class="drop-menu">
          <li @click="handleModifyPwd">
            <i class="iconfont icon-icon-"></i>
            修改密码
          </li>
          <li @click="handleLogout">
            <i class="iconfont icon-tuichu5"></i>
            退出系统
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { removeItem } from '../utils/localStorage'
export default {
  name: 'tmsHead',
  props: {
    menuList: {
      type: Array
    },
    activeMenuIndex: {
      type: Number
    }
  },
  data () {
    return {
      activeIndex: null
    }
  },
  mounted () {
    this.activeIndex = this.getActiveIndex(this.$route.fullPath)
  },
  methods: {
    getActiveIndex (routePath) {
      let curFirstMenu = routePath.substring(1).split('/')[0]
      for (let i = 0; i < this.menuList.length; i++) {
        if (curFirstMenu === this.menuList[i].miLink) {
          return i
        }
      }
    },
    changeSecondMenu (index) {
      if (this.menuList[index].miLink === '') {
        this.$router.push(`/index/notFound}`)
      }
      this.activeIndex = index
      this.$emit('changeMenu', index)
    },
    // 修改密码
    handleModifyPwd () {
      this.$router.push('/systemSetting/baseSetting/modifyPwd')
    },
    // 退出登录
    handleLogout () {
      this.axios.post(this.ajaxUrl + '/sys/login/logout').then(res => {
        if (res.data.code === 0) {
          this.$message({
            type: 'success',
            message: '登出成功！'
          })
          removeItem('userInfo')
          this.$router.push('/login')
        } else {
          this.$message({
            type: 'error',
            message: '服务器出错啦！'
          })
        }
      })
    }
  },
  watch: {
    $route (val) {
      if (val) {
        this.activeIndex = this.getActiveIndex(val.fullPath)
      }
    }
  }
}
</script>
