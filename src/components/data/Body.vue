<template>
  <div>
    <el-table :data="tableData"
              border
              style="width: 100%">
      <el-table-column v-for="(val,key) in tableLabel"
                       :key="key"
                       :prop="val"
                       :label="val">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       :width="this.$route.name === 'user'? 140 : 100">
        <template #default="scope">
          <el-button @click="handleClick(scope.row)"
                     type="text"
                     size="small">
            <el-icon color="#409EFF"
                     size="25px">
              <edit />
            </el-icon>
          </el-button>
          <el-button @click="deleteClick(scope.row)"
                     type="text"
                     size="small">
            <el-icon color="#F56C6C"
                     size="25px">
              <delete-filled />
            </el-icon>
          </el-button>
          <el-button @click="powerClick(scope.row)"
                     type="text"
                     size="small"
                     v-if="this.$route.name === 'user'">
            <el-icon color="#E6A23C"
                     size="25px">
              <setting />
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改数据"
               v-model="dialogFormVisibleRevise">
      <el-form :model="formRevise">
        <el-form-item v-for="(val,key) in (this.$route.name === 'user' ? tableLabe : tableLabel)"
                      :key="key"
                      :label="val"
                      label-width="120px">
          <el-input v-model="formRevise.name[(this.$route.name === 'user' && key === 1) ? 2 : key]"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisibleRevise = false">取 消</el-button>
          <el-button type="primary"
                     @click="Revisedata">修 改</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="权限"
               v-model="powerRevise"
               width="300px">
      <el-select v-model="powerData"
                 placeholder="请选择">
        <el-option v-for="item in cities"
                   :key="item"
                   :label="item"
                   :value="item">
          <!-- <span style="float: left">{{ item }}</span> -->
        </el-option>
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="powerRevise = false">取 消</el-button>
          <el-button type="primary"
                     @click="powerRevisedata">修 改</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCommodityRevise, getCommodityDelete, getUserDelete, getUserUpdata, getUserUpdataPower } from '../../api/index'
import { ElMessage } from 'element-plus'
export default {
  data () {
    return {
      dialogFormVisibleRevise: false,
      powerRevise: false,
      formRevise: {
        name: [],
        id: 1
      },
      tableLabe: ['用户名', '邮箱'],
      powerData: '',
      cities: ['超级管理员', '管理员', '体验员']
    }
  },
  props: {
    tableLabel: { type: [], default: [] },
    value: { type: String, default: '' },
    tableData: { type: [], default: [] }
  },
  methods: {
    handleClick (i) {
      let m = 0
      this.id = i.id
      for (var p in i) {
        if (p === this.tableLabel[m]) {
          this.formRevise.name[m] = i[p]
          m++
        }
      }
      this.dialogFormVisibleRevise = true
    },
    powerClick (i) {
      this.powerRevise = true
      this.powerData = i.权限
      this.id = i.id
    },
    deleteClick (i) {
      // console.log(this.$route.name)
      if (this.$route.name === 'otherData') {
        getCommodityDelete({ name: this.value, id: i.id })
          .then((res) => {
            if (res.code === 401) {
              ElMessage.error(res.message)
            } else if (res.code === 200) {
              this.$emit('updata')
              ElMessage({
                message: res.message,
                type: 'success'
              })
            }
          }).catch((err) => {
            console.log(err)
          })
      } else if (this.$route.name === 'user') {
        getUserDelete({ id: i.id })
          .then((res) => {
            if (res.code === 401) {
              ElMessage.error(res.message)
            } else if (res.code === 200) {
              this.$emit('updata')
              ElMessage({
                message: res.message,
                type: 'success'
              })
            }
          }).catch((err) => {
            console.log(err)
          })
      } else if (this.$route.name === 'homeData') {
        ElMessage.error('权限不足')
      }
    },
    Revisedata () {
      if (this.$route.name === 'otherData') {
        getCommodityRevise({ name: this.value, str: this.tableLabel, data: this.formRevise.name, id: this.id })
          .then((res) => {
            if (res.code === 401) {
              ElMessage.error(res.message)
            } else if (res.code === 200) {
              this.$emit('updata')
              ElMessage({
                message: res.message,
                type: 'success'
              })
            }
          }).catch((err) => {
            this.$emit('updata')
            console.log(err)
          })
      } else if (this.$route.name === 'user') {
        getUserUpdata({ name: this.formRevise.name[0], str: this.formRevise.name[2], id: this.id })
          .then((res) => {
            if (res.code === 401) {
              ElMessage.error(res.message)
            } else if (res.code === 200) {
              this.$emit('updata')
              ElMessage({
                message: res.message,
                type: 'success'
              })
            }
          }).catch((err) => {
            console.log(err)
          })
      } else if (this.$route.name === 'homeData') {
        ElMessage.error('权限不足')
      }
      this.dialogFormVisibleRevise = false
    },
    powerRevisedata () {
      getUserUpdataPower({ identity: this.powerData, id: this.id })
        .then((res) => {
          if (res.code === 401) {
            ElMessage.error(res.message)
          } else if (res.code === 200) {
            this.$emit('updata')
            ElMessage({
              message: res.message,
              type: 'success'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      this.powerRevise = false
    }
  }
}
</script>

<style>
</style>
