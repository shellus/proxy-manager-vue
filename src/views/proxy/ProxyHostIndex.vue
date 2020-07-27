<style scoped>

</style>
<template>
    <div>
        <div class="page-header">
            <el-button type="success" @click="$refs['proxy-host-form-dialog'].open()">添加HTTP代理</el-button>
            <el-button type="info" @click="$alert('暂未开放')">添加TCP/IP隧道</el-button>
        </div>
        <div class="block">
            <el-table ref="table" :data="data.data" border style="width: 100%">
                <el-table-column prop="name" label="名称" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        {{ STATUS_TITLES[scope.row.status] }}
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间" align="center" width="170"></el-table-column>
                <el-table-column label="操作" align="center" width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="goEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" @click="goRemove(scope.row, scope.$index)">删除</el-button>
                        <el-button size="mini" @click="goGenerate(scope.row)">部署</el-button>
                        <el-button size="mini" @click="$refs['proxy-log-dialog'].open(scope.row)">日志</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="jump" :current-page="searchForm.page" :page-size="data.per_page" :total="data.total" layout="total, prev, pager, next, jumper">
            </el-pagination>
        </div>
        <proxy-host-form-dialog @success="search" ref="proxy-host-form-dialog"></proxy-host-form-dialog>
        <proxy-log-dialog :OP_TYPE_NAMES="OP_TYPE_NAMES" :OP_TYPE_TITLES="OP_TYPE_TITLES" ref="proxy-log-dialog"></proxy-log-dialog>
    </div>
</template>
<script>
    import ProxyHostFormDialog from "@/views/proxy/ProxyHostFormDialog";
    import ProxyLogDialog from "@/views/proxy/ProxyLogDialog";

    export default {
        name: 'ProxyHostIndex',
        components: {ProxyLogDialog, ProxyHostFormDialog},
        data() {
            return {
                OP_TYPE_TITLES: null,
                OP_TYPE_NAMES: null,
                STATUS_TITLES: null,
                searchForm: {},
                data: []
            }
        },
        async created() {
            let response = await this.$http.get('/proxy/index-data');
            this.STATUS_TITLES = response.data.STATUS_TITLES;
            this.OP_TYPE_TITLES = response.data.OP_TYPE_TITLES;
            this.OP_TYPE_NAMES = response.data.OP_TYPE_NAMES;
            this.search()
        },
        methods: {
            jump(index) {
                this.searchForm.page = index;
                this.search();
            },
            async search() {
                let response = await this.$http.get('/proxy/list', {params: this.searchForm});
                this.data = response.data;
            },
            goEdit(proxy) {
                this.$refs['proxy-host-form-dialog'].open(proxy)
            },
            async goRemove(proxy, index) {
                await this.$confirm('确定删除 ' + ' ？', '删除', {});
                let response = await this.$http.post('/proxy/remove', {id: proxy.id});
                this.$message.success(response.msg);
                this.data.data.splice(index, 1)
            },
            async goGenerate(proxy) {
                let response = await this.$http.post('/proxy/generate-conf', {id: proxy.id});
                this.$message.success(response.msg);
            }
        }
    }
</script>
