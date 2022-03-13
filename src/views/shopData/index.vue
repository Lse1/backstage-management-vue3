<template>
  <el-card class="box-card">
    <div class="choice">
      <SearchShop :tableLabel="tableLabel"
                  :value="value"
                  @upTableData="upTableData"></SearchShop>
      <AddShop :tableLabel="tableLabel"
               :value="value"
               @updata="updata"
               :title="'添加商品'"></AddShop>
    </div>
    <ShopBody :tableLabel="tableLabel"
              :tableData="tableData"
              @updata="updata"></ShopBody>
    <el-pagination background
                   layout="prev, pager, next"
                   :total="sum"
                   @current-change="handleCurrentChange">
    </el-pagination>
  </el-card>
</template>

<script>
import { getImages } from '../../api/index'
import AddShop from '../../components/shopdata/AddShop.vue'
import SearchShop from '../../components/shopdata/SearchShop.vue'
import ShopBody from '../../components/shopdata/shopBody.vue'

export default {
  name: 'Mall',
  components: {
    AddShop,
    SearchShop,
    ShopBody
  },
  data () {
    return {
      tableData: [],
      tableLabel: [],
      sum: 100,
      num: 0
    }
  },
  methods: {
    handleCurrentChange (val) {
      const num = (val - 1) * 10
      this.getdata(num)
      this.num = num
    },
    getdata (num) {
      getImages({ num: num })
        .then((res) => {
          this.sum = parseInt(res.count[0].counts)
          this.tableData = res.data
          const hc = JSON.parse(JSON.stringify(res.data))
          const props = Object.keys(hc.reduce((o, c) => Object.assign(o, c)))
          props.splice(props.indexOf('id'), 1)
          this.tableLabel = props
        }).catch((err) => {
          console.log(err)
        })
    },
    updata () {
      this.getdata(this.num)
    },
    upTableData (data) {
      this.tableData = data
      this.sum = parseInt(this.tableData.length)
    }
  },
  created () {
    getImages({ num: 0 })
      .then((res) => {
        console.log(res)
        this.sum = parseInt(res.count[0].counts)
        this.tableData = res.data
        const hc = JSON.parse(JSON.stringify(res.data))
        const props = Object.keys(hc.reduce((o, c) => Object.assign(o, c)))
        props.splice(props.indexOf('id'), 1)
        this.tableLabel = props
      }).catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  .choice {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
