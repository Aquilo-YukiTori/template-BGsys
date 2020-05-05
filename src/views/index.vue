<template>
  <div class="index-page">
    <!--顶部logo、一级菜单-->
    <tms-head :menuList="menuList" @changeMenu="handleChangeMenu"></tms-head>
    <div class="indexpage-main">
      <!--左侧二级菜单-->
      <tms-menu :secondMenu="secondMenuList"></tms-menu>
      <!--右侧主体内容-->
      <div class="indexpage-main-right">
        <tags-view @tagChange="opentagChange"></tags-view>
        <keep-alive :include="opentag">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import tmsMenu from '@@/menu'
import tmsHead from '@@/head'
import tagsView from '@@/tagsView'
import { getItem } from '../utils/localStorage'
export default {
  name: 'index',
  components: { tmsMenu, tmsHead, tagsView },
  data () {
    return {
      userInfo: {},
      opentag: [], // 当前打开的tab页签
      list: [], // 菜单
      menuList: [],
      activeMenuIndex: null,
      secondMenuList: []
    }
  },
  created () {
    this.$router.push('/welcome')
    // 获取菜单信息
    this.userInfo = JSON.parse(getItem('userInfo'))
    this.axios.post(this.ajaxUrl + '/sys/menu/userMenuList', { stId: this.userInfo.stId }).then(res => {
      if (res.data.code === 0) {
        this.menuList = res.data.data.userMenuList
        this.$store.commit('addMenuList', this.getThirdMenu(this.menuList, 'actRoleMenuVoList'))
        let controlList = {}
        for (let i = 0; i < res.data.data.userControlList.length; i++) {
          if (controlList[res.data.data.userControlList[i].miId]) {
            controlList[res.data.data.userControlList[i].miId].push(res.data.data.userControlList[i])
          } else {
            controlList[res.data.data.userControlList[i].miId] = [res.data.data.userControlList[i]]
          }
        }
        this.$store.commit('addControlList', controlList)
      }
    })
    this.getSecondMenu(this.$route.fullPath)
  },
  methods: {
    handleChangeMenu (index) {
      this.secondMenuList = this.menuList[index].actRoleMenuVoList
    },
    getSecondMenu (routePath) {
      let curFirstMenu = routePath.substring(1).split('/')[0]
      for (let i = 0; i < this.menuList.length; i++) {
        if (curFirstMenu === this.menuList[i].miLink) {
          this.activeMenuIndex = i
          this.secondMenuList = this.menuList[i].actRoleMenuVoList
        }
      }
    },
    // keep-alive 缓存的组件
    opentagChange (val) {
      this.opentag.splice(0, this.opentag.length)
      for (let i = 0; i < val.length; i++) {
        this.opentag.push(val[i].name)
      }
    },
    getThirdMenu (list, lable, id) {
      let arr = []
      let result = []
      let getArr = function (item) {
        for (let i = 0; i < item[lable].length; i++) {
          if (!item[lable][i][lable]) {
            arr.push(item[lable][i])
          } else if (item[lable][i][lable] && item[lable][i][lable].length) {
            getArr(item[lable][i])
          }
        }
      }
      for (let i = 0; i < list.length; i++) {
        if (!list[i][lable]) {
          arr.push(list[i])
        } else if (list[i][lable] && list[i][lable].length) {
          getArr(list[i])
        }
      }
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].miLink) {
          result.push({
            miLink: arr[i].miLink,
            miId: arr[i].miId
          })
        }
      }
      result = result.concat([{ miLink: '/login' }, { miLink: '/index' }, { miLink: '/permissionDeny' }, { miLink: '/welcome' }, { miLink: '/notFound' }])
      return result
    }
  },
  watch: {
    $route (val) {
      this.getSecondMenu(this.$route.fullPath)
    }
  }
}
</script>
