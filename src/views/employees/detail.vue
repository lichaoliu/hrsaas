<template>
    <div class="dashboard-container">
        <div class="app-container">
            <el-tabs>
                <el-tab-pane label="登录账户设置">
                    <el-form ref="userForm" :model="userInfo" :rules="rules" label-width="120px"
                        style="margin-left: 120px; margin-top:30px">
                        <el-form-item label="姓名:" prop="username">
                            <el-input v-model="userInfo.username" style="width:300px"></el-input>
                        </el-form-item>
                        <el-form-item label="密码:" prop="password2">
                            <el-input v-model="userInfo.password2" type="password" style="width:300px"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="saveUser">更新</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="个人详情">
                    <!-- <user-info></user-info> -->
                    <component :is="userComponent"></component>
                </el-tab-pane>
                <el-tab-pane label="岗位信息">
                    <component :is="jobComponent"></component>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import userInfo from './components/user-info.vue'
import jobInfo from './components/job-info.vue'
export default {
    components: {
        userInfo,
        jobInfo
    },
    data() {
        return {
            userComponent: 'user-info',
            jobComponent: 'job-info',
            userId: this.$route.params.id, // 通过路由获取id  ?id=123 用query
            userInfo: {
                username: '',
                password2: ''
            },
            rules: {
                username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
                password2: [{ required: true, message: '密码不能为空', trigger: 'blur' },
                { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
            }
        }
    },
    created() {
        this.getUserDetailById()
    },
    methods: {
        // 获取用户名 密码
        async getUserDetailById() {
            this.userInfo = await getUserDetailById(this.userId)
        },
        // 更新用户名 密码
        saveUser() {
            this.$refs.userForm.validate().then(async () => {
                await saveUserDetailById({ ...this.userInfo, password: this.userInfo.password2 })
                this.$message.success('修改用户信息成功')
            })
        }
    }
}
</script>
<styel>
</styel>
