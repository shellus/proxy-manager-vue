<style scoped>

</style>
<template>
    <div>
        <div class="page-header">
            <el-button type="success" @click="$refs['certificate-config-issue-dialog'].open()">从签发配置创建证书</el-button>
            <el-button type="success" @click="$refs['certificate-manual-upload-dialog'].open()">手动添加证书</el-button>
            <el-button type="success" @click="goCertificateConfig" plain>管理签发配置</el-button>
        </div>
        <div class="block">
            <el-table ref="table" :data="data.data" border style="width: 100%">
                <el-table-column prop="main_domain" label="证书主域名" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        {{ STATUS_TITLES[scope.row.status] }}
                    </template>
                </el-table-column>
                <el-table-column prop="expires_time" label="过期时间" align="center" width="170"></el-table-column>
                <el-table-column label="操作" align="left" width="230">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="!scope.row.is_manual_upload" @click="goIssue(scope.row)">签发</el-button>
                        <el-button size="mini" @click="$refs['certificate-log-dialog'].open(scope.row)">日志</el-button>
                        <el-button size="mini" @click="goRemove(scope.row, scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="jump" :current-page="searchForm.page" :page-size="data.per_page" :total="data.total" layout="total, prev, pager, next, jumper">
            </el-pagination>
        </div>
        <certificate-manual-upload-dialog @success="search" ref="certificate-manual-upload-dialog"></certificate-manual-upload-dialog>
        <certificate-config-issue-dialog @success="search" ref="certificate-config-issue-dialog"></certificate-config-issue-dialog>
        <certificate-log-dialog :OP_TYPE_TITLES="OP_TYPE_TITLES" ref="certificate-log-dialog"></certificate-log-dialog>
    </div>
</template>
<script>
    import CertificateManualUploadDialog from "@/views/certificate/CertificateManualUploadDialog";
    import CertificateConfigIssueDialog from "@/views/certificate/CertificateConfigIssueDialog";
    import CertificateLogDialog from "@/views/certificate/CertificateLogDialog";

    export default {
        name: 'CertificateIndex',
        components: {CertificateLogDialog, CertificateConfigIssueDialog, CertificateManualUploadDialog},
        data() {
            return {
                STATUS_TITLES: null,
                OP_TYPE_TITLES: null,
                searchForm: {},
                data: []
            }
        },
        async created() {
            let response = await this.$http.get('/certificate/certificate/index-data');
            this.STATUS_TITLES = response.data.STATUS_TITLES;
            this.OP_TYPE_TITLES = response.data.OP_TYPE_TITLES;
            this.search()
        },
        methods: {
            jump(index) {
                this.searchForm.page = index;
                this.search();
            },
            async search() {
                let response = await this.$http.get('/certificate/certificate/list', {params: this.searchForm});
                this.data = response.data;
            },
            goCertificateConfig() {
                this.$router.push({name: 'CertificateConfigIndex'})
            },
            async goIssue(certificate) {
                let response = await this.$http.post('/certificate/certificate/issue', {id: certificate.id});
                this.$message.success(response.msg);
            },
            async goRemove(certificate, index) {
                await this.$confirm('确定删除 ' + ' ？', '删除', {});
                let response = await this.$http.post('/certificate/certificate/remove', {id: certificate.id});
                this.$message.success(response.msg);
                this.data.data.splice(index, 1)
            },
        }
    }
</script>
