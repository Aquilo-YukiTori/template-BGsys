<template>
  <!--快速粘贴弹窗-->
  <div class="fastpaste-component">
    <h5 class="form-tit">快速导入</h5>
    <el-input type="textarea" size="mini" rows="10" v-model="content"></el-input>
    <div class="checkbox">
      <el-checkbox size="mini" v-model="regConditions" label="row">行</el-checkbox>
      <el-checkbox size="mini" v-model="regConditions" label="space">空格</el-checkbox>
      <el-checkbox size="mini" v-model="regConditions" label="semicolon">分号</el-checkbox>
      <el-checkbox size="mini" v-model="regConditions" label="comma">逗号</el-checkbox>
    </div>
    <div class="other">
      <el-checkbox v-model="isOther">其他</el-checkbox>
      <el-input size="mini" :maxLength="1" v-model="otherReg" :disabled="!isOther"></el-input>
    </div>
    <div class="btns">
      <el-button type="primary" size="mini" @click="handleSure">确定</el-button>
      <el-button type="warning" size="mini" @click="handleCancel">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: '',
      regConditions: ['row'],
      isOther: false,
      otherReg: '',
      regObj: {
        row: /\n/g,
        space: /\s/g,
        semicolon: /;|；/g,
        comma: /,|，/g
      }
    }
  },
  methods: {
    handleSure () {
      let txt = this.content
      for (let i = 0; i < this.regConditions.length; i++) {
        txt = txt.replace(this.regObj[this.regConditions[i]], '，')
      }
      if (this.isOther && this.otherReg) {
        let reg = new RegExp(this.otherReg, 'g')
        txt = txt.replace(reg, '，')
      }
      this.$emit('getPasteTxt', txt)
    },
    handleCancel () {
      this.$emit('closePop')
    }
  }
}
</script>
