<style scoped>

</style>
<template>
    <el-dialog
        :before-close="onClose"
        title="设置HTTP代理"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        width="40em">

        <div v-if="dialogVisible">
            <el-form ref="form" :model="formData"
                     label-suffix="："
                     label-position="top"
                     @submit.native.prevent="submit">
                <el-form-item label="名称（备注）">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="域名">
                    <multi-input v-model="formData.domains" value-key="domain" placeholder="按下ctrl+enter可以快捷添加一行"></multi-input>
                </el-form-item>
                <el-form-item label="源站地址">
                    <el-input v-model="formData.target_address" placeholder="输入http开头的完整地址"></el-input>
                </el-form-item>
                <el-form-item label="加密">
                    <el-checkbox v-model="formData.enable_https">启用HTTPS</el-checkbox>
                    <el-checkbox v-model="formData.enable_https_only" :disabled="!formData.enable_https">仅HTTPS
                    </el-checkbox>
                    <el-checkbox v-model="formData.enable_https_hsts" :disabled="!formData.enable_https">启用HSTS
                    </el-checkbox>
                    <el-checkbox v-model="formData.enable_http2" :disabled="!formData.enable_https">HTTP2</el-checkbox>
                </el-form-item>
                <el-form-item label="选择证书">
                    <certificate-select v-model="formData.certificate_id" :disabled="!formData.enable_https">
                    </certificate-select>
                </el-form-item>
                <el-form-item label="选择证书签发">
                    <certificate-config-select v-model="formData.certificate_config_id" :disabled="!formData.enable_https">
                    </certificate-config-select>
                </el-form-item>
                <el-form-item label="">
                    <el-checkbox v-model="formData.deploy_now">立即部署</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">保存</el-button>
                    <el-button type="default" @click="onClose">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>
<script>
    import MultiInput from "@/components/MultiInput";
    import CertificateSelect from "@/components/CertificateSelect";
    import CertificateConfigSelect from "@/components/CertificateConfigSelect";

    export default {
        name: "ProxyHostFormDialog",
        components: {CertificateConfigSelect, CertificateSelect, MultiInput},
        computed: {},
        watch: {
            'formData.enable_https': function (newValue) {
                if (!newValue) {
                    this.formData.enable_https_only = false;
                    this.formData.enable_https_hsts = false;
                    this.formData.enable_http2 = false;
                    this.formData.certificate_id = null;
                    this.formData.certificate_config_id = null
                }
            },
        },
        data() {
            let initData = {
                domains: [{domain: ''}],
                http_port: 80,
                https_port: 443,
                target_address: '',
                enable_https: false,
                enable_https_only: false,
                enable_https_hsts: false,
                enable_http2: false,
                certificate_id: null,
                certificate_config_id: null,
                deploy_now: true,
            };
            return {
                dialogVisible: false,
                initData,
                formData: JSON.parse(JSON.stringify(initData))
            }
        },
        methods: {
            async submit() {
                let response = await this.$http.post('/proxy/save', this.formData);
                this.$message.success({message: response.msg, onClose: this.onClose})
            },
            async open(formData) {
                if (formData) {
                    this.formData = JSON.parse(JSON.stringify(formData));
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
