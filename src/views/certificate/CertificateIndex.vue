<style scoped>

</style>
<template>
    <div>
        <div class="page-header">
            <el-button type="success" @click="$refs['certificate-dialog'].open()">手动添加证书</el-button>
            <el-button type="success" @click="goCertificateConfig">管理签发配置</el-button>
        </div>
        <div class="block">
            <div v-for="(certificate, i) of data.data" :key="i">
                <div>
                    {{ certificate.created_at }}
                </div>
                <div @click="goEdit(certificate)">编辑</div>
                <div @click="goRemove(certificate)">删除</div>
            </div>
        </div>
        <certificate-dialog ref="certificate-dialog"></certificate-dialog>
        <el-pagination @current-change="jump" :current-page="searchForm.page" :page-size="data.per_page"
                       layout="total, prev, pager, next, jumper" :total="data.total">
        </el-pagination>
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
            async goRemove(certificate) {
                await this.$confirm('确定删除 ' + ' ？', '删除', {});
                let response = await this.$http.post('/certificate/certificate/remove', {id: certificate.id});
                this.$message.success(response.msg)
            }
        }
    }
</script>
