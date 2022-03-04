<template>
  <i class="searchBody">
    <el-input v-model="input"
              placeholder="请输入内容"
              class="search"></el-input>
    <el-button type="primary"
               @click="searchs">搜索</el-button>
  </i>
</template>

<script>
import { getCommoditySearch } from '../../api/index'

export default {
  data () {
    return {
      input: ''
    }
  },
  props: {
    tableLabel: { type: [], default: [] },
    value: { type: String, default: '' }
  },
  methods: {
    searchs () {
      if (this.input !== '') {
        const field = this.tableLabel.join(',')
        getCommoditySearch({ name: this.value, data: this.input, field: field })
          .then((res) => {
            this.$emit('upTableData', res)
          }).catch((err) => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.searchBody {
  .search {
    width: 180px;
  }
}
</style>
