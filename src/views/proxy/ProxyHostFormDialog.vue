<style scoped>

</style>
<template>
    <el-dialog
        :before-close="onClose"
        title="设置HTTP代理"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        width="30%">

        <div v-if="dialogVisible">
            <el-form ref="form" :model="formData"
                     label-suffix="："
                     label-position="top"
                     @submit.native.prevent="submit">
                <el-form-item label="域名">
                    <multi-input v-model="formData.domains" value-key="domain"></multi-input>
                    <!--                    <el-select-->
                    <!--                        style="width: 100%;"-->
                    <!--                        v-model="formData.domains"-->
                    <!--                        multiple-->
                    <!--                        filterable-->
                    <!--                        allow-create-->
                    <!--                        value-key="domain"-->
                    <!--                        placeholder="请输入域名后回车键确认"-->
                    <!--                        default-first-option>-->
                    <!--                    </el-select>-->
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
                    <el-select v-model="formData.certificate_id" :disabled="!formData.enable_https">
                        <el-option label="WEBROOT签发" value="webroot"></el-option>
                    </el-select>
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

    export default {
        name: "ProxyHostFormDialog",
        components: {MultiInput},
        computed: {},
        watch: {
            'formData.enable_https': function (newValue) {
                if (!newValue) {
                    this.formData.enable_https_only = false;
                    this.formData.enable_https_hsts = false;
                    this.formData.enable_http2 = false;
                    this.formData.certificate_id = null
                }
            },
        },
        data() {
            let initData = {
                domains: [{domain: ''}],
                target_address: '',
                enable_https: false,
                enable_https_only: false,
                enable_https_hsts: false,
                enable_http2: false,
                certificate_id: null,
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
                this.$message.success(response.msg)
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
