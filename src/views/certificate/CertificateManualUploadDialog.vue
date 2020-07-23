<style scoped>

</style>
<template>
    <el-dialog
        :before-close="onClose"
        title="手动添加证书"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        width="30%">
        <div class="block">
            <el-form @submit.native.prevent="submit">
                <el-form-item label="证书主域名">
                    <el-input v-model="formData.main_domain"></el-input>
                </el-form-item>
                <el-form-item label="证书路径">
                    <el-input v-model="formData.cert_path"></el-input>
                </el-form-item>
                <el-form-item label="证书私钥路径">
                    <el-input v-model="formData.cert_key_path"></el-input>
                </el-form-item>
                <el-form-item label="过期时间">
                        <el-date-picker
                            style="width: 100%;"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="formData.expires_time"
                            type="datetime">
                        </el-date-picker>
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
        name: 'CertificateManualUploadDialog',
        data() {
            let initData = {
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
                this.$message.success({message: response.msg, onClose: this.onClose})
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
