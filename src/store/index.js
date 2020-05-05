import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 业务归属
    businessAssignmentList: [],
    otherList: {
      // 客户类型
      // customerType: [],
      // 客户等级
      // customerLevel: [],
      // 客户状态
      // customreStatus: [],
      // 结算类型
      // settlementType: [],
      // 到货交接清单模板
      // arrivalBatchTemplate: [],
      // 账单模板
      // billTemplate: [],
      // 客户联系人职能
      // concatPosition: [],
      // 客户来源
      // customerSource: [],
      // 欠费模式/欠费账期模式
      // oweType: [],
      // 平台
      // platform: [],
      // 产品
      // productKind: [],
      // 员工/业务员/客服等支持人员
      // staff: []
    },
    curBusinessAssignment: '',
    curName: '',
    operateList: {},
    userMenuList: [], // 当前用户菜单
    userControlList: [], // 当期用户的控件权限
    activeMiId: -1, // 当前激活的菜单id
    curPageControlObj: {} // 当前激活页面的控件对象
    /* controlSheet: [
      { btnFind: ['btnFind'] }, // 查询
      { btnUpdate: ['btnUpdate', 'btnEditCode', 'btnEdit', 'btnProduct', 'btnCargoVolume', 'btnModifyChargeWeight'] }, // 修改
      { btnAdd: ['btn_Add', 'btnAdd', 'btnCreateArrivalBatch', 'btnNew'] }, // 新增
      { btnInvalid: ['btnInvalid', 'btnInvalidExpress'] }, // 作废
      { btnExpCisInvoice: ['btnExpCisInvoice'] }, // 导出
      { btnAudit: ['btnAudit', 'btnVerify'] }, // 审核
      { btnApproval: ['btnApproval'] }, // 审批
      { btnApprovalList: ['btnApprovalList', 'btnBatchApproval'] }, // 批量审核
      { btnAdditionalFee: ['btnAdditionalFee'] }, // 杂费加收
      { btnCustomersReceive: ['btnCustomersReceive'] }, // 客户加收
      { btnCustomerRefund: ['btnCustomerRefund'] }, // 客户退款
      { btnBatchReturn: ['btnBatchReturn'] }, // 批量退回
      { btnImport: ['btnImport'] }, // 从文件导入
      { btnExportBatch: ['btnExportBatch', 'tsbExport', 'btnExportCargoVolume', 'btnExportWaybillTemplate'] }, // 导出总单
      { btnOrderBasicInfo: ['btnOrderBasicInfo'] }, // 销售产品
      { btnModifyServerChannel: ['btnModifyServerChannel'] }, // 服务渠道
      { btnCheckoutCargovolume: ['btnCheckoutCargovolume'] }, // 出货材积
      { tsbtn2: ['tsbtn2'] }, // 收货材积
      { toolStripButton4: ['toolStripButton4'] }, // 附加服务
      { btnCancelCheckOutExpress: ['btnCancelCheckOutExpress'] }, // 撤销签出
      { tsbRevocationReturn: ['tsbRevocationReturn', 'btnRevocationReturn'] }, // 撤销退件
      { toolStripButton2: ['toolStripButton2'] }, // 批量签出
      { btnHold: ['btnHold'] }, // 扣件
      { btnUnhold: ['btnUnhold'] }, // 放行
      { btnClose: ['btnClose'] }, // 问题结案
      { btnRelease: ['btnRelease'] }, // 放货
      { btnTemplateDown: ['btnTemplateDown'] }, // 模板下载
      { objtsbCompensation: ['objtsbCompensation'] }, // 申请赔偿
      { btnDownloadAttach: ['btnDownloadAttach'] }, // 下载附件
      { btnDeletePayCash: ['btnDeletePayCash'] }, // 删除付款
      { tsbtn6: ['tsbtn6'] }, // 发票
      { tsbManualRefund: ['tsbManualRefund'] }, // 应收退费
      { tsbManualAccrued: ['tsbManualAccrued'] } // 应付退费
    ] */
  },
  mutations: {
    setState: function (state, obj) {
      state[obj.name] = obj.value
    },
    addState: function (state, obj) {
      state[obj.name] = Object.assign({}, state[obj.name], obj.value)
    },
    addMenuList (state, list) {
      state.userMenuList = list
    },
    addControlList (state, list) {
      state.userControlList = list
    },
    addControlObj (state, obj) {
      state.curPageControlObj = obj
    },
    changeMiId (state, miId) {
      state.activeMiId = miId
    }
  },
  actions: {}
})

export default store
