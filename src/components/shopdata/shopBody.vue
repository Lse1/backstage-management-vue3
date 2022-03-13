<template>
  <div>
    <el-table :data="tableData"
              border
              style="width: 100%">
      <el-table-column prop="编号"
                       label="编号" />
      <el-table-column prop="商品图片"
                       label="商品图片">
        <template #default="scope"><img :src="scope.row.商品图片"
               alt=""
               class="avatars"></template>
      </el-table-column>
      <el-table-column prop="商品名称"
                       label="商品名称" />
      <el-table-column prop="价格"
                       label="价格" />
      <el-table-column prop="库存"
                       label="库存" />
      <el-table-column prop="销量"
                       label="销量" />
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
                    autocomplete="off"
                    v-if="val !== '商品图片'"></el-input>
          <el-upload class="avatar-uploader"
                     action=""
                     :show-file-list="false"
                     :on-change="onUploadChangeUpdata"
                     v-if="val === '商品图片'">
            <img v-if="upadataImageUrl"
                 :src="upadataImageUrl"
                 class="avatarsUpdata" />
            <el-icon v-else
                     class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
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
  </div>
</template>

<script>
import { getImages, getShopDeleteh, getShopUpdata } from '../../api/index'
import { ElMessage } from 'element-plus'
export default {
  data () {
    return {
      dialogFormVisibleRevise: false,
      formRevise: {
        name: [],
        id: 1
      },
      imagesdataUpdata: {},
      upadataImageUrl: ''
    }
  },
  props: {
    tableLabel: { type: [], default: [] },
    value: { type: String, default: '' },
    tableData: { type: [], default: [] }
  },
  methods: {
    getimages () {
      getImages({})
        .then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })
    },
    deleteClick (i) {
      console.log(i)
      getShopDeleteh({ id: i.id })
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
    },
    handleClick (i) {
      let m = 0
      this.id = i.id
      for (var p in i) {
        if (p === this.tableLabel[m]) {
          this.formRevise.name[m] = i[p]
          m++
        }
      }
      this.upadataImageUrl = i.商品图片
      this.imagesdataUpdata = {}
      this.dialogFormVisibleRevise = true
    },
    onUploadChangeUpdata (file) {
      const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png' || file.raw.type === 'image/gif')
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!')
        return false
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!')
        return false
      }
      this.imagesdataUpdata = file.raw
      this.upadataImageUrl = URL.createObjectURL(file.raw)
    },
    Revisedata () {
      console.log(this.imagesdataUpdata)
      console.log(this.formRevise.name)
      const data = new FormData()
      data.append('file', this.imagesdataUpdata)
      const datas = JSON.parse(JSON.stringify(this.formRevise.name))
      data.append('data', datas)
      data.append('id', this.id)
      console.log(datas)
      getShopUpdata(data, {
        onUploadProgress: (progressEvent) => { // axios上传文件的进程方法，可以翻api
          // 这里要用箭头函数,不然这个this的指向会有问题
          this.rate = parseInt(
            (progressEvent.loaded / progressEvent.total) * 100
          )
        }
      }).then((res) => {
        console.log(res)
        if (res.code === 401) {
          console.log(res.message)
          ElMessage.error(res.message)
        } else if (res.code === 200) {
          ElMessage({
            message: res.message,
            type: 'success'
          })
          this.$emit('updata')
        }
      }).catch((err) => {
        console.log(err)
      })
      this.dialogFormVisibleRevise = false
    }
  }
}
</script>

<style lang="scss" scope>
.avatars {
  width: 100%;
  height: 100px;
  display: block;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatarsUpdata {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
