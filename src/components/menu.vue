<template>
  <div class="tmsmenu-container">
    <el-scrollbar class="tms-scrollbar">
      <div class="search">
        <input type="text" placeholder="关键字搜索" @focus="menuPop=true">
        <i class="iconfont icon-sousuo"></i>
      </div>
      <el-menu
        class="TMS-menu"
        :default-active="activePath"
        :unique-opened="true"
        background-color="rgb(67, 67, 67)"
        text-color="#fff"
        router>
        <el-submenu v-for="menu in secondMenuFilter" :key="menu.miName" :index="menu.miName">
          <template slot="title">
            <i class="iconfont" :class="menu.miIconname" v-if="menu.miIconname"></i>
            <span>{{menu.miName}}</span>
          </template>
          <el-menu-item v-for="subMenu in menu.actRoleMenuVoList" :key="subMenu.miName" :index="subMenu.miLink">{{subMenu.miName}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
    <!--搜索菜单 弹窗-->
    <el-dialog
      width="480px"
      :modal-append-to-body="true"
      :append-to-body="true"
      :visible.sync="menuPop">
      <search-menu @closePop="menuPop=false"></search-menu>
    </el-dialog>
  </div>
</template>

<script>
import searchMenu from '@@/searchMenu'
export default {
  name: 'tmsMenu',
  components: { searchMenu },
  props: {
    secondMenu: {
      type: Array
    }
  },
  data () {
    return {
      activePath: '',
      menuPop: false // 菜单搜索弹窗
    }
  },
  mounted () {
    this.activePath = this.$route.fullPath
  },
  computed: {
    secondMenuFilter () {
      let arr = []
      for (let i = 0; i < this.secondMenu.length; i++) {
        let voList = []
        if (this.secondMenu[i].actRoleMenuVoList) {
          for (let j = 0; j < this.secondMenu[i].actRoleMenuVoList.length; j++) {
            if (this.secondMenu[i].actRoleMenuVoList[j].miLink) {
              voList.push({
                miName: this.secondMenu[i].actRoleMenuVoList[j].miName,
                miLink: this.secondMenu[i].actRoleMenuVoList[j].miLink
              })
            }
          }
        }
        arr.push({ miName: this.secondMenu[i].miName, actRoleMenuVoList: voList })
      }
      return arr
    }
  },
  watch: {
    $route (val) {
      this.activePath = val.path
    }
  }
}
</script>
