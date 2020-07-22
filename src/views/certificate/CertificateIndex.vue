<style scoped>

</style>
<template>
    <div>
        <div class="page-header">
            <el-button type="success" @click="$refs['certificate-dialog'].open()">手动添加证书</el-button>
            <el-button type="success" @click="goCertificateConfig" plain>管理签发配置</el-button>
        </div>
        <div class="block">
            <el-table ref="table" :data="data.data" border style="width: 100%">
                <el-table-column prop="main_domain" label="证书主域名" align="center"></el-table-column>
                <el-table-column prop="created_at" label="创建时间" align="center" width="170"></el-table-column>
                <el-table-column prop="expires_time" label="过期时间" align="center" width="170"></el-table-column>
                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="goEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" @click="goRemove(scope.row, scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="jump" :current-page="searchForm.page" :page-size="data.per_page" :total="data.total" layout="total, prev, pager, next, jumper">
            </el-pagination>
        </div>
        <certificate-dialog ref="certificate-dialog"></certificate-dialog>
    </div>
</template>
<script>
    import CertificateDialog from "@/views/certificate/CertificateDialog";

    export default {
        name: 'CertificateIndex',
        components: {CertificateDialog},
        data() {
            return {
                searchForm: {},
                data: []
            }
        },
        async created() {
            // let response = await this.$http.get('/certificate/certificate/index-data');
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
            goEdit(certificate) {
                this.$refs['certificate-dialog'].open(certificate)
            },
            async goRemove(certificate, index) {
                await this.$confirm('确定删除 ' + ' ？', '删除', {});
                let response = await this.$http.post('/certificate/certificate/remove', {id: certificate.id});
                this.$message.success(response.msg);
                this.data.data.splice(index, 1)
            }
        }
    }
</script>
