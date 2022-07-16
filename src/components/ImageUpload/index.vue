<template>
    <div>
        <!-- 给action一个#就不会报错了 -->
        <el-upload list-type="picture-card" :file-list="fileList" :limit="1" action="#" :on-preview="preview"
            :on-change="changeFile" :class="{ disabled: fileComputed }" :on-remove="handleRemove"
            :before-upload="beforeUpload">
            <i class="el-icon-plus"></i>
        </el-upload>
        <!-- 图品预览-->
        <el-dialog title="图片" :visible.sync="showDialog">
            <img :src="imgUrl" yle="width:100%" />
        </el-dialog>
    </div>


</template>
<script>
export default {
    computed: {
        // 属性判断是否已经上传了一张图片
        fileComputed() {
            return this.fileList.length === 1
        }
    },
    data() {
        return {
            fileList: [{ url: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" }],
            showDialog: false,
            imgUrl: ''
        }
    }, methods: {
        preview(file) {
            this.imgUrl = file.url
            this.showDialog = true
        },
        handleRemove(file, fileList) {
            this.fileList = this.fileList.filter(x => x.uid !== file.uid)
        },
        changeFile(file, fileList) {
            // action 不成功的时候，添加 返回是空，所有没有写action的时候 添加不上
            this.fileList = fileList
        },
        beforeUpload(file) {
            const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
            // 检查文件类型
            if (!types.some(x => x === file.type)) {
                this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
                return false;
            }
            // 检查文件大小
            const maxSize = 5 * 1024 * 1024
            if (maxSize < file.size) {
                this.$message.error('图片大小最大不能超过5M')
                return false
            }
            return true
        }
    }
}
</script>
<style>
.disabled .el-upload--picture-card {
    display: none
}
</style>
