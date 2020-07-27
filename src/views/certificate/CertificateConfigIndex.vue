<style scoped>

</style>
<template>
    <div>
        <div class="page-header">
            <el-button type="success" @click="$refs['certificate-config-dialog'].open()">添加签发配置</el-button>
        </div>
        <div class="block">
            <el-table ref="table" :data="data.data" border style="width: 100%">
                <el-table-column prop="name" label="名称" align="center"></el-table-column>
                <el-table-column label="类型" align="center" width="100">
                    <template slot-scope="scope">
                        {{ TYPE_TITLES[scope.row.type] }}
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间" align="center" width="170"></el-table-column>
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
        <certificate-config-dialog @success="search" :TYPE_TITLES="TYPE_TITLES"
                                   ref="certificate-config-dialog"></certificate-config-dialog>
    </div>
</template>
<script>
    import CertificateConfigDialog from "@/views/certificate/CertificateConfigDialog";

    export default {
        name: 'CertificateConfigIndex',
        components: {CertificateConfigDialog},
        data() {
            return {
                TYPE_TITLES: {},
                searchForm: {},
                data: []
            }
        },
        async created() {
            let response = await this.$http.get('/certificate/certificate-config/index-data');
            this.TYPE_TITLES = response.data.TYPE_TITLES;
            this.search()
        },
        methods: {
            jump(index) {
                this.searchForm.page = index;
                this.search();
            },
            async search() {
                let response = await this.$http.get('/certificate/certificate-config/list', {params: this.searchForm});
                this.data = response.data;
            },
            goEdit(certificateConfig) {
                this.$refs['certificate-config-dialog'].open(certificateConfig)
            },
            async goRemove(certificateConfig, index) {
                await this.$confirm('确定删除 ' + ' ？', '删除', {});
                let response = await this.$http.post('/certificate/certificate-config/remove', {id: certificateConfig.id});
                this.$message.success(response.msg);
                this.data.data.splice(index, 1)
            }
        }
    }
</script>
