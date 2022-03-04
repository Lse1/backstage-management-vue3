<template>
  <el-dialog title="修改数据"
             v-model="dialogFormVisibleRevise">
    <el-form :model="formRevises">
      <el-form-item v-for="(val,key) in tableLabel"
                    :key="key"
                    :label="val"
                    :label-width="formLabelWidth">
        <el-input v-model="formRevises.name[key]"
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
</template>

<script>
import { getCommodityRevise } from '../../api/index'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      formLabelWidth: '120px',
      formRevises: {
        name: [],
        id: 1
      }
    }
  },
  props: {
    tableLabel: { type: [], default: [] },
    value: { type: String, default: '' },
    formRevise: { type: Array, default: () => [] }
  },
  computed: {
    ...mapGetters([
      'dialogFormVisibleRevise'
      // 'formRevise'
    ])
  },
  methods: {
    Revisedata () {
      getCommodityRevise({ name: this.value, str: this.tableLabel, data: this.formRevise.name, id: this.id })
        .then((res) => {
        }).catch((err) => {
          console.log(err)
        })
      this.getdata(this.num)
      // this.dialogFormVisibleRevise = false
      this.$store.commit('setDialogFormVisibleRevise', false)
      // Message.success('修改成功')
    }
  }
}
</script>

<style>
</style>
