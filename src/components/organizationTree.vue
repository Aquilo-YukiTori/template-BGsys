<template>
  <div class="ogtree-container" @click.self="handleClose">
    <div class="organization-tree">
      <el-tree
        class="tree-list"
        :data="treeData"
        :props="treeProps"
        node-key="ogId"
        :current-node-key="curNode.ogId"
        :default-expand-all="true"
        :highlight-current="true"
        :expand-on-click-node="false"
        :check-on-click-node="true"
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultValue: { // 当前选中的tree节点
      type: Boolean
    },
    curLogin: { // 根据当前用户查询树结构
      type: Boolean
    },
    requireChildren: { // 是否需要传递所有的子组件
      type: Boolean
    }
  },
  data () {
    return {
      treeData: [],
      curNode: {},
      treeProps: {
        label: 'ogName',
        children: 'subSysOrganizationVoList'
      }
    }
  },
  created () {
    // 获取机构列表
    let url = ''
    if (this.curLogin) {
      url = '/sys/organization/listByLoginUser'
    } else {
      url = '/sys/organization/list'
    }
    this.axios.post(this.ajaxUrl + url, {}).then(res => {
      if (res.data.code === 0) {
        this.treeData = res.data.data
        if (this.defaultValue) {
          this.curNode = { ogName: this.treeData[0].ogName, ogId: this.treeData[0].ogId, ogRightcode: this.treeData[0].ogRightcode }
          this.$emit('chooseOrganization', this.curNode)
          if (this.requireChildren) {
            let params = this.getOgIdArr(this.treeData[0])
            this.$emit('chooseOrganization', params)
          }
        }
      }
    })
  },
  methods: {
    handleNodeClick (val, node) {
      if (this.requireChildren) { // 需要传递所有的子组件
        let params = this.getOgIdArr(val)
        this.$emit('chooseOrganization', params)
      } else {
        this.$emit('chooseOrganization', val)
      }
    },
    getOgIdArr (val) {
      let label = 'subSysOrganizationVoList'
      let arr = []
      let checkAll = function (item) {
        arr.push(+item.ogId)
        if (item[label] && item[label].length) {
          for (let i = 0; i < item[label].length; i++) {
            arr.push(+item[label][i].ogId)
            if (item[label][i][label] && item[label][i][label].length) {
              let child = item[label][i]
              checkAll(child)
            }
          }
        }
      }
      checkAll(val)
      let params = {
        obj: val,
        list: arr
      }
      return params
    },
    handleClose () {
      this.$emit('closeOgTree')
    }
  }
}
</script>
