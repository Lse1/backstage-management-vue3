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
                       width="100">
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
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改数据"
               v-model="dialogFormVisibleRevise">
      <el-form :model="formRevise">
        <el-form-item v-for="(val,key) in tableLabel"
                      :key="key"
                      :label="val"
                      label-width="120px">
          <el-input v-model="formRevise.name[key]"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisibleRevise = false">取 消</el-button>
          <el-button type="primary"
                     @click="Revisedata">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getCommodityRevise, getCommodityDelete } from '../../api/index'
export default {
  data () {
    return {
      dialogFormVisibleRevise: false,
      formRevise: {
        name: [],
        id: 1
      }
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
    deleteClick (i) {
      getCommodityDelete({ name: this.value, id: i.id })
        .then((res) => {
          console.log(res)
          this.$emit('updata')
        }).catch((err) => {
          console.log(err)
        })
    },
    Revisedata () {
      getCommodityRevise({ name: this.value, str: this.tableLabel, data: this.formRevise.name, id: this.id })
        .then((res) => {
          this.$emit('updata')
        }).catch((err) => {
          this.$emit('updata')
          console.log(err)
        })
      this.dialogFormVisibleRevise = false
      // Message.success('修改成功')
    }
  }
}
</script>

<style>
</style>
