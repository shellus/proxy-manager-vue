<style scoped>

</style>
<template>
    <el-dialog
        :before-close="onClose"
        title="从签发配置创建证书"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        width="40em">
        <div class="block">
            <el-form ref="form" :model="formData"
                     label-suffix="："
                     label-position="top"
                     @submit.native.prevent="submit">
                <el-form-item label="域名">
                    <multi-input v-model="formData.domains" value-key="domain" placeholder="按下ctrl+enter可以快捷添加一行"></multi-input>
                </el-form-item>
                <el-form-item label="证书签发配置">
                    <certificate-config-select v-model="formData.certificate_config_id"></certificate-config-select>
                </el-form-item>
                <el-form-item label="">
                    <el-checkbox v-model="formData.issue_now">立即签发</el-checkbox>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" native-type="submit">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>
<script>
    import MultiInput from "@/components/MultiInput";
    import CertificateConfigSelect from "@/components/CertificateConfigSelect";
    export default {
        name: 'CertificateConfigIssueDialog',
        components: {CertificateConfigSelect, MultiInput},
        data() {
            let initData = {
                domains: [{domain: ''}],
                issue_now: true,
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
                let postData = JSON.parse(JSON.stringify(this.formData));
                postData['domains'] = postData['domains'].map(v=>v.domain);
                let response = await this.$http.post('/certificate/certificate/create-from-config', postData);
                this.$message.success({message: response.msg, onClose: ()=>this.onClose() + this.$emit('success', response.data)})
            },
            async open() {
                this.formData = JSON.parse(JSON.stringify(this.initData));
                this.dialogVisible = true;
            },
            onClose() {
                this.formData = JSON.parse(JSON.stringify(this.initData));
                this.dialogVisible = false;
            }
        }
    }
</script>
