<template>
  <i class="addData">
    <el-button type="primary"
               @click="datasheet"
               class="button">{{title}}</el-button>
    <el-dialog :title="title"
               v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item v-for="(val,key) in tableLabel"
                      :key="key"
                      :label="val"
                      :label-width="formLabelWidth">
          <el-input v-model="form.name[key]"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="adddata">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </i>
</template>

<script>
import { getCommodityIncrease } from '../../api/index'
export default {
  data () {
    return {
      dialogFormVisible: false,
      form: {
        name: []
      }
    }
  },
  props: {
    tableLabel: { type: [], default: [] },
    value: { type: String, default: '' },
    title: { type: String, default: '' }
  },
  methods: {
    adddata () {
      let data = this.form.name.join("','")
      const field = this.tableLabel.join(',')
      data = "'" + data + "'"
      getCommodityIncrease({ name: this.value, data: data, field: field })
        .then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
      this.dialogFormVisible = false
      this.$emit('updata')
    },
    datasheet () {
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.addData {
  margin-right: 0px;
  .button {
    // float: right;
  }
}
</style>
