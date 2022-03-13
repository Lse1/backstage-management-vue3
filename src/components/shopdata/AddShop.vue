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
                    v-if="val !== '商品图片'"></el-input>
          <el-upload class="avatar-uploader"
                     action=""
                     :show-file-list="false"
                     :on-change="onUploadChange"
                     v-if="val === '商品图片'">
            <img v-if="imageUrl"
                 :src="imageUrl"
                 class="avatar" />
            <el-icon v-else
                     class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
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
import { getShopSetImages } from '../../api/index'
import { ElMessage } from 'element-plus'
export default {
  data () {
    return {
      dialogFormVisible: false,
      form: {
        name: []
      },
      tableLabe: ['编号', '商品图片', '商品名称', '价格', '库存', '销量'],
      data: '',
      imagesdata: {},
      imageUrl: ''
    }
  },
  props: {
    tableLabel: { type: [], default: [] },
    value: { type: String, default: '' },
    title: { type: String, default: '' }
  },
  methods: {
    adddata () {
      const data = new FormData()
      data.append('file', this.imagesdata)
      const datas = JSON.parse(JSON.stringify(this.form.name))
      data.append('data', datas)
      console.log(datas)
      getShopSetImages(data, {
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
      this.dialogFormVisible = false
    },
    datasheet () {
      this.dialogFormVisible = true
    },
    submitUpload () {
      console.log('submit')
    },
    onUploadChange (file) {
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
      this.imagesdata = file.raw
      this.imageUrl = URL.createObjectURL(file.raw)
      /* // 这个是转成base64的方法
      var reader = new FileReader()
      reader.readAsDataURL(file.raw)
      const p = () => new Promise(function (resolve, reject) {
        reader.onload = function (e) {
          console.log(this.result)// 图片的base64数据
          resolve(this.result)
        }
      })
      this.imagesdata = await p()
      */
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
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
