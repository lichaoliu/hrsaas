<template>
  <div>
    <!-- 给action一个#就不会报错了 -->
    <el-upload list-type="picture-card"
               :file-list="fileList"
               :limit="1"
               action="#"
               :on-preview="preview"
               :on-change="changeFile"
               :class="{ disabled: fileComputed }"
               :on-remove="handleRemove"
               :http-request="upload"
               :before-upload="beforeUpload">
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showProgress"
                 :percentage="percent"
                 style="width:180px" />
    <!-- 图品预览-->
    <el-dialog title="图片"
               :visible.sync="showDialog">
      <img :src="imgUrl"
           yle="width:100%">
    </el-dialog>
  </div>

</template>
<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDWrwlKdfQu73j8H9kbGelcCWZLr76oFPJ',
  SecretKey: 'e190c2EF2ZqpY0C6j5BzWljRs1tUqvjH'
})
export default {
  data () {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: '',
      currentFileUid: '',
      percent: 0, // 图片上传进度
      showProgress: false
    }
  },
  computed: {
    // 属性判断是否已经上传了一张图片
    fileComputed () {
      return this.fileList.length === 1
    }
  }, methods: {
    preview (file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove (file, fileList) {
      this.fileList = this.fileList.filter(x => x.uid !== file.uid)
    },
    changeFile (file, fileList) {
      console.log('changeFile')
      // action 不成功的时候，添加 返回是空，所有没有写action的时候 添加不上
      this.fileList = fileList
    },
    beforeUpload (file) {
      console.log('beforeUpload')
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      // 检查文件类型
      if (!types.some(x => x === file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      // 检查文件大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      this.currentFileUid = file.uid
      this.showProgress = true
      return true
    },
    upload (params) {
      console.log('upload')
      cos.putObject({
        Bucket: 'nevermore-1302091042', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-beijing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: params.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        StorageClass: 'STANDARD',
        Body: params.file,
        onProgress: (progressData) => {
          console.log(progressData)
          this.percent = progressData.percent * 100
        }
      }, (err, data) => {
        if (err) {
          this.$message.error(err)
        }
        this.fileList = this.fileList.map(x => {
          if (x.uid === this.currentFileUid) {
            return { url: 'http://' + data.Location, upload: true }
          }
          return x
        })
        setTimeout(() => {
          this.showProgress = false
          this.percent = 0
        }, 1000)
      })
    }
  }
}
</script>
<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>
