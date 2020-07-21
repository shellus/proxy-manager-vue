<style scoped>

</style>
<template>
    <div>
        <div class="page-header">
            <el-button type="success" @click="$refs['proxy-host-form-dialog'].open()">添加HTTP代理</el-button>
            <el-button type="success">添加TCP/IP隧道</el-button>
        </div>
        <div class="block">
            <div v-for="(proxy, i) of data.data" :key="i">
                <div>
                    {{ proxy.domains ? proxy.domains.map(v=>v.domain).join() : '-' }}
                </div>
                <div @click="goEdit(proxy)">编辑</div>
            </div>
            <el-pagination @current-change="jump" :current-page="searchForm.page" :page-size="data.per_page"
                           layout="total, prev, pager, next, jumper" :total="data.total">
            </el-pagination>
        </div>
        <proxy-host-form-dialog ref="proxy-host-form-dialog"></proxy-host-form-dialog>
    </div>
</template>
<script>
    import ProxyHostFormDialog from "@/views/proxy/ProxyHostFormDialog";

    export default {
        name: 'ProxyHostIndex',
        components: {ProxyHostFormDialog},
        data() {
            return {
                searchForm: {},
                data: []
            }
        },
        created() {
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
            }
        }
    }
</script>
