<template>
  <!--搜索菜单 弹窗-->
  <div class="searchcountry-dialog searchmenu-dialog">
    <div class="form-tit">菜单搜索</div>
    <div class="input-tip">可在下面文本框中输入菜单名称进行查询</div>
    <div class="search-box">
      <el-input size="mini" v-model.trim="menuTxt"></el-input>
      <el-button type="primary" size="mini" @click="handleSearch">查找</el-button>
    </div>
    <el-table
      :data="filterTable"
      size="mini"
      height="380px"
      highlight-current-row
      @current-change="handleSelectTable"
      @row-dblclick="handleDblClick"
      style="width:432px"
      border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column v-for="(item, index) in tableDataProp"
                       :key="index" :prop="item.prop"
                       :label="item.label" :width="item.width">
      </el-table-column>
    </el-table>
    <div class="form-btns">
      <el-button type="primary" size="mini" @click="handleSure">确定</el-button>
      <el-button type="danger" size="mini" @click="$emit('closePop')">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuTxt: '',
      currRow: {},
      filterTable: [],
      tableData: [],
      tableDataProp: [
        {
          prop: 'miName',
          label: '菜单名称',
          width: 160
        },
        {
          prop: 'miDescription',
          label: '功能描述',
          width: 220
        }
      ]
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      this.axios.post(this.ajaxUrl + '/sys/menu/findMenuListByName', { miName: '' }).then(res => {
        if (res.data.code === 0) {
          this.tableData = res.data.data
          this.filterTable = JSON.parse(JSON.stringify(res.data.data))
        }
      })
    },
    handleSearch () {},
    handleSelectTable (val) {
      this.currRow = val
    },
    handleDblClick (val) {
      this.currRow = val
      this.handleSure()
    },
    // 选中一个菜单
    handleSure () {
      this.$emit('closePop')
      this.$router.push(this.currRow.miLink)
    }
  },
  watch: {
    menuTxt (val, oldVal) {
      if (val !== oldVal) {
        this.filterTable.length = 0
        if (val) {
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].miName.indexOf(val) !== -1) {
              this.filterTable.push(this.tableData[i])
            }
          }
        } else {
          this.filterTable = JSON.parse(JSON.stringify(this.tableData))
        }
      }
    }
  }
}
</script>
