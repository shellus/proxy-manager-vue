<style scoped>

</style>
<template>
    <el-dialog
        :before-close="onClose"
        title="上传证书"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        width="30%">
        <div class="block">
            上传证书
            <el-form class="min-form" @submit.native.prevent="submit">
                <el-form-item label="路径">
                    <el-input v-model="formData.path"></el-input>
                </el-form-item>
                <el-form-item label="过期时间">
                    <el-input v-model="formData.expires_time"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" native-type="submit">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        name: 'CertificateDialog',
        data() {
            let initData = {
                path: '',
                expires_time: null,
            };
            return {
                dialogVisible: false,
                initData,
                formData: JSON.parse(JSON.stringify(initData))
            }
        },
        created() {
        },
        methods: {
            async submit() {
                let response = await this.$http.post('/certificate/certificate/save', this.formData);
                this.$message.success(response.msg)
            },
            async open(formData) {
                if (formData) {
                    console.log(this.TYPE_TITLES);
                    this.formData = JSON.parse(JSON.stringify(formData));
                    // this.formData.type = formData.type;
                }
                this.dialogVisible = true;
            },
            onClose() {
                this.formData = JSON.parse(JSON.stringify(this.initData));
                this.dialogVisible = false;
            }
        }
    }
</script>
