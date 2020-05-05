<template>
  <div class='log'>
    <div class='form-tit'>{{componentName[name]}}-日志记录</div>
    <section>
      <div class='log-head'>
        <div class='part' v-if='name!=="dataManage"'>
          <div>
            <span>操作人</span>
            <el-input size='small' v-model='searchOption.option1'></el-input>
          </div>
          <div>
            <span>操作信息类型</span>
            <el-input size='small' v-model='searchOption.option2'></el-input>
          </div>
          <el-button size='mini' type='primary' @click='searchBtn'>查询</el-button>
        </div>
        <div class='part' v-if='name==="dataManage"'>
          <div>
            <span>客户代码</span>
            <h3>{{headInfo}}</h3>
          </div>
        </div>
      </div>
      <div class='log-body'>
        <el-table
        v-loading='searchOption.loading'
        :data='resultFilter'
        border
        style='width: 100%'
        :default-sort="{prop: 'number', order: 'descending'}"
        highlight-current-row
        @row-click='rowClick'
        size='mini'
        height="400px"
        ref="table">
          <el-table-column
          type='index' fixed></el-table-column>
          <el-table-column
          v-for='(part,index) in tableList[name]'
          :prop='part.value'
          :label='part.label'
          :key='index'
          :width='part.width'
          sortable
          resizable
          min-width='95px'
          ></el-table-column>
        </el-table>
        <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="searchOption.currentPage"
        :page-size="searchOption.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="searchOption.totalPage"
        v-if='searchOption.ifPagination'
        @size-change='sizeChange'
        @current-change='pagechange'></el-pagination>
      </div>
      <div class='log-footer'>
        <el-button size='mini' type='danger' @click='closeBtn'>关闭</el-button>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String
    },
    open: {
      type: Boolean
    },
    dataProp: {}
  },
  data () {
    return {
      searchOption: {
        // 操作人
        option1: '',
        // 操作信息类型
        option2: '',
        // 查询结果
        result: [],
        currentPage: 1,
        pageSize: 50,
        totalPage: 1,
        loading: false,
        ifPagination: false
      },
      headInfo: '',
      // 一些list
      componentName: {
        'saleproduct': '销售产品',
        'dataManage': '客户资料管理',
        'channel': '渠道管理'
      },
      urlList: {
        'saleproduct': '/prc/operation_log/listOperationLog',
        'dataManage': '/cus/customer/findCustomerLog',
        'channel': '/prc/operation_log/listOperationLog'
      },
      tableList: {
        'saleproduct': [
          {
            label: '操作人',
            value: 'stId',
            width: 'auto'
          },
          {
            label: '操作信息类型',
            value: 'opControl',
            width: 'auto'
          },
          {
            label: '销售产品代码',
            value: 'productCode',
            width: 'auto'
          },
          {
            label: '操作日期',
            value: 'opDate',
            width: 'auto'
          },
          {
            label: '操作内容',
            value: 'opContent',
            width: 'auto'
          }
        ],
        'dataManage': [
          {
            label: '时间',
            value: 'logCreatetime',
            width: 'auto'
          },
          {
            label: '操作人',
            value: 'logCreaterid',
            width: 'auto'
          },
          {
            label: '日志内容',
            value: 'logCnnote',
            width: '500px'
          }
          // {
          //   label: '日志类型',
          //   value: ''
          // },
        ],
        'channel': [
          {
            label: '操作人',
            value: 'stId',
            width: 'auto'
          },
          {
            label: '操作信息类型',
            value: 'opControl',
            width: 'auto'
          },
          {
            label: '服务渠道代码',
            value: 'opForm',
            width: 'auto'
          },
          {
            label: '操作日期',
            value: 'opDate',
            width: 'auto'
          },
          {
            label: '操作内容',
            value: 'opContent',
            width: 'auto'
          }
        ]
      },
      // 用于特殊情况避免二次调用
      // 在自身单击关闭按钮后，将外部dialog的ifEnter变为false，此变化又会被自身的watch捕捉到，从而进行了两次closeBtn的调用
      flag: false
    }
  },
  methods: {
    // init
    init: function () {
      let t = this
      if (t.name === 'dataManage') {
        t.searchOption.ifPagination = true
        t.headInfo = t.dataProp.customerCode
      }
      t.searchAjax(1)
    },
    // 搜索按钮
    searchBtn: function () {
      let t = this
      t.searchAjax()
    },
    // 分页点击事件
    pagechange: function (v) {
      let t = this
      t.searchAjax(v)
    },
    // 分页的pageChange事件
    sizeChange: function (v) {
      let t = this
      t.pageSize = v
      t.searchAjax()
    },
    // 列表用ajax
    searchAjax: function (page) {
      let t = this
      let d = t.searchOption
      d.loading = true
      let data = {}
      if (t.name === 'saleproduct') {
        data.productCode = t.dataProp
        data.stName = d.option1 === '' ? undefined : d.option1
        data.opControl = d.option2 === '' ? undefined : d.option2
      }
      if (t.name === 'dataManage') {
        data.currentPage = page
        data.pageSize = t.searchOption.pageSize
        data.data = {
          customerId: t.dataProp.customerId
        }
        // data.customerCode = t.dataProp
      }
      if (t.name === 'channel') {
        data.serverChannelid = t.dataProp
        data.stName = d.option1 === '' ? undefined : d.option1
        data.opControl = d.option2 === '' ? undefined : d.option2
      }
      t.axios({
        method: 'post',
        url: t.ajaxUrl + t.urlList[t.name],
        data: data
      }).then((res) => {
        d.loading = false
        if (res.data.code === 0) {
          t.currentPage = 1
          t.totalPage = 1
          if (t.name === 'dataManage') {
            d.result = res.data.data.list
          } else {
            d.result = res.data.data
          }
        } else {
          t.$message.error(res.data.message)
        }
      }).catch((err) => {
        d.loading = false
        t.$message.error(err)
      })
    },
    // 关闭按钮
    closeBtn: function () {
      let t = this
      let d = t.searchOption
      for (let i in d) {
        if (Object.prototype.toString.call(d[i]).indexOf('String') !== -1) {
          d[i] = ''
        }
      }
      d.loading = false
      d.currentPage = 1
      d.totalPage = 1
      t.flag = true
      t.$emit('close')
    },
    // 表格行的单击事件
    rowClick: function () {}
  },
  computed: {
    'resultFilter': function () {
      let t = this
      let d = JSON.parse(JSON.stringify(t.searchOption.result))
      let arr = []
      for (let i of d) {
        if (t.name === 'saleproduct') {
          if (i.stId.desc) {
            i.stId = i.stId.desc
          }
        }
        if (t.name === 'dataManage') {
          if (i.logCreaterid.desc) {
            i.logCreaterid = i.logCreaterid.desc
          }
        }
        if (t.name === 'channel') {
          if (i.stId.desc) {
            i.stId = i.stId.desc
          }
        }
      }
      arr = d
      return arr
    }
  },
  watch: {
    'open': {
      handler: function (nv, ov) {
        let t = this
        if (!nv && t.flag) {
          t.closeBtn()
          t.flag = false
        } else {
          t.init()
        }
      },
      immediate: true
    }
  }
}
</script>
