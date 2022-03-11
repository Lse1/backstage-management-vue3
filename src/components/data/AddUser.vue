<template>
  <i class="adduser">
    <el-button type="primary"
               @click="datasheet"
               class="button">{{title}}</el-button>
    <el-dialog :title="title"
               v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item v-for="(val,key) in tableLabe"
                      :key="key"
                      :label="val"
                      :label-width="formLabelWidth">
          <el-input v-model="form.name[key]"
                    autocomplete="off"
                    v-if="val!== '权限'"></el-input>
          <el-select v-model="data"
                     placeholder="请选择"
                     v-if="val=== '权限'">
            <el-option v-for="item in cities"
                       :key="item"
                       :label="item"
                       :value="item">
              <span style="float: left">{{ item }}</span>
            </el-option>
          </el-select>
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
import { getAdduser } from '../../api/index'
import { ElMessage } from 'element-plus'
export default {
  data () {
    return {
      dialogFormVisible: false,
      form: {
        name: []
      },
      tableLabe: ['用户名', '权限', '邮箱', '密码'],
      data: '',
      cities: ['超级管理员', '管理员', '体验员']
    }
  },
  props: {
    tableLabel: { type: [], default: [] },
    value: { type: String, default: '' },
    title: { type: String, default: '' }
  },
  methods: {
    adddata () {
      getAdduser({ name: this.form.name[0], identity: this.data, email: this.form.name[2], pass: this.form.name[3] })
        .then((res) => {
          if (res.code === 401) {
            console.log(res.message)
            ElMessage.error(res.message)
          } else if (res.code === 200) {
            ElMessage({
              message: res.message,
              type: 'success'
            })
          }
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
.adduser {
  margin-right: 0px;
  .button {
    // float: right;
  }
}
</style>
