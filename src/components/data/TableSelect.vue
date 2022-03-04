<template>
  <el-select v-model="data"
             placeholder="请选择"
             @change="DataChange">
    <el-option v-for="item in cities"
               :key="item"
               :label="item"
               :value="item">
      <span style="float: left">{{ item }}</span>
    </el-option>
  </el-select>
</template>

<script>
export default {
  data () {
    return {
      data: '价格'
    }
  },
  props: {
    cities: { type: [], default: [] },
    value: { type: String, default: '价格' }
  },
  methods: {
    DataChange () {
      this.$emit('DataChange', this.data)
    }
  }
}
</script>

<style>
</style>
