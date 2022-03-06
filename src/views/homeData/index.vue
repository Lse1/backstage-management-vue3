<template>
  <el-card class="box-card">
    <div class="choice">
      <TableSelect :value="value"
                   :cities="cities"
                   @DataChange="DataChange"
                   ref="selectClick"></TableSelect>
      <Search :tableLabel="tableLabel"
              :value="value"
              @upTableData="upTableData"></Search>
      <AddDaata :tableLabel="tableLabel"
                :value="value"
                @updata="updata"
                :title="'添加数据'"></AddDaata>
    </div>

    <Body :tableLabel="tableLabel"
          :tableData="tableData"
          :value="value"
          @updata="updata"></Body>
    <el-pagination background
                   layout="prev, pager, next"
                   :total="sum"
                   @current-change="handleCurrentChange">
    </el-pagination>
  </el-card>
</template>

<script>
import { getBanner } from '../../api/index'
import AddDaata from '../../components/data/AddData.vue'
import Search from '../../components/data/Searchs.vue'
import TableSelect from '../../components/data/TableSelect.vue'
import Body from '../../components/data/Body.vue'

export default {
  name: 'Mall',
  components: {
    AddDaata,
    Search,
    TableSelect,
    Body
  },
  data () {
    return {
      tableData: [],
      tableLabel: [],
      sum: 100,
      num: 0,
      cities: ['videodata', 'date', 'userdata', 'tabledata', 'orderdata'],
      value: '',
      thisname: ''
    }
  },
  methods: {
    handleCurrentChange (val) {
      const num = (val - 1) * 10
      this.getdata(num)
      this.num = num
    },
    getdata (num) {
      getBanner({ name: this.value, num: num })
        .then((res) => {
          // console.log(res)
          this.sum = parseInt(res.count[0].counts)
          this.tableData = res.data
          const hc = JSON.parse(JSON.stringify(res.data))
          const props = Object.keys(hc.reduce((o, c) => Object.assign(o, c)))
          console.log(hc)
          props.splice(props.indexOf('id'), 1)

          this.tableLabel = props
        }).catch((err) => {
          console.log(err)
        })
    },
    DataChange (data) {
      this.value = data
      this.getdata(0)
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
    getBanner({ name: 'videodata', num: 0 })
      .then((res) => {
        console.log(res)
        this.sum = parseInt(res.count[0].counts)
        this.tableData = res.data
        const hc = JSON.parse(JSON.stringify(res.data))
        const props = Object.keys(hc.reduce((o, c) => Object.assign(o, c)))
        props.splice(props.indexOf('id'), 1)
        this.tableLabel = props
        this.value = 'videodata'
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
