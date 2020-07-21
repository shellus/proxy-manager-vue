<style scoped>

</style>
<template>
    <el-dialog
        :before-close="onClose"
        title="SSL配置"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        width="30%">
        <div class="block">
            SSL配置
            <el-form class="min-form" @submit.native.prevent="submit">
                <el-form-item label="证书签发类型">
                    <el-select style="width: 100%;" v-model="formData.type">
                        <el-option v-for="(type,i) of TYPE_TITLES" :key="i" :value="parseInt(i)"
                                   :label="type"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="DNS提供者（参见acme.sh文档）">
                    <el-input v-model="formData.payload.dns_provider"></el-input>
                </el-form-item>
                <el-form-item label="API ID">
                    <el-input v-model="formData.payload.api_id"></el-input>
                </el-form-item>
                <el-form-item label="API Secret">
                    <el-input v-model="formData.payload.api_secret"></el-input>
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
        name: 'CertificateConfigDialog',
        props: {
            TYPE_TITLES: Object
        },
        data() {
            let initData = {
                type: null,
                payload: {},
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
                let response = await this.$http.post('/certificate/certificate-config/save', this.formData);
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
